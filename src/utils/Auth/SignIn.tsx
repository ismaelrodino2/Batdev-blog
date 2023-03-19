"use client";

import { useState, useContext } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useAuth, VIEWS } from "@/utils/Auth/AuthProvider";
import supabase from "src/lib/supabase-browser";
import { parseCookies, setCookie } from "nookies";
import { AlertColor, CircularProgress } from "@mui/material";
import { ErrorBar } from "../Store";
import { State } from "@/app/components/Account";
import { useRouter } from "next/navigation";
import { Loading } from "@/app/components/Loading";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignIn = () => {
  const { setView }: any = useAuth();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const [open, setOpen] = useState(false);

  async function signIn(formData: { email: any; password: any }) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const data = { id: user?.id };
      const response = await fetch(`/api/users/${user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const userData = await response.json();

      if (userData) {
        const value = { authenticated: true, user: userData };

        // Set the expiration date to 1 hour from now
        const expires = new Date();
        expires.setTime(expires.getTime() + 60 * 60 * 1000);

        // Set the cookie with the options object
        setCookie(null, "supabase-auth", JSON.stringify(value), {
          expires,
          path: "/",
        });
      }

      if (error) {
        setErrorMsg(error.message);
      }else{
      window.location.reload();
    }
    } catch (err) {
      ErrorBar(setMessage, setSeverity, "Oops, some error occurred.", setOpen);

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <Loading isLoading={isLoading} />

      <div className="card m-4">
        <div className="md:w-1/2 w-full">
          <h2 className="w-full text-center">Sign In</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignInSchema}
            onSubmit={signIn}
          >
            {({ errors, touched }) => (
              <Form className="column w-full ">
                <label htmlFor="email">Email</label>
                <Field
                  className={cn(
                    "input",
                    errors.email && touched.email && "bg-[red-50]"
                  )}
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-600">{errors.email}</div>
                ) : null}
                <label htmlFor="email">Password</label>
                <Field
                  className={cn(
                    "input",
                    errors.password && touched.password && "bg-[red-50]"
                  )}
                  id="password"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600">{errors.password}</div>
                ) : null}
                <button
                  className="link w-full"
                  type="button"
                  onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
                >
                  Forgot your password?
                </button>
                <div className="w-full flex justify-center">
                  <button className="button-inverse " type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {errorMsg && <div className="text-red-600">{errorMsg}</div>}
          <button
            className="link w-full pt-4"
            type="button"
            onClick={() => setView(VIEWS.SIGN_UP)}
          >
            Don&apos;t have an account? Sign Up.
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
