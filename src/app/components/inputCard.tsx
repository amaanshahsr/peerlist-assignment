"use client";
import React from "react";
import DragHandle from "../icons/dragHandle";
import {
  DatePicker,
  dropdownOptions,
  LongAnswerField,
  ShortAnswerField,
} from "./inputs";

const InputCard = () => {
  const indexLookupObject = {
    1: <ShortAnswerField />,
    2: <ShortAnswerField type="number" />,
    3: <DatePicker />,
    4: <ShortAnswerField />,
    5: <LongAnswerField />,
  };

  console.log("sadojuansidun", dropdownOptions);
  return (
    <form className="grid gap-5 w-full">
      {[1, 2, 3, 4, 5]?.map((index) => {
        return (
          <section
            key={index}
            className="border border-gray-200 hover:bg-gray-50 duration-150 rounded-2xl flex flex-col gap-2 p-4  w-full"
          >
            <div className="w-full flex flex-col gap-1 items-center justify-start font-medium ">
              <div className="flex justify-between  items-center w-full">
                <label>Write a question</label>
                <div className="flex items-center gap-4">
                  {dropdownOptions[index]?.icon}
                  <DragHandle />
                </div>
              </div>
              <p className="text-sm mr-auto font-normal max-w-1/2">
                Which front-end framework do you prefer working with?
              </p>
            </div>
            {indexLookupObject[index as keyof typeof indexLookupObject]}
          </section>
        );
      })}
    </form>
  );
};

export default InputCard;
