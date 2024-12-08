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

interface DataType {
  title: string;
  helpertext: string;
  value: string;
  inputType: string;
  id: string;
}

const Card = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  const inputLookupObject = {
    shortanswer: <ShortAnswerField />,
    date: <DatePicker />,
    longanswer: <ShortAnswerField type="number" />,
    url: <ShortAnswerField />,
    number: <LongAnswerField />,

    singleselect: (
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

  const testJSON = [
    {
      id: "1",
      title: "First Name",
      helpertext: "Enter your first name",
      value: "",
      inputType: "shortanswer",
    },
    {
      id: "2",

      title: "Last Name",
      helpertext: "Enter your last name",
      value: "",
      inputType: "shortanswer",
    },
    {
      id: "3",

      title: "Email Address",
      helpertext: "Enter a valid email address",
      value: "",
      inputType: "url",
    },
    {
      id: "4",

      title: "Phone Number",
      helpertext: "Enter your phone number",
      value: "",
      inputType: "date",
    },
    {
      id: "5",

      title: "Password",
      helpertext: "Create a strong password",
      value: "",
      inputType: "longanswer",
    },
    {
      id: "6",

      title: "Date of Birth",
      helpertext: "Select your birth date",
      value: "",
      inputType: "number",
    },
    {
      id: "7",

      title: "optioons",
      helpertext: "Select your birth options",
      value: "",
      inputType: "singleselect",
    },
  ];

  const [data, setData] = useState<DataType[]>(testJSON);

  return (
    <div className="grid gap-4 w-full  md:px-6 mt-10 ">
      {data.map((node, index) => {
        console.log("dljnasjnd", node?.inputType);
        return (
          <CardContainer key={index + node?.title}>
            <CardHeader
              data={node}
              updateData={setData}
              title={node?.title}
              inputType={node?.inputType}
              helperText={node?.helpertext}
              key={node?.title}
            />
            {
              inputLookupObject[
                node?.inputType as keyof typeof inputLookupObject
              ]
            }
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

export const Actions: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

interface CardHeaderProps {
  title: string;
  helperText?: string;
  inputType: string;
  data: DataType;
  updateData: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  helperText,
  inputType,
  updateData,
  data,
}) => {
  const CardIcon = dropdownOptions?.filter((choices) => {
    return (
      choices?.option?.toLowerCase()?.trim()?.replaceAll(" ", "") ===
      inputType?.toLowerCase()?.trim()
    );
  })[0]?.icon;

  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1 items-center justify-start font-medium ">
      <div className="flex justify-between  items-center w-full">
        <EditableLabel
          labelType="title"
          data={data}
          key={`${title}+id`}
          updateData={updateData}
          label={title}
        />
        <Actions>
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
        </Actions>
      </div>
      <div className="text-sm mr-auto font-normal flex items-center gap-2">
        <EditableLabel
          labelType="helperText"
          data={data}
          key={`${helperText}+id`}
          updateData={updateData}
          label={helperText ?? "none"}
        />
      </div>
    </div>
  );
};

const EditableLabel = ({
  label: defaultLabel,
  updateData,
  data,
  labelType,
}: {
  label: string;
  labelType: "title" | "helperText";
  data: DataType;
  updateData: React.Dispatch<React.SetStateAction<DataType[]>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(defaultLabel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData((prevState) => {
      const indexOfCurrentItem = prevState?.findIndex(
        (node) => node.id === data?.id
      );
      prevState[indexOfCurrentItem] = {
        ...prevState[indexOfCurrentItem],
        [labelType]: e?.target?.value,
      };
      return prevState;
    });
    setLabel(e?.target?.value);
  };

  return isEditing ? (
    <div className="flex gap-2 items-center">
      <input
        onBlur={() => setIsEditing(false)}
        value={label}
        onChange={(e) => handleChange(e)}
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
      {label?.length ? label : "Write a question"}
      <button
        onClick={() => setIsEditing(true)}
        className="md:hidden block group-hover:block cursor-pointer"
      >
        {<Edit />}
      </button>
    </label>
  );
};
