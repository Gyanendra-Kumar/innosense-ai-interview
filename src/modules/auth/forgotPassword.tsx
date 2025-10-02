"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import SmoothPulseSVG from "../../components/animation/smoothPulse";
import { Alert, AlertTitle } from "../../components/ui/alert";
import Policy from "../Policy";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter your email."),
});

type signUpFormType = z.infer<typeof ForgotPasswordSchema>;

interface FormFieldType {
  name: keyof signUpFormType;
  label: string;
  type: string;
  placeholder: string;
}

const formField: FormFieldType[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "you@example.com",
  },
];

const ForgotPasswordView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<signUpFormType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: signUpFormType) {
    setError(null);
    setPending(true);

    authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          setPending(false);
          setMessage(
            "If an account exists for this email, we've sent a password reset link."
          );
          setTimeout(() => {
            router.push("/sign-in");
          }, 3000);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message ?? "Something went wrong!");
        },
      }
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <Card className="bg-card shadow-lg overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* LEFT SECTION */}
          <div className="bg-gradient-to-br from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            {/* Logo */}
            <SmoothPulseSVG />
            <p className="text-2xl font-semibold text-white whitespace-nowrap">
              InnoSense AI Interview
            </p>
          </div>

          {/* RIGHT SECTION */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <h1 className="text-2xl font-bold">Forgot password</h1>
                  <p className="text-primary text-sm w-72">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password.
                  </p>
                </div>
                <div className="grid gap-2">
                  {formField.map((item) => {
                    return (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex justify-between items-start gap-1">
                              <label className="pt-1 text-foreground">
                                {item.label}:
                              </label>

                              <div className="flex items-start flex-col gap-1">
                                {/* Input */}
                                <FormControl>
                                  <Input
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    className="w-60"
                                    {...field}
                                  />
                                </FormControl>

                                {/* Error message */}
                                <FormMessage className="text-red-500 text-xs w-60" />
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-3 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                {!!message && (
                  <div className="w-80">
                    <Alert className="bg-green-400/50 border-none">
                      <CircleCheckBig className="h-3 w-4 text-green-900" />
                      <AlertTitle className="text-wrap break-words">
                        {message}
                      </AlertTitle>
                    </Alert>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full cursor-pointer "
                  disabled={pending}
                >
                  {pending ? (
                    <svg className="border-3 border-dashed size-4 animate-spin rounded-full" />
                  ) : null}
                  Send reset link
                </Button>

                <div className="text-center text-sm">
                  Go back to{" "}
                  <Link href="/" className="auth-link">
                    Home
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Policy />
    </section>
  );
};

export default ForgotPasswordView;
