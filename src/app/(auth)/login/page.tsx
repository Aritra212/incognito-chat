import LoginForm from "@/components/forms/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Register() {
  return (
    <Card className="min-w-[600px] min-h-94">
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-center">Log in</CardTitle>
        <p className=" text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={"/register"}
            className="font-bold text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
