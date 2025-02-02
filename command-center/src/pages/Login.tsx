import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeRequest } from "../service/request";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/components/Loader";
import { NotificationType, showNotification } from "../service/notification";

// Define the validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Define the shape of the form values and response
interface LoginValues {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Initial form values
  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  // Handle form submission
  const handleSubmit = async (
    values: LoginValues,
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: Partial<LoginValues>) => void;
    }
  ) => {
    setIsLoading(true);
    setSubmitting(true);
    const response = await makeRequest.post<LoginResponse>(
      "user/login",
      values
    );

    if (response && response.status === "success") {
      showNotification("Login Sucessfull", NotificationType.SUCCESS);
      setIsLoading(false);
      setSubmitting(false);
      const { data } = response;
      localStorage.setItem("authToken", data?.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PrimaryContainer>
      <div className="py-8 w-full h-screen flex flex-row gap-8 text-black">
        <div className="h-full w-full bg-gray-700 rounded-xl"></div>
        <div className="h-full w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="h-auto w-full flex flex-col gap-12 justify-between items-center">
                <div className="w-full">
                  <h1 className="text-3xl font-bold text-center my-4">
                    Welcome to Insights.
                  </h1>
                  <p className="w-3/4 text-sm font-semibold text-center mx-auto">
                    The right platform suitable for you to journal & share your
                    ideas, thoughts and inspiration with the world.
                  </p>
                </div>

                <div className="w-full flex flex-col items-center">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`rounded-3xl w-3/4 h-16 px-4 border-2 ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-white"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="w-full flex flex-col items-center">
                  <Field
                    name="password"
                    type="password"
                    placeholder="*******"
                    className={`rounded-3xl w-3/4 h-16 px-4 border-2 ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-white"
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="self-start mx-[13%]">
                  <button
                    type="submit"
                    className={`rounded-3xl text-white hover:bg-red-800 cursor-pointer px-12 py-2 font-bold bg-red-500`}
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </PrimaryContainer>
  );
};

export default Login;
