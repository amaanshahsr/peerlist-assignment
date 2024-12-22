"use client";

import { dropdownOptions } from "@/app/constants";
import DragHandle from "@/app/icons/dragHandle";
import DropDownArrow from "@/app/icons/dropDownArrow";
import useDataStore, { DataType } from "@/app/store";
import { Suspense, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { InputTypesDropdown } from "../inputs";
import { Actions } from "./card";

interface CardHeaderProps {
  item: DataType;
}
import { usePathname } from "next/navigation";
import EditableLabel from "../ediitableLabel";
export const CardHeader: React.FC<CardHeaderProps> = ({ item }) => {
  const router = usePathname();
  const isEditMode = router?.includes("create");

  console.log("iseditmode", isEditMode);
  const { title, helperText, inputType } = item;

  const { updateData } = useDataStore();
  const CardIcon = dropdownOptions?.filter((choices) => {
    return (
      choices?.option?.toLowerCase()?.trim()?.replaceAll(" ", "") ===
      inputType?.toLowerCase()?.trim()
    );
  })[0]?.icon;

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleDropDownChange = (value: string) => {
    const copyItem = {
      ...item,
      inputType: value
        ?.trim()
        ?.toLowerCase()
        ?.replaceAll(" ", "") as DataType["inputType"],
    };

    updateData(copyItem);
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState("");
  const handleDropDownClick = () => {
    if (buttonRef.current) {
      // Get the button's position relative to the viewport
      const rect = buttonRef.current.getBoundingClientRect();

      // Calculate the distance from the bottom of the viewport
      const distanceFromBottom = window.innerHeight - rect.bottom;

      console.log(`Distance from bottom: ${distanceFromBottom}px`);

      // Check if the button is 400px above the bottom
      if (distanceFromBottom >= 400) {
        console.log(
          "The button is at least 400px above the bottom of the page."
        );
        setPosition("right-0 lg:right-0 top-[calc(100%+0.50rem)] ");
      } else {
        console.log(
          "The button is closer than 400px to the bottom of the page."
        );
        setPosition("right-0  bottom-[calc(100%+0.50rem)] ");
      }
    }

    setDropDownOpen(!dropDownOpen);
  };
  useOutsideClick(
    buttonRef,
    () => {
      setDropDownOpen(false);
    },
    []
  );

  return (
    <div className="w-full flex flex-col gap-1 items-center justify-start font-medium ">
      <div className="flex justify-between  items-center w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <EditableLabel
            labelType="title"
            item={item}
            updateData={updateData}
            key={`title${item?.id}`}
            label={title}
          />
        </Suspense>
        {isEditMode && (
          <Actions>
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.preventDefault();
                handleDropDownClick();
              }}
              className="flex items-center gap-1 relative"
            >
              {CardIcon ?? ""}
              <span className="inline-block ">
                <DropDownArrow />
                {dropDownOpen && (
                  <InputTypesDropdown
                    position={position}
                    handleDropDownChange={handleDropDownChange}
                  />
                )}
              </span>
            </button>
            <DragHandle />
          </Actions>
        )}
      </div>
      <div className="text-sm mr-auto font-normal flex items-center gap-2">
        <Suspense fallback={<div>Loading...</div>}>
          <EditableLabel
            updateData={updateData}
            labelType="helperText"
            item={item}
            key={`helpertext${item?.id}`}
            label={helperText ?? "none"}
          />
        </Suspense>
      </div>
    </div>
  );
};
