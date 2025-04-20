"use server";

import { IUser } from "@/common/common.interface";
import { createClient } from "../supabase/server";

interface IInsertChat {
  conversation_id: string;
  sender_id: string;
  message: string;
}

export const insertChat = async (chatData: IInsertChat) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chats")
    .insert(chatData)
    .select("*,sender_id(*)")
    .single();

  if (error) return { error: error.message };

  return { data };
};

export const fetchChatsByConversationId = async (
  cnv_id: string,
  limit: number = 0,
  offset: number = 50
) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: chatData, error } = await supabase
    .from("chats")
    .select("*,sender_id(*)")
    .eq("conversation_id", cnv_id)
    .order("created_at", { ascending: false })
    .range(limit, offset);
  if (!error) {
    await supabase
      .from("notifications")
      .update({ is_active: false })
      .eq("user_id", user?.id);

    await supabase
      .from("notifications")
      .update({ is_active: true, not_seen: 0 })
      .eq("user_id", user?.id)
      .eq("conversation_id", chatData[0]?.conversation_id);
  }
  if (error) return { error: error.message };

  return { data: chatData.reverse() };
};

export const fetchUserDataBySenderId = async (sender_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("user_id", sender_id)
    .single();

  if (error) return { error: error.message };

  return { data };
};

export const getPartnerByConversationId = async (conv_id: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("conversations")
    .select("user1_id(*),user2_id(*)")
    .eq("id", conv_id)
    .single();

  if (error) return { error: error.message };

  const user2 = {
    partner:
      (data?.user1_id as unknown as IUser)?.user_id === user?.id
        ? (data.user2_id as unknown as IUser)
        : data.user1_id,
  };
  return user2;
};
