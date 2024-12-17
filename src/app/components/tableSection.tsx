import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Arrow from "../icons/arrow";

interface TableSectionProps {
  title: string;
  keyString: string;
}

interface Form {
  [k: string]: { title: string; timestamp: Date; uuid: string }[];
}

const TableSection: React.FC<TableSectionProps> = ({ title, keyString }) => {
  const [currentData, setCurrentData] = useState<Form[] | null>(null);

  useEffect(() => {
    const hasWindow = () => {
      return typeof window === "object";
    };

    if (!hasWindow()) {
      // server-side code
    } else {
      const dataFromStorage = window?.localStorage?.getItem(keyString);

      try {
        const parsedData = dataFromStorage ? JSON.parse(dataFromStorage) : null;
        setCurrentData(parsedData);
      } catch (error) {
        console.error("Error parsing saved data from localStorage:", error);
        setCurrentData(null);
        // Default to null or handle gracefully
      }
    }
  }, []);

  const router = useRouter();

  return (
    currentData && (
      <section className="w-full px-4 flex flex-col mt-4  gap-3">
        <h1 className="text-xl font-semibold">{title} </h1>
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
                <th className="px-4 py-2 border text-center border-gray-200  text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((form: Form, index: number) => {
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
                    <td className="px-4 py-4 flex items-center justify-center   border-b text-sm text-blue-500">
                      <button
                        onClick={() =>
                          router?.push(`edit/${key}?type=${keyString}`)
                        }
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
    )
  );
};

export default TableSection;
