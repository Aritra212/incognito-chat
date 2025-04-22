"use server";

import { IConversationData, IUser } from "@/common/common.interface";
import { createClient } from "../supabase/server";
import { htmlToText } from "html-to-text";

interface usersData {
  user1_id: string;
  user2_id: string;
}

interface IConversation {
  created_at: string;
  id: string;
  last_message_id: {
    id: string;
    message: string | null;
  };
  user1_id: IUser;
  user2_id: IUser;
  notifications?: number;
}

export const findUserId = async (userData: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("user_id")
    .or(`user_name.eq.${userData},email.eq.${userData}`);

  if (error) return { error: error.message };

  return { id: data[0]?.user_id || "" };
};

export const findConversation = async ({ user1_id, user2_id }: usersData) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("conversations")
    .select(`*,user1_id(*),user2_id(*)`)
    .or(
      `and(user1_id.eq.${user1_id},user2_id.eq.${user2_id}),and(user2_id.eq.${user1_id},user1_id.eq.${user2_id})`
    )
    .single();

  if (error) return { error: error.message };
  if (data) return { data: await processConversationData(data) };
  return { data };
};

async function processConversationData(
  data: IConversation,
  notifications?: number
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user2Id = data?.user1_id.user_id === user?.id ? "user2_id" : "user1_id";
  let formatedData: IConversationData = {
    created_at: data.created_at,
    id: data.id,
    last_message: await extractTextFromHTML(
      data?.last_message_id?.message || "",
      25
    ),
    user: data[user2Id],
  };

  if (notifications) formatedData = { ...formatedData, notifications };
  return formatedData;
}

export const createConversation = async (formData: usersData) => {
  const supabase = await createClient();
  const { data: newData, error } = await supabase
    .from("conversations")
    .insert(formData)
    .select(`*,user1_id(*),user2_id(*)`)
    .single();

  if (error) return { error: error.message };
  if (newData) return { data: await processConversationData(newData) };
  return { data: newData };
};

export const newConversation = async (user1_id: string, user2_data: string) => {
  // fetch 2nd user id
  const { id: user2_id, error: userError } = await findUserId(user2_data);

  if (userError) return { error: userError };

  if (!user2_id) return { error: "No user found!" };

  // conversation already exists or not
  const formatedData = { user1_id, user2_id };
  const { data } = await findConversation(formatedData);

  if (data) return { data, message: "conversation already exists" };

  //create new conversation
  const { data: newData, error: createError } = await createConversation(
    formatedData
  );

  if (createError) return { error: createError };

  return { data: newData };
};

export const fetchAllConversations = async (user_id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("conversations")
    .select(`*,user1_id(*),user2_id(*),last_message_id(chat_id,message)`)
    .or(`user1_id.eq.${user_id},user2_id.eq.${user_id}`)
    .order("updated_at", { ascending: false });

  const { data: notificationData, error: notificationError } = await supabase
    .from("notifications")
    .select("conversation_id, not_seen")
    .eq("user_id", user_id);

  if (error || notificationError)
    return { error: error?.message || notificationError?.message };

  const formatedNotificationsData = notificationData?.reduce<
    Record<string, number>
  >((acc, item) => {
    acc[item.conversation_id] = item.not_seen;
    return acc;
  }, {});

  if (data) {
    const formatedData = await Promise.all(
      data.map(
        async (el) =>
          await processConversationData(el, formatedNotificationsData[el.id])
      )
    );
    return { data: (formatedData as IConversationData[]) || [] };
  }
  return { data: [] as IConversationData[] };
};

export const fetchConversationById = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("conversation")
    .select(`*,user1_id(*),user2_id(*)`)
    .eq("id", id)
    .single();

  if (error) return { error: error.message };

  if (data) return { data: await processConversationData(data) };
  return { data };
};

export const removeActiveState = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    try {
      // Perform the update and handle any errors
      await supabase
        .from("notifications")
        .update({ is_active: false })
        .match({ user_id: user.id });
    } catch (error) {
      console.log(error as string);
    }
  }
};

export async function extractTextFromHTML(
  html: string,
  limit?: number
): Promise<string> {
  if (typeof html !== "string") return "";

  const text = htmlToText(html, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } }, // optional
    ],
  });

  return limit && text.length > limit ? text.substring(0, limit) + "..." : text;
}
