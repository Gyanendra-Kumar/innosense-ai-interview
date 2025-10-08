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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import SmoothPulseSVG from "../../components/animation/smoothPulse";
import { Alert, AlertTitle } from "../../components/ui/alert";
import { ResetPasswordUIProps } from "../../types";
import Policy from "../Policy";

const signUpFormSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type signUpFormType = z.infer<typeof signUpFormSchema>;

interface FormFieldType {
  name: keyof signUpFormType;
  label: string;
  type: string;
  placeholder: string;
}

const formField: FormFieldType[] = [
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "********",
  },
];

const ResetPasswordView = ({ token }: ResetPasswordUIProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<signUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: signUpFormType) {
    setError(null);
    setPending(true);

    authClient.resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onSuccess: () => {
          setPending(false);
          setMessage("Password has been reset. You can now sign in.");
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
          <div className="auth-side-label">
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
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-primary text-balance">
                    Enter your new password below to reset.
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
                  <div className="w-full max-w-96">
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
                  Reset password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Policy />
    </section>
  );
};

export default ResetPasswordView;
