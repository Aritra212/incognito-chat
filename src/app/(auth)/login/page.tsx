import LoginForm from "@/components/forms/login-form";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <div>
        <p className="font-bold text-3xl text-center">Log in</p>
        <p className=" text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={"/register"}
            className="font-bold text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <LoginForm />
    </>
  );
}
