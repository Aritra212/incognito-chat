"use client";

import ProfileUpdateDialog from "@/components/forms/personal-info-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/use-user";
import { Copy } from "lucide-react";

export default function ProfileInfo() {
  const { user } = useUser();

  return (
    <Card className="border-none min-w-xl pb-10">
      <CardHeader className="font-bold text-2xl flex-row justify-between w-full">
        <p className="w-fit">Personal Informations</p>
        <ProfileUpdateDialog
          user={{
            email: user?.email || "",
            user_id: user?.id || "",
            user_name: user?.user_metadata?.userName,
            name: user?.user_metadata?.name,
          }}
        >
          <Button size={"lg"} variant={"outline"}>
            Update
          </Button>
        </ProfileUpdateDialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 [&>div]:space-y-2">
          <div>
            <Label>Profile ID</Label>
            <Input
              type="text"
              value={user?.id}
              readOnly
              className="border-muted-foreground"
            />
          </div>
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={user?.user_metadata?.name}
              readOnly
              className="border-muted-foreground"
            />
          </div>
          <div>
            <Label>Email ID</Label>
            <div className="relative">
              <Input
                type="text"
                value={user?.email}
                readOnly
                className="border-muted-foreground bg-transparent"
              />
              <Copy className="absolute top-2.5 right-2 w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
            </div>
          </div>
          <div>
            <Label>Username</Label>
            <div className="relative">
              <Input
                type="text"
                value={user?.user_metadata?.userName}
                readOnly
                className="border-muted-foreground bg-transparent"
              />
              <Copy className="absolute top-2.5 right-2 w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
