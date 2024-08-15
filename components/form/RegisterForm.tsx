"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { genderOptions, physicianOptions } from "@/constants";
import { SelectItem } from "@/components/ui/select";

function RegisterForm(props: { user: User }) {
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

      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋🏻</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          formName="name"
          formLabel="Full Name"
          inputPlaceholder="ex. Adam"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            formName="email"
            formLabel="Email Address"
            inputPlaceholder="john.doe@me.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            formName="phone"
            formLabel="Phone Number"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            formName="birthDate"
            formLabel="Date of Birth"
            inputPlaceholder="Select Your Date of Birth"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            formName="gender"
            formLabel="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex gap-6 h-11 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {genderOptions.map((option) => (
                    <div key={option.value} className="radio-group">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label className="cursor-pointer" htmlFor={option.value}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            formName="address"
            formLabel="Address"
            inputPlaceholder="ex: 14 street, New York, NY - 5101"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            formName="occupation"
            formLabel="Occupation"
            inputPlaceholder="Your occupation"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            formName="emergencyContactName"
            formLabel="Emergency Contact Name"
            inputPlaceholder="Emergency Contact Name"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            formName="emergencyContactNumber"
            formLabel="Emergency Contact Number"
          />
        </div>

        <section>
          <div className="space-y-1 mt-12">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          formName="primaryPhysician"
          formLabel="Primary Care Physician"
          inputPlaceholder="Select A Physician"
        >
          {physicianOptions.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex items-center cursor-pointer gap-2">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={24}
                  height={24}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            formName="insuranceProvider"
            formLabel="Insurance Provider"
            inputPlaceholder="ex. BlueCross"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            formName="insurancePolicyNumber"
            formLabel="Insurance Policy Number"
            inputPlaceholder="ex. ABC1234567"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXT_AREA}
            control={form.control}
            formName="allergies"
            formLabel="Allergies (If any)"
            inputPlaceholder="ex: Peanuts, Penicillin, Pollen"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXT_AREA}
            control={form.control}
            formName="currentMedication"
            formLabel="Current medications"
            inputPlaceholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXT_AREA}
            control={form.control}
            formName="familyMedicalHistory"
            formLabel="Family medical history (if relevant)"
            inputPlaceholder="ex: Mother had breast cancer"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXT_AREA}
            control={form.control}
            formName="pastMedicalHistory"
            formLabel="Past medical history"
            inputPlaceholder="ex: Asthma diagnosis in childhood"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
