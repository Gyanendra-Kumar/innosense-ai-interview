"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const signUpFormSchema = z.object({
  email: z.string().email("Please enter your email."),
  name: z.string().min(1, "Please enter your name."),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
    ),
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
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
  },
];

const SignUpView = () => {
  const form = useForm<signUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  function onSubmit(values: signUpFormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    authClient.signUp.email(
      {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      {
        onError: () => {
          toast.error("Something went wrong! ❌");
        },
        onSuccess: () => {
          toast.success("Signed up successfully 🎉");
        },
      }
    );
  }
  return (
    <section>
      <Card className="bg-card w-96 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <Button type="submit" className="w-full cursor-pointer">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUpView;
