import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { className, isLoading, children } = props;

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src={"/assets/icons/loader.svg"}
            alt="spinner"
            width={24}
            height={24}
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
