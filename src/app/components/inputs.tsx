"use client";

import React, { useState } from "react";
import DateIcon from "../icons/date";
import { dropdownOptions } from "../constants";
import Plus from "../icons/plus";

interface ShortAnswerProps {
  type?: "number" | "url" | "text";
}

export const ShortAnswerField: React.FC<ShortAnswerProps> = ({ type }) => {
  // bg-gray-200
  console.log(type);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (type === "number") {
      event.currentTarget.value = event?.currentTarget.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1")
        .replace(/^0[^.]/, "0");
    } else {
      return;
    }
  };
  return (
    <input
      onInput={(e) => {
        handleInput(e);
      }}
      className="border px-2 type border-gray-200 min-h-8 rounded-lg shadow-soft   w-full"
    />
  );
};

export const LongAnswerField = () => {
  return (
    <textarea className="border min-h-20 px-2 resize-none border-gray-200 rounded-lg shadow-soft   w-full" />
  );
};

export const DatePicker = () => {
  // Keep track of value changes for replacing placeholder
  const [inputValue, setInputValue] = useState<string | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value?.split("-")?.toReversed()?.join("-"));
  };

  return (
    <div className="relative h-max ">
      <input
        type="date"
        onChange={(e) => handleChange(e)}
        className="border px-2  border-gray-200  min-h-8 rounded-lg shadow-soft opacity-0  cursor-pointer w-full"
      />
      <div className="absolute top-0 flex justify-between items-center px-2 w-full z-10 text-sm pointer-events-none  text-gray-400 min-h-8 border  border-gray-200  rounded-lg shadow-soft   ">
        {inputValue ? inputValue : "MM-DD-YYYY"}
        <DateIcon />
      </div>
    </div>
  );
};

export const InputTypesDropdown = () => {
  return (
    <ul
      className={` absolute top-[calc(100%+0.50rem)] z-30 bg-white rounded-2xl p-1 min-w-64 left-1/2 flex flex-col border border-gray-300  -translate-x-1/2 `}
    >
      <li
        key={"Input types"}
        className="list-none capitalize py-2 px-4 flex gap-3 rounded-lg text-gray-500 justify-start items-center bg-gray-50"
      >
        Input Types
      </li>
      {dropdownOptions?.map((choices) => {
        return (
          <li
            key={choices?.option}
            className="list-none flex gap-3 p-2 justify-start items-center  font-medium text-gray-1000 hover:bg-gray-200"
          >
            {choices?.icon} {choices?.option}
          </li>
        );
      })}
    </ul>
  );
};

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[]; // List of radio options
  name: string; // Name attribute for the group
  selectedValue: string; // Currently selected value
  onChange: (value: string) => void; // Callback when a radio button is selected
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option, index) => (
        <label
          key={option.value}
          className="flex items-center space-x-2 text-gray-700"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4  border-gray-300 "
          />
          {/* <span>{option.label}</span> */}
          {index === 2 ? (
            <div className="w-full flex items-center gap-2">
              <input className="border px-2 type border-gray-200 min-h-8 rounded-lg shadow-soft basis-full  " />
              <button>
                <Plus />
              </button>
            </div>
          ) : (
            <input className="border px-2 type border-gray-200 min-h-8 rounded-lg shadow-soft basis-full  " />
          )}
        </label>
      ))}
    </div>
  );
};
