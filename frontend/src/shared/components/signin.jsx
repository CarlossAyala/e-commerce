import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BuildingStorefrontIcon,
  CubeIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components";
import { signinInitial, signinSchema, useSignin } from "../auth";
import { getCurrentApp } from "../utils";
import { Spinner } from ".";

const APPS = [
  { label: "E-commerce", value: "/", Icon: BuildingStorefrontIcon },
  { label: "Seller", value: "/seller", Icon: CubeIcon },
  { label: "Admin", value: "/admin", Icon: WrenchIcon },
];

export const Signin = () => {
  useDocumentTitle("Sign In");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname;
  const { app, to, originalTo } = getCurrentApp(from);
  const [redirectTo, setRedirectTo] = useState(to);

  const signin = useSignin(
    to !== redirectTo ? getCurrentApp(redirectTo).app : app,
  );

  const form = useForm({
    resolver: yupResolver(signinSchema),
    defaultValues: signinInitial,
    mode: "onSubmit",
  });

  const handleSignin = (values) => {
    signin.mutate(values, {
      onSuccess() {
        navigate(to !== redirectTo ? redirectTo : originalTo, {
          replace: true,
        });
      },
    });
  };

  return (
    <main className="container min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex h-full items-center lg:p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-medium tracking-tight">
              Sign In to your account
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your email below to sign in to your account.
            </p>
          </div>

          <RadioGroup
            value={redirectTo}
            onValueChange={(value) => setRedirectTo(value)}
            className="grid grid-cols-3 gap-4"
          >
            {APPS.map((item) => (
              <div key={item.value}>
                <RadioGroupItem
                  value={item.value}
                  id={item.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={item.value}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <item.Icon className="mb-2 size-6" />
                  {item.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(handleSignin)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={signin.isLoading}>
                {signin.isLoading && <Spinner className="mr-2 size-4" />}
                Sign In
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link to="/signup" className="font-medium text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden h-full bg-zinc-900 lg:block" />
    </main>
  );
};
