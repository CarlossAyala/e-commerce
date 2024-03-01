import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { signupInitial, signupSchema, useSignup } from "@/shared/auth";
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
} from ".";

const Signup = () => {
  const navigate = useNavigate();
  const signup = useSignup();
  useDocumentTitle("Sign Up");

  const form = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: signupInitial,
    mode: "all",
  });

  const handleSignup = (values) => {
    signup.mutate(values, {
      onSuccess() {
        toast("Signup successful");
        navigate("/signin");
      },
    });
  };

  return (
    <main className="container h-screen w-full">
      <div className="flex h-full flex-col justify-center gap-7">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sign Up
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Have an account?{" "}
            <Link to="/signin" className="font-medium text-primary">
              Sign In
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(handleSignup)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={signup.isLoading}>
              {signup.isLoading && <Spinner className="mr-2 size-4" />}
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Signup;
