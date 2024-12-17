

import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";


export interface OptionType {
    value: string;
    label: string;
    id: string;
  }
export interface DataType {
    title: string;
    helperText?: string;
    value: string;
    inputType:
      | "shortanswer"
      | "date"
      | "longanswer"
      | "url"
      | "number"
      | "singleselect";
    id: string;
    options?: OptionType[];
    hasError?:boolean
  }
 export  type DataItem = DataType |title
export type title={ title: string,uuid:string ,timestamp:Date}
interface DataStore {
    data: DataItem[];
    addData: (item: DataType) => void;
    updateData: (updatedFields: DataItem) => void;
    updateTitle:(title:title)=>void
    replaceData:(data:DataItem[])=>void
   
  }
  
  export const useDataStore = create<DataStore>((set) => ({
    data: [],
    replaceData:(item)=>
        set(() => ({ data: item})),

    addData: (item) => 
      set((state) => ({ data: [...state.data, item] })),
    updateData: (updatedFields: DataItem) => set((state) => {
        // Use a type guard to check if item is a DataType before accessing its 'id'
        const updatedData = state.data.map((item) => {
          console.log("hetertetet8",updatedFields)
          if ("id" in item && "id" in updatedFields && item.id === updatedFields?.id) {
            return { ...updatedFields };  // Update the DataType object
          }
          return item;  // If it's a title-only object, return it as is
        });
        return { data: updatedData };
      }),
      updateTitle: (formTitle: title) => set((state) => {
        console.log("formTItle",formTitle)


        // Filter out objects that have only 'title' and do not have 'id'
        const filteredData = state.data?.filter((node) => {
          return "id" in node;
        });

        const uuidExists="uuid" in formTitle
        const timestampExists="timestamp" in formTitle

      
        // Add the new data entry with title
        return {
          data: [{ title: formTitle?.title,uuid:uuidExists?formTitle?.uuid:uuidv4(),
            timestamp:timestampExists?formTitle?.timestamp:new Date()
           }, ...filteredData], // Spread filtered data and add new title
        };
      }),
  }));

export default useDataStore;