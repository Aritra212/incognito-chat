import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email id." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
});

export type ILogin = z.infer<typeof LoginSchema>;
