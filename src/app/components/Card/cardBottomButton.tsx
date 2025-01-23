"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";
import CoreButton from "../coreButton";

const CardBottomButton = ({
  handleDropDownChange,
}: {
  handleDropDownChange: (value: string) => void;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userCanAddQuestions =
    pathname?.includes("create") || searchParams?.get("type") === "drafts";

  return (
    userCanAddQuestions && (
      <CoreButton
        styles="mb-10 text-gray-1000"
        handleDropDownChange={handleDropDownChange}
        iconPosition="left"
        icon="add"
        text="Add Question"
        status="active"
        key="Add Question"
      />
    )
  );
};

export default CardBottomButton;
