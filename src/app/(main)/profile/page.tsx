import { UpdateSelfPasswordForm } from "@/components/forms/update-self-password-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from "next";
import ProfileInfo from "./profile-info";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Profile() {
  return (
    <div className="space-y-10 mx-auto max-w-2xl pt-10">
      <ProfileInfo />

      <Card className="border-none min-w-xl pb-6">
        <CardHeader className="font-bold text-2xl">Update Password</CardHeader>
        <CardContent>
          <UpdateSelfPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
