"use client";

import React from "react";
import CoreButton from "./components/coreButton";
import { useRouter } from "next/navigation";
import Saved from "./components/tableSection";
import TableSection from "./components/tableSection";
import useDataStore from "./store";

export type Saved =
  | { [k: string]: { title: string; timestamp: Date; uuid: string }[] }[]
  | null;
const Home = () => {
  const Container = "div";
  return (
    <Container
      className={`w-full  relative sm:border-x border-gray-200  flex flex-col items-center `}
    >
      <GetStarted />
      <TableSection key="saved" keyString="saved" title="Saved Forms" />
      <TableSection key="drafts" keyString="drafts" title="Drafts" />
    </Container>
  );
};

export default Home;

const GetStarted = () => {
  const { replaceData } = useDataStore();
  const router = useRouter();
  const handleRoute = () => {
    replaceData([]);
    router?.push("/create");
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5 py-10">
      <h1 className="text-3xl font-semibold">Get Started</h1>
      <CoreButton
        status="active"
        text="New"
        icon="arrow"
        iconPosition="right"
        handleClick={handleRoute}
      />
    </section>
  );
};
