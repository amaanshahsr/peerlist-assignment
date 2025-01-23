"use client";

import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Card from "../components/Card/card";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full min-h-screen relative sm:border-x border-gray-200 ">
        <Toaster />
        <Header />
        <section className="flex flex-col items-center w-full  h-[calc(100vh-8rem)] overflow-scroll ">
          <Card />
        </section>
        <Footer />
      </main>
    </Suspense>
  );
};

export default Page;
