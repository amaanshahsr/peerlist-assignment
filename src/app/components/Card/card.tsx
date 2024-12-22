"use client";

import CoreButton from "../coreButton";
import { v4 as uuidv4 } from "uuid";
import DynamicInput from "../dynamicInput";
import { useDataStore } from "../../store";
import { CardContainer } from "./cardContainer";
import { CardHeader } from "./cardHeader";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export interface DataType {
  title: string;
  helperText?: string;
  value: string;
  inputType:
    | "shortanswer"
    | "date"
    | "longanswer"
    | "url"
    | "number"
    | "singleselect";
  id: string;
  options?: { value: string; label: string; id: string }[];
  hasError?: boolean;
}

const CardSection = () => {
  const pathname = usePathname();
  const { data, addData } = useDataStore();
  const searchParams = useSearchParams();

  const userCanAddQuestions =
    pathname?.includes("create") || searchParams?.get("type") === "drafts";

  const emptyCardData = {
    id: "",
    title: "",
    helperText: "",
    value: "",
    inputType: "",
  };

  const handleDropDownChange = (value: string) => {
    const newEntry = {
      ...emptyCardData,
      id: uuidv4(),
      inputType: value
        ?.trim()
        ?.toLowerCase()
        ?.replaceAll(" ", "") as DataType["inputType"],
      ...(value?.trim()?.toLowerCase()?.replaceAll(" ", "") ===
        "singleselect" && {
        options: [],
      }),
    };
    addData(newEntry);
  };

  const filteredData = data?.filter((node) => {
    // Exclude objects that have only 'title' and do not have 'id'
    return "id" in node;
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid gap-4 w-full  md:px-6 mt-10 place-items-center ">
        {filteredData?.map((node, index) => {
          return (
            <CardContainer key={index + node?.id + `cardContainer`}>
              <CardHeader item={node} key={node?.id + `cardHeader`} />
              <DynamicInput item={node} />
            </CardContainer>
          );
        })}
        {userCanAddQuestions && (
          <CoreButton
            styles="mb-10 text-gray-1000"
            handleDropDownChange={handleDropDownChange}
            iconPosition="left"
            icon="add"
            text="Add Question"
            status="active"
            key="Add Question"
          />
        )}
      </div>
    </Suspense>
  );
};

export default CardSection;

export const Actions: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};
