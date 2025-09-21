"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { authClient } from "../../../lib/auth-client";

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

const SignIn = () => {
  const router = useRouter();
  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginFormType) {
    console.log(values);
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: false,
    });

    if (error) {
      console.log("error: ", error);
    } else {
      console.log("data: ", data);
      router.push("/");
    }
  }
  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="bg-card w-96 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Login</CardTitle>
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
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignIn;
