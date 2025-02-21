import PersonalDetailsForm from "@/components/forms/personal-info-form";
import { UpdateSelfPasswordForm } from "@/components/forms/update-self-password-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Profile() {
  return (
    <div className="space-y-10 mx-auto max-w-2xl pt-10">
      <Card className="border-none min-w-xl pb-6">
        <CardHeader className="font-bold text-2xl">
          Personal Informations
        </CardHeader>
        <CardContent>
          <PersonalDetailsForm />
        </CardContent>
      </Card>

      <Card className="border-none min-w-xl pb-6">
        <CardHeader className="font-bold text-2xl">User Name</CardHeader>
        <CardContent className="flex gap-x-2">
          <Input type="text" disabled />
          <Button variant={"outline"}>Change</Button>
        </CardContent>
      </Card>
      <Card className="border-none min-w-xl pb-6">
        <CardHeader className="font-bold text-2xl">Update Password</CardHeader>
        <CardContent>
          <UpdateSelfPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
