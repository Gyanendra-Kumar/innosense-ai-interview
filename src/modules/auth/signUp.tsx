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
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import SmoothPulseSVG from "../../components/animation/smoothPulse";
import { Alert, AlertTitle } from "../../components/ui/alert";

const signUpFormSchema = z
  .object({
    email: z.string().email("Please enter your email."),
    name: z.string().min(1, "Please enter your name."),
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
    path: ["confirmPassword"], // Set the path of the error to the confirmPassword field
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
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "you@example.com",
  },
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

const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<signUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: signUpFormType) {
    setError(null);
    setPending(true);

    console.log(values);
    authClient.signUp.email(
      {
        email: values.email,
        name: values.name,
        password: values.password,
        // confirmPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  }
  return (
    <section className="flex flex-col gap-6">
      <Card className="bg-card shadow-lg overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* LEFT SECTION */}
          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
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
                  <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                  <p className="text-primary text-balance">
                    Create your account
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

                <Button
                  type="submit"
                  className="w-full cursor-pointer "
                  disabled={pending}
                >
                  {pending ? (
                    <svg className="border-3 border-dashed size-4 animate-spin rounded-full" />
                  ) : null}
                  Sign Up
                </Button>

                <div className="after:border-border relative text-center tex-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={pending}
                    className="w-full"
                  >
                    {/* {pending ? (
                      <svg className="border-3 border-dashed size-4 animate-spin rounded-full" />
                    ) : null} */}
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={pending}
                    className="w-full"
                  >
                    {/* {pending ? (
                      <svg className="border-3 border-dashed size-4 animate-spin rounded-full" />
                    ) : null} */}
                    GitHub
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="auth-link">
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-xs text-muted-foreground text-center text-balance">
        By clicking continue, you agree to our{" "}
        <a href="#" className="auth-link after:!h-[1px]">
          Term of Service
        </a>{" "}
        and{" "}
        <a href="#" className="auth-link after:!h-[1px]">
          Privacy Policy
        </a>
      </div>
    </section>
  );
};

export default SignUpView;
