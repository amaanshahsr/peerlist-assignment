"use client";
import toast from "react-hot-toast";
import useDataStore, { DataItem, DataType } from "../store";
import CoreButton from "./coreButton";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const Footer = () => {
  const { data, updateData } = useDataStore();
  const location = usePathname();
  const notValid = (item: DataType): boolean =>
    item.title.trim().length === 0 ||
    (item.options?.some((node) => node?.label.trim().length === 0) ?? false);

  function findAllWrongItemIndices(
    data: DataType[],
    notValid: (item: DataType) => boolean
  ) {
    return data.reduce((indices, item) => {
      if (notValid(item)) indices.push(item);
      return indices;
    }, [] as DataType[]);
  }

  const handleClick = () => {
    const drafts = window?.localStorage?.getItem("drafts");
    const formDetails = data?.filter((node) => "uuid" in node);
    console.log("formDetails", formDetails ? true : false);

    if (formDetails?.length === 0) {
      toast("Please enter a title for your form", {
        icon: "📝",
      });
      return;
    }

    const entry = { [formDetails[0]?.uuid]: data };

    if (drafts) {
      const parsedDrafts = JSON?.parse(drafts);

      const updatedDrafts = parsedDrafts.map((node: DataItem) => {
        // Check if the entry already exists
        if (Object.keys(node)[0] === formDetails[0]?.uuid) {
          // Update the existing entry
          return entry;
        }
        return node;
      });

      // Check if an update occurred, otherwise add a new entry
      const entryAlreadyExist = updatedDrafts.some(
        (node: DataItem) => Object.keys(node)[0] === formDetails[0]?.uuid
      );

      if (!entryAlreadyExist) {
        updatedDrafts.unshift(entry);
      }

      window?.localStorage?.setItem("drafts", JSON?.stringify(updatedDrafts));
      toast(entryAlreadyExist ? "Draft updated" : "Saved to Drafts", {
        icon: entryAlreadyExist ? "🔄" : "💽",
      });
    } else {
      // If no drafts exist, create a new array with the entry
      window?.localStorage?.setItem("drafts", JSON?.stringify([entry]));
      toast("Saved to Drafts", {
        icon: "💽",
      });
    }

    router?.push("/");
  };

  // const handleClick = () => {
  //   const drafts = window?.localStorage?.getItem("drafts");
  //   const formDetails = data?.filter((node) => "uuid" in node);
  //   console.log("fromdetails", formDetails ? true : false);
  //   if (formDetails?.length === 0) {
  //     toast("Please enter a title for your form", {
  //       icon: "📝",
  //     });
  //     return;
  //   } else if (drafts) {
  //     const entry = { [formDetails[0]?.uuid]: data };
  //     const parsedDrafts = JSON?.parse(drafts);

  //     const entryAlreadyExist = parsedDrafts?.find(
  //       (node: { [key: string]: DataItem }) =>
  //         Object.keys(node)[0] === formDetails[0]?.uuid
  //     );
  //     const entryIndex = parsedDrafts?.findIndex(
  //       (node: { [key: string]: DataItem }) =>
  //         Object.keys(node)[0] === formDetails[0]?.uuid
  //     );

  //     if (entryAlreadyExist) {

  //       toast("Already Saved", {
  //         icon: "✅",
  //       });
  //       return;
  //     }
  //     const updatedDrafts = [entry, ...parsedDrafts];
  //     window?.localStorage?.setItem("drafts", JSON?.stringify(updatedDrafts));
  //     toast("Saved to Drafts", {
  //       icon: "💽",
  //     });
  //     router?.push("/");
  //   } else {
  //     const entry = { [formDetails[0]?.uuid]: data };
  //     window?.localStorage?.setItem("drafts", JSON?.stringify([entry]));
  //     toast("Saved to Drafts", {
  //       icon: "💽",
  //     });
  //     router?.push("/");
  //   }
  // };

  const handleSave = () => {
    const formData = data?.filter((node) => "inputType" in node);
    const formDetails = data?.filter((node) => "uuid" in node);

    const indices = findAllWrongItemIndices(formData, notValid);

    console.log("indixess", indices);
    if (formData?.length === 0) {
      toast("Please provide at least one input to proceed.", {
        icon: "1️⃣",
      });
      return;
    }
    if (formDetails[0]?.title?.trim() === "" || formDetails?.length === 0) {
      toast("Please enter a title for your form", {
        icon: "📝",
      });
      return;
    }

    if (indices?.length) {
      indices?.forEach((node) => {
        updateData({ ...node, hasError: true });
      });
      toast(`Please Fill all Fields `, {
        icon: "🛑",
      });
    } else {
      const saved = window?.localStorage?.getItem("saved");

      console.log("saved", saved);

      let copyData = [...data];
      copyData = copyData?.map((node) => {
        // updateData({ ...node, value: "" });
        return { ...node, value: "", hasError: false };
      });

      console.log("savedDadsada", copyData);

      const entry = { [uuidv4()]: copyData };
      console.log("savedd", saved, copyData);
      const updatedSaves = saved ? [entry, ...JSON?.parse(saved)] : [entry];
      window?.localStorage?.setItem("saved", JSON?.stringify(updatedSaves));
      toast("Published", {
        icon: "💽",
      });
    }

    console.log("ajdbaksdbjkjas", data);
  };
  const router = useRouter();
  return location?.includes("create") ? (
    <footer className="flex basis-full bg-gray-200 w-full h-16  justify-between px-6 border-t  border-gray-200  text-gray-400 text-base font-semibold py-4 items-center">
      <CoreButton
        handleClick={handleClick}
        status="active"
        text="Save as Draft"
        icon="save"
        iconPosition="left"
      />
      <CoreButton
        handleClick={handleSave}
        styles="bg-green-400 text-white"
        status="active"
        text="Publish form"
        icon="check"
        iconPosition="left"
      />
    </footer>
  ) : (
    <footer className="flex basis-full bg-gray-200 w-full h-16  justify-between px-6 border-t  border-gray-200  text-gray-400 text-base font-semibold py-4 items-center">
      <CoreButton
        handleClick={() => router?.push("/create")}
        status="active"
        text="Back"
        iconPosition="left"
      />
    </footer>
  );
};
