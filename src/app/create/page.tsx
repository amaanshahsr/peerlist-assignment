import React, { Suspense } from "react";
import Card from "../components/Card/card";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full min-h-screen relative sm:border-x border-gray-200 ">
        <Toaster />
        <Header />
        <section className="flex flex-col items-center w-full  h-[calc(100vh-8rem)] overflow-scroll px-4 ">
          <Card />
        </section>
        <Footer />
      </main>
    </Suspense>
  );
};

export default page;
