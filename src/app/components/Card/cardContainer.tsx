export const CardContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="border mb-5 group border-gray-200 hover:bg-gray-50 duration-150 rounded-2xl flex flex-col gap-2 p-4  w-full">
      {children}
    </section>
  );
};
