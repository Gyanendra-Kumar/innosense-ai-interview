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

const loginFormSchema = z.object({
  email: z.string().email("Please enter your email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"
    ),
});

type loginFormType = z.infer<typeof loginFormSchema>;

interface FormFieldType {
  name: keyof loginFormType;
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
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
  },
];

const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: loginFormType) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: false,
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
  };

  return (
    <section className="flex flex-col gap-6">
      <Card className="bg-card shadow-lg overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-primary text-balance">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  {formField.map((item) => {
                    return (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div className="flex justify-between items-start gap-2">
                              <label className="pt-1 text-foreground">
                                {item.label}:
                              </label>

                              <div className="flex items-start flex-col gap-2">
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
                                <FormMessage className="text-red-500 text-sm w-60" />
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
                  Login
                </Button>

                <div className="after:border-border relative text-center tex-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    GitHub
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up" className="auth-link">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            {/* Logo */}
            <SmoothPulseSVG />
            <p className="text-2xl font-semibold text-white whitespace-nowrap">
              InnoSense AI Interview
            </p>
          </div>
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

export default SignInView;
