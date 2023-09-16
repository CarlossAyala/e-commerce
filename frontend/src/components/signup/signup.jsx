import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { signupInitial, signupSchema, useSignup } from "../../libs/auth";

const Signup = () => {
  const signup = useSignup();

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await signup.mutateAsync(values);

      navigate("/signin");
    } catch (error) {
      console.log("<Signup />", error);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-4 w-full">
          <h1>Sign up</h1>
          <p className="mt-1">
            Have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
        <Formik
          initialValues={signupInitial}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="w-full">
              <div className="mb-8 mt-4 space-y-5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  size="lg"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Your last name"
                  size="lg"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  id="Email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  size="lg"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  id="Password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  size="lg"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  id="confirm-password"
                  type="password"
                  name="validatePassword"
                  placeholder="Confirm password"
                  size="lg"
                  value={values.validatePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <button kind="primary" type="submit">
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="hidden">Img</div>
    </div>
  );
};

export default Signup;
