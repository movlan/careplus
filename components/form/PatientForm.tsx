"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXT_AREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const { name, email, phone } = values;
      const userData = {
        name,
        email,
        phone,
      };

      console.log(userData);

      // const user = await createUser(userData);

      // if (user) {
      //   router.push("/patients/${user.id}/register");
      // }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋🏻</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          formName="name"
          formLabel="Full Name"
          inputPlaceholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          formName="email"
          formLabel="Email"
          inputPlaceholder="john.doe@me.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          formName="phone"
          formLabel="Phone Number"
          inputPlaceholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
