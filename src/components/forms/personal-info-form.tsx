"use client";
import { useContext } from "react";
import { UserContext } from "../user-context";
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

const ProfileDetailsSchema = z.object({
  id: z.string().readonly(),
  name: z.string().min(2, { message: "Name must be atleast 2 charcters." }),
  email: z.string().email({ message: "Please enter a valid email id." }),
});

type PersonalDetailsValues = z.infer<typeof ProfileDetailsSchema>;

export default function PersonalDetailsForm() {
  const { user } = useContext(UserContext);

  const form = useForm<PersonalDetailsValues>({
    resolver: zodResolver(ProfileDetailsSchema),
    defaultValues: {
      id: user?.id || "",
      email: user?.email || "",
      name: user?.app_metadata?.name || "",
    },
  });

  const onSubmit = (values: PersonalDetailsValues) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter yuour name here" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email id"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} loading={isLoading}>
          Update
        </Button>
      </form>
    </Form>
  );
}
