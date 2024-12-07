import React from "react";
import Arrow from "../icons/arrow";
import Plus from "../icons/plus";
import CoreButton from "../components/coreButton";
import BaseInput from "../components/baseInput";

const page = () => {
  return (
    <div className=" md:min-w-[640px] border-x border-gray-200 col-start-2 ">
      <header className="flex justify-between px-6 border-b border-gray-200  text-gray-400 text-base font-semibold py-4 items-center">
        Untitled form
        <button className="border flex items-center text-gray-400  gap-2 rounded-xl py-[0.375rem] px-4">
          Preview <Arrow />
        </button>
      </header>
      <section className="flex flex-col items-center">
        <button className="border flex items-center font-semibold shadow-soft text-gray-1000/40  gap-2 mt-6 rounded-xl py-[0.375rem] px-4">
          <Plus /> Add Question
        </button>

        <CoreButton
          iconPosition="right"
          iconType="add"
          text="Add Question"
          status="active"
          key="Add Question"
        />

        <div className="my-10">
          <BaseInput />
        </div>
      </section>
    </div>
  );
};

export default page;
