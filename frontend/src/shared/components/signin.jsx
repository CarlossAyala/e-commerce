import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  Spinner,
} from "../../components";
import { signinInitial, signinSchema, useSignin } from "../auth";

export const Signin = () => {
  const signin = useSignin();

  useDocumentTitle("Sign In");

  const form = useForm({
    resolver: yupResolver(signinSchema),
    defaultValues: signinInitial,
    mode: "all",
  });

  const handleSignin = (values) => {
    signin.mutate(values);
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
