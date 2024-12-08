import React from "react";
import Arrow from "../icons/arrow";
import CoreButton from "../components/coreButton";
import Card from "../components/Card";

const page = () => {
  return (
    <main className="w-full sm:border-x border-gray-200 ">
      <header className="flex justify-between px-6 border-b border-gray-200  text-gray-400 text-base font-semibold py-4 items-center">
        Untitled form
        <button className="border flex items-center text-gray-400  gap-2 rounded-xl py-[0.375rem] px-4">
          Preview <Arrow />
        </button>
      </header>
      <section className="flex flex-col items-center">
        <CoreButton
          iconPosition="right"
          icon="add"
          text="Add Question"
          status="active"
          key="Add Question"
        />

        <Card />
      </section>
    </main>
  );
};

export default page;
