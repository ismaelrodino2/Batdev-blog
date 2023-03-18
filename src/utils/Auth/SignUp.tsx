"use client";

import { useState } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useAuth, VIEWS } from "@/utils/Auth/AuthProvider";
import supabase from "src/lib/supabase-browser";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignUp = () => {
  const { setView }: any = useAuth();
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState<any>(null);

  async function signUp(formData: { email: any; password: any }) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg(
        "Success! Please check your email for further instructions."
      );
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Create Account</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={signUp}
      >
        {({ errors, touched }) => (
          <Form className="column w-full">
            <label htmlFor="email">Email</label>
            <Field
              className={cn("input", errors.email && "bg-red-50")}
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
                errors.password && touched.password && "bg-red-50"
              )}
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600">{errors.password}</div>
            ) : null}

            <button className="button-inverse w-full" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-black">{successMsg}</div>}
      <button
        className="link w-full"
        type="button"
        onClick={() => setView(VIEWS.SIGN_IN)}
      >
        Already have an account? Sign In.
      </button>
    </div>
  );
};

export default SignUp;
