import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { TextInput, Button, PasswordInput } from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import { signinInitial, signinSchema, useSignin } from "../../libs/auth";

const Signin = () => {
  const signin = useSignin();

  const handleSubmit = (values) => {
    signin.mutate(values);
  };

  return (
    <div className="grid min-h-screen grid-cols-1">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-4 w-full">
          <h1>Sign in</h1>
          <p className="mt-1">
            Don&apos;t have an account?{" "}
            <Link to="/signup">Create a account</Link>
          </p>
        </div>

        <Formik
          initialValues={signinInitial}
          validationSchema={signinSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="w-full">
              <div className="mb-8 mt-4 space-y-5">
                <TextInput
                  id="Email"
                  name="email"
                  labelText="Email"
                  type="email"
                  placeholder="Your email"
                  size="lg"
                  invalidText={errors.email}
                  invalid={errors.email && touched.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <PasswordInput
                  id="Password"
                  labelText="Password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  size="lg"
                  invalidText={errors.password}
                  invalid={errors.password && touched.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button
                renderIcon={(props) => <ArrowRight size={24} {...props} />}
                iconDescription="Right Icon"
                kind="primary"
                type="submit"
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="hidden">Img</div>
    </div>
  );
};

export default Signin;
