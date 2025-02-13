import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be atleast 2 charcters." }),
    email: z.string().email({ message: "Please enter a valid email id." }),
    username: z.string().min(4, "Username must be atleast 4 characters."),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match.",
    path: ["confirmPassword"],
  });

export type IRegister = z.infer<typeof RegisterSchema>;
