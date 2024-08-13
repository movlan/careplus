"use client";

import React from "react";
import { Control } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput, { Value } from "react-phone-number-input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "./form/PatientForm";
import Image from "next/image";

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  formName: string;
  formLabel?: string;
  inputPlaceholder?: string;
  formDescription?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelector?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const { inputPlaceholder, iconSrc, iconAlt, fieldType } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={inputPlaceholder}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            placeholder={inputPlaceholder}
            defaultCountry="US"
            international
            countryCallingCodeEditable
            value={field.value as Value | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const {
    control,
    formName,
    formLabel,
    formDescription,
    fieldType,
  } = props;
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && formLabel && (
            <FormLabel>{formLabel}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
