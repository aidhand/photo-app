"use client";

import React from "react";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useSWR from "swr";

export default function Contact() {
  return (
    <div className="container mx-auto flex">
      <main className="m-6 p-6 bg-stone-50 border rounded-lg border-amber-400 text-stone-700">
        <ContactForm />
      </main>
      <aside className="m-6 p-6">using formik</aside>
    </div>
  );
}

function ContactForm() {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  type valueTypes = typeof initialValues;

  const onSubmit = async (
    values: valueTypes,
    { setSubmitting }: FormikHelpers<valueTypes>
  ) => {
    try {
      const response = await axios.post("/api/contact", values);
      console.log("Form submitted:", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const { data, error } = useSWR("/api/contact", {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    dedupingInterval: 60000,
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <div className="flex justify-between align-baseline">
              <label htmlFor="name" className="block">
                Name
              </label>
              <ErrorMessage
                name="name"
                component="p"
                className="block text-red-500 font-medium text-sm"
              />
            </div>

            <Field
              type="text"
              name="name"
              className="py-1 px-2 mb-8 w-72 block border rounded-md border-stone-200 bg-white"
            />
          </div>

          <div>
            <div className="flex justify-between align-baseline">
              <label htmlFor="email">Email</label>
              <ErrorMessage
                name="email"
                component="p"
                className="block text-red-500 font-medium text-sm"
              />
            </div>
            <Field
              type="email"
              name="email"
              className="py-1 px-2 mb-8 w-72 block border rounded-md border-stone-200 bg-white"
            />
          </div>

          <div>
            <div className="flex justify-between align-baseline">
              <label htmlFor="message">Message</label>
              <ErrorMessage
                name="message"
                component="p"
                className="block text-red-500 font-medium text-sm"
              />
            </div>
            <Field
              type="textarea"
              name="message"
              className="py-1 px-2 mb-8 w-72 block border rounded-md border-stone-200 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="py-1 px-4 border rounded-md border-stone-200 bg-white hover:bg-stone-100 active:bg-stone-200">
            Submit
          </button>


          {data && data.success && (
            <div className="text-green-500">Form submitted successfully!</div>
          )}
        </Form>
      )}
    </Formik>
  );
}
