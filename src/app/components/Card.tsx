"use client";
import React, { useState } from "react";
import DragHandle from "../icons/dragHandle";
import {
  InputTypesDropdown,
  DatePicker,
  LongAnswerField,
  ShortAnswerField,
  RadioGroup,
} from "./inputs";
import { dropdownOptions } from "../constants";
import DropDownArrow from "../icons/dropDownArrow";
import Edit from "../icons/edit";
import Save from "../icons/save";

const Card = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };
  const indexLookupObject = {
    1: <ShortAnswerField />,
    2: <ShortAnswerField type="number" />,
    3: <DatePicker />,
    4: <ShortAnswerField />,
    5: <LongAnswerField />,
    6: (
      <RadioGroup
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        name={"name"}
        selectedValue={selectedOption}
        onChange={handleRadioChange}
      />
    ),
  };

  return (
    <div className="grid gap-5 w-full  md:px-6 mt-10 ">
      {[1, 2, 3, 4, 5, 6]?.map((node, index) => {
        return (
          <CardContainer key={index + node}>
            <CardHeader
              title="Write a question here"
              inputType="Short Answer"
              helperText="Which front-end framework do you prefer working with?"
              key="Write a question here"
            />
            {indexLookupObject[node as keyof typeof indexLookupObject]}
          </CardContainer>
        );
      })}
    </div>
  );
};

export default Card;

export const CardContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="border mb-5 group border-gray-200 hover:bg-gray-50 duration-150 rounded-2xl flex flex-col gap-2 p-4  w-full">
      {children}
    </section>
  );
};

interface CardHeaderProps {
  title: string;
  helperText?: string;
  inputType: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  helperText,
  inputType,
}) => {
  const CardIcon = dropdownOptions?.filter((choices) => {
    return (
      choices?.option?.toLowerCase()?.trim() ===
      inputType?.toLowerCase()?.trim()
    );
  })[0].icon;
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1 items-center justify-start font-medium ">
      <div className="flex justify-between  items-center w-full">
        <EditableLabel label={title} />
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDropDownOpen(!dropDownOpen);
            }}
            className="flex items-center gap-1"
          >
            {CardIcon ?? ""}

            <span className="inline-block relative">
              <DropDownArrow />
              {dropDownOpen && <InputTypesDropdown />}
            </span>
          </button>
          <DragHandle />
        </div>
      </div>

      <p className="text-sm mr-auto font-normal flex items-center gap-2">
        <EditableLabel label={helperText ?? "none"} />
      </p>
    </div>
  );
};

const EditableLabel = ({ label: defaultLabel }: { label: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(defaultLabel);

  return isEditing ? (
    <div className="flex gap-2 items-center">
      <input
        onBlur={() => setIsEditing(false)}
        value={label}
        onChange={(e) => setLabel(e?.target?.value)}
        className="border px-2  border-gray-200 min-h-7 rounded-lg shadow-soft  "
      />
      <button
        onClick={() => setIsEditing(false)}
        className="md:hidden block group-hover:block cursor-pointer"
      >
        {<Save />}
      </button>
    </div>
  ) : (
    <label className="flex items-center gap-1">
      {label}
      <button
        onClick={() => setIsEditing(true)}
        className="md:hidden block group-hover:block cursor-pointer"
      >
        {<Edit />}
      </button>
    </label>
  );
};
