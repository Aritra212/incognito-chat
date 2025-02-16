import RegisterForm from "@/components/forms/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Register() {
  return (
    <Card className="min-w-[600px] min-h-94">
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-center">
          Create an Account
        </CardTitle>
        <p className=" text-center text-sm">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="font-bold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
