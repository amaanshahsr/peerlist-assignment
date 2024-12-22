"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Saved } from "@/app/page";
import useDataStore, { DataType } from "@/app/store";
import Card from "@/app/components/Card/card";
import CoreButton from "@/app/components/coreButton";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  return (
    <div className="relative sm:border-x border-gray-200  min-h-screen flex flex-col items-center ">
      <Toaster />
      <Header />
      <section className="flex flex-col items-center w-full h-[calc(100vh-8rem)]  overflow-scroll ">
        <Card />
      </section>
      <Footer />
    </div>
  );
};

export default Page;

const Header = () => {
  const searchParams = useSearchParams();
  const viewMode = searchParams?.get("type");
  const { data, replaceData } = useDataStore();
  const uuid = usePathname()?.split("/")[2];
  const saved = window?.localStorage?.getItem(viewMode ?? "saved");
  let parsedSavedData: Saved = null;

  try {
    parsedSavedData = saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error parsing saved data from localStorage:", error);
    parsedSavedData = null; // Default to null or handle gracefully
  }

  const formData = parsedSavedData?.filter((node) => {
    const id = Object?.keys(node)[0];
    return id === uuid;
  })[0][uuid];

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (formData) {
      replaceData(formData);
    }
  }, []);

  useEffect(() => {
    const validData = data?.filter((node) => !("uuid" in node)) as DataType[];
    const totalItems = validData?.length;
    const validItems = validData?.filter((node) => node?.value !== "")?.length;
    console.log("validData", validData, totalItems, validItems);
    setProgress(Math.round((validItems / totalItems) * 100));
  }, [data]);

  return (
    <header className="grid grid-cols-2 w-full  h-16 group  px-6 border-b border-gray-200  text-gray-1000 text-base font-semibold py-4 items-center">
      <p>{formData?.filter((node) => "uuid" in node)[0]?.title}</p>
      <div className=" flex flex-col gap-3 items-end">
        <p>Form completeness — {progress}%</p>
        <div className="h-1 bg-gray-200 w-full relative rounded-[4px]">
          <div
            style={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-1 z-10 duration-200 bg-green-400"
          ></div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const { data, updateData } = useDataStore();

  const notValid = (item: DataType): boolean =>
    item.value.trim().length === 0 ||
    (item?.inputType === "url" && !item?.value?.includes("https"));

  function findAllWrongItemIndices(
    data: DataType[],
    notValid: (item: DataType) => boolean
  ) {
    return data.reduce((indices, item) => {
      if (notValid(item)) indices.push(item);
      return indices;
    }, [] as DataType[]);
  }

  const handleCLick = () => {
    const validData = data?.filter((node) => !("uuid" in node)) as DataType[];
    const indices = findAllWrongItemIndices(validData, notValid);
    console.log("asjdaksdbahks,", indices);

    if (indices?.length > 0) {
      indices?.forEach((node) => {
        updateData({ ...node, hasError: true });
        toast(`Please Fill ${node?.title}`, {
          icon: "❌",
        });
      });
    } else {
      toast(`Form Submitted Succesfully`, {
        icon: "🚀",
      });
    }
  };
  return (
    <div className="flex justify-between items-center w-full md:px-6">
      <CoreButton route="/" status="active" text="Back" iconPosition="left" />
      <CoreButton
        handleClick={handleCLick}
        text="Submit"
        status="active"
        styles=" bg-[#00AA45] ml-auto mr-6 mb-6 text-white border border-green-500"
      />
    </div>
  );
};
