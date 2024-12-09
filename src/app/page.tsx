"use client";

import React, { useEffect, useState } from "react";
import CoreButton from "./components/coreButton";
import { useRouter } from "next/navigation";
import useDataStore, { DataItem } from "./store";
import Arrow from "./icons/arrow";

export type Saved =
  | { [k: string]: { title: string; timestamp: Date; uuid: string }[] }[]
  | null;
const Home = () => {
  const router = useRouter();
  const { replaceData } = useDataStore();
  const handleRoute = (data: DataItem[]) => {
    replaceData(data);
    router?.push("/create");
  };

  const [drafts, setdrafts] = useState<
    { [k: string]: { title: string; timestamp: Date; uuid: string }[] }[] | null
  >(null);
  const [saved, setSaved] = useState<
    { [k: string]: { title: string; timestamp: Date; uuid: string }[] }[] | null
  >(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const drafts = window?.localStorage?.getItem("drafts");
      const saved = window?.localStorage?.getItem("saved");

      try {
        let parsedSavedData = saved ? JSON.parse(saved) : null;
        setSaved(parsedSavedData);
      } catch (error) {
        console.error("Error parsing saved data from localStorage:", error);
        let parsedSavedData = null; // Default to null or handle gracefully
      }

      try {
        let parsedDraftData = drafts ? JSON.parse(drafts) : null;
        setdrafts(parsedDraftData);
      } catch (error) {
        console.error("Error parsing saved data from localStorage:", error);
        let parsedDraftData = null; // Default to null or handle gracefully
      }
    }
  }, []);

  return (
    <div
      className={`w-full ${
        !drafts && !saved
          ? " h-screen justify-center"
          : "min-h-screen justify-start"
      }  relative sm:border-x border-gray-200  flex flex-col items-center `}
    >
      <section className="flex flex-col justify-center items-center gap-5 py-10">
        <h1 className="text-3xl font-semibold">Get Started</h1>
        <CoreButton
          status="active"
          text="New"
          icon="arrow"
          iconPosition="right"
          handleClick={() => router?.push("/create")}
        />
      </section>

      {saved && (
        <section className="w-full px-4 flex flex-col  gap-3">
          <h1 className="text-xl font-semibold">Saved Forms </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Form Name
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {saved?.map((form, index) => {
                  const key = Object.keys(form)[0];

                  return (
                    <tr className="" key={key + index}>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                        {form[key]?.filter((node) => "uuid" in node)[0]?.title}
                      </td>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                        {new Date(
                          form[key]?.filter(
                            (node) => "uuid" in node
                          )[0]?.timestamp
                        )?.toDateString()}
                      </td>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-blue-500">
                        <button
                          onClick={() => router?.push(`edit/${key}`)}
                          className=" hover:underline"
                        >
                          <Arrow />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {drafts && (
        <section className="w-full px-4 flex flex-col  gap-3 mt-7">
          <h1 className="text-xl font-semibold">Drafts </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Form Name
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {drafts?.map((form, index) => {
                  const key = Object.keys(form)[0];
                  console.log("asdnalskdnlasndljansd", form[key]);
                  return (
                    <tr className="" key={key + index}>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                        {form[key]?.filter((node) => "uuid" in node)[0]?.title}
                      </td>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                        {new Date(
                          form[key]?.filter(
                            (node) => "uuid" in node
                          )[0]?.timestamp
                        )?.toDateString()}
                      </td>
                      <td className="px-4 py-2 border border-gray-200 text-sm text-blue-500">
                        <button
                          onClick={() => handleRoute(form[key])}
                          className=" hover:underline mx-auto"
                        >
                          <Arrow />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
