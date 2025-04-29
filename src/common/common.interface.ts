export interface LogoutProps {
  noredirect?: boolean;
}

export interface IUser {
  created_at: string;
  email: string;
  name: string;
  user_id: string;
  user_name: string;
  avatar_url?: string;
}

export interface IUserShort {
  name: string;
  user_id: string;
  user_name: string;
  avatar_url?: string;
}

export interface IConversationData {
  id: string;
  created_at: string;
  user: IUser;
  last_message: string | null;
  notifications?: number;
}

export interface IChatData {
  chat_id: string;
  created_at: string;
  status?: "Pending" | "Sent" | "Seen";
  conversation_id: string;
  message: string;
  is_edited: boolean;
  sender_id: IUser;
}
