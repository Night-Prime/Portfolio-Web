import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeRequest } from "../service/request";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/components/Loader";
import { NotificationType, showNotification } from "../service/notification";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  bio: Yup.mixed().required("Share your Bio with us"),
});

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  bio: string;
}

interface RegisterResponse {
  data: {
    id: string;
    name: string;
    email: string;
    bio: string;
  };
}

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues: RegisterValues = {
    email: "",
    password: "",
    bio: "",
    name: "",
  };

  // Handle form submission
  const handleSubmit = async (
    values: RegisterValues,
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: Partial<RegisterValues>) => void;
    }
  ) => {
    setIsLoading(true);
    setSubmitting(true);
    const response = await makeRequest.post<RegisterResponse>(
      "user/register",
      values
    );

    if (response && response.status === "success") {
      showNotification(
        "Successful Registration: Now Login!",
        NotificationType.SUCCESS
      );
      setIsLoading(false);
      const { data } = response;
      // implement navigation straight to the dashboard soon.
      setIsLoading(false);
      setSubmitting(false);
      navigate("/");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PrimaryContainer>
      <div className="py-8 w-full h-screen flex flex-row-reverse overflow-hidden gap-8 text-black">
        <div className="h-full w-full bg-gray-700 rounded-xl"></div>
        <div className="h-full w-full overflow-y-scroll">
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="h-auto w-full flex flex-col gap-12 justify-between items-center">
                <div className="w-full">
                  <h1 className="text-3xl font-bold text-center my-4">
                    Insights.
                  </h1>
                  <h1 className="text-xl font-bold text-center my-4">
                    Set up an account with us today
                  </h1>
                  <p className="w-3/4 text-sm font-semibold text-center mx-auto">
                    The right platform suitable for you to journal & share your
                    ideas, thoughts and inspiration with the world.
                  </p>
                </div>
                <div className="w-full flex flex-col items-center">
                  <Field
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className={`rounded-3xl w-3/4 h-16 px-4  border-2 ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-white"
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
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
                    className={`rounded-3xl w-3/4 h-16 px-4  border-2 ${
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

                <div className="w-full flex flex-col items-center">
                  <Field
                    name="bio"
                    as="textarea"
                    placeholder="Fill in your Bio"
                    className={`rounded-3xl w-3/4 h-36 p-4  border-2 ${
                      errors.bio && touched.bio
                        ? "border-red-500"
                        : "border-white"
                    }`}
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="self-start mx-[13%]">
                  <button
                    type="submit"
                    className={`rounded-3xl hover:text-red-800 hover:bg-white cursor-pointer px-12 py-2 font-bold bg-red-500 text-white`}
                  >
                    Register
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

export default Register;
