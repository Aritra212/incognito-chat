"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IUser } from "@/common/common.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { isUserNameAvailable } from "@/utils/data-access/auth";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { CircleCheckBig, CircleX } from "lucide-react";

const ProfileDetailsSchema = z.object({
  id: z.string().readonly(),
  name: z.string().min(2, { message: "Name must be atleast 2 charcters." }),
  user_name: z
    .string()
    .min(2, { message: "Username must be atleast 4 characters." }),
});

type PersonalDetailsValues = z.infer<typeof ProfileDetailsSchema>;

type Props = {
  user: IUser;
  children: React.ReactNode;
};

export default function ProfileUpdateDialog({ user, children }: Props) {
  const [userName, setUserName] = useState(user?.user_name || "");
  const [isUserNameAvailabe, setIsUserNameAvailabe] = useState<boolean | null>(
    null
  );

  const form = useForm<PersonalDetailsValues>({
    resolver: zodResolver(ProfileDetailsSchema),
    defaultValues: {
      id: user?.user_id || "",
      name: user?.name || "",
      user_name: user?.user_name || "",
    },
  });

  const onSubmit = (values: PersonalDetailsValues) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;
  const debounceUserNameTerm = useDebounce(userName, 300);

  useEffect(() => {
    const handleUserName = async (value: string) => {
      if (value.trim() === user?.user_name || value.trim().length < 4)
        return setIsUserNameAvailabe(null);
      const isAvailable = await isUserNameAvailable(value, user?.user_name);

      setIsUserNameAvailabe(isAvailable);
    };

    handleUserName(debounceUserNameTerm);
  }, [debounceUserNameTerm, user]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Update Personal Details
          </DialogTitle>
          <DialogDescription className="sr-only">
            Update your name or username
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter yuour name here" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between w-full">
                      <span>Username</span>
                      {isUserNameAvailabe !== null &&
                        (isUserNameAvailabe ? (
                          <span className="flex gap-1.5 text-xs text-secondary">
                            <CircleCheckBig className="w-4 h-4 " /> Username
                            available
                          </span>
                        ) : (
                          <span className="flex gap-1.5 text-xs text-destructive">
                            <CircleX className="w-4 h-4" /> Username not
                            available
                          </span>
                        ))}
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter a username..."
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        setUserName(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size={"lg"}
              className="w-fit mx-auto"
              disabled={isLoading}
              loading={isLoading}
            >
              Update Details
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
