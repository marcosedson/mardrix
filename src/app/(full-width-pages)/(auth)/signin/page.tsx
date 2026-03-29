import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mardrix ERP | Login",
  description: "Acesso ao sistema Mardrix",
};

export default function SignIn() {
  return <SignInForm />;
}
