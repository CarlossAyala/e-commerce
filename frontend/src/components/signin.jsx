import { Link, useLocation, useNavigate } from "react-router-dom";
import { signinInitial, signinSchema, useSignin } from "../shared/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useDocumentTitle } from "@/shared/hooks";
import { APP_NAVIGATION } from "@/configs";

const Signin = () => {
  useDocumentTitle("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  const signin = useSignin();

  const form = useForm({
    resolver: yupResolver(signinSchema),
    defaultValues: signinInitial,
    mode: "all",
  });

  const from = location.state?.location?.pathname || APP_NAVIGATION.seller.to;

  const handleSignin = (values) => {
    signin.mutate(values, {
      onSuccess() {
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <main className="container h-screen w-full">
      <div className="flex h-full flex-col justify-center gap-7">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sign In
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-primary">
              Sign Up
            </Link>
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={signin.isLoading}>
              {signin.isLoading && <Spinner className="mr-2 size-4" />}
              Sign in
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 leading-tight text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signin;
