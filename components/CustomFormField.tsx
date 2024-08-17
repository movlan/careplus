"use client";

import React from "react";
import DatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput, { Value } from "react-phone-number-input";
import Image from "next/image";

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

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

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
  const {
    dateFormat,
    fieldType,
    iconAlt,
    iconSrc,
    inputPlaceholder,
    renderSkeleton,
    showTimeSelector = false,
    formName,
    formLabel,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex border rounded-md border-dark-500 bg-dark-400">
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
              className="border-0 shad-input"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            international
            countryCallingCodeEditable
            value={field.value as Value | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex border rounded-md border-dark-500 bg-dark-400 overflow-clip">
          <Image
            src="/assets/icons/calendar.svg"
            alt="icon"
            width={24}
            height={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelector}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
              timeInputLabel="Time:"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={inputPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXT_AREA:
      return (
        <FormControl>
          <Textarea
            {...field}
            placeholder={inputPlaceholder}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={formName}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={formName} className="checkbox-label">
              {formLabel}
            </label>
          </div>
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, formName, formLabel, formDescription, fieldType } = props;

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
