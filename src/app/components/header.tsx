"use client";
import React, { useEffect, useState } from "react";
import CoreButton from "./coreButton";
import useDataStore, { DataItem, DataType } from "../store";
import { usePathname } from "next/navigation";
import EditableLabel from "./ediitableLabel";
export const Header = () => {
  const { updateTitle, data } = useDataStore();
  const pathname = usePathname();
  // titleObj will initially be []

  const [titleObj, setTitleObj] = useState<DataItem[]>([]);
  useEffect(() => {
    const titleObj = data?.filter((node) => "uuid" in node);
    setTitleObj(titleObj);
  }, [data]);

  console.log(
    "a,sdjbkasdbjkbjasd",
    titleObj.length > 0 ? titleObj[0]?.title : "Untitled form"
  );
  return (
    <header className="flex basis-full h-16 group  justify-between px-6 border-b border-gray-200  text-gray-400 text-base font-semibold py-4 items-center">
      <EditableLabel
        item={titleObj[0] as DataType}
        label={titleObj.length > 0 ? titleObj[0]?.title : "Untitled Form"}
        labelType="title"
        key="formTitle"
        placeholder={titleObj.length > 0 ? titleObj[0]?.title : "Untitled Form"}
        updateData={updateTitle as (updatedFields: DataItem) => void}
        labelStyles={`${
          pathname?.includes("create") ? "text-gray-1000 " : " text-gray-1000"
        }  flex items-center gap-2`}
      />

      {pathname?.includes("create") && (
        <CoreButton
          route={`/preview`}
          text="Preview"
          icon="arrow"
          iconPosition="left"
          status="active"
        />
      )}
    </header>
  );
};
