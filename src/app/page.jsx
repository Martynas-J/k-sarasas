import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col sm:items-center gap-5 pt-5">
    <h1 className="text-2xl font-bold text-center">
      Prekių kategotijos
    </h1>
      <div className="flex sm:gap-20 justify-end gap-28 px-2">
        <div>
          <Link
            className=" text-xl border rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-500"
            href="/maistas"
          >
            Maistas
          </Link>
        </div>
        <div>
          <Link
            className=" text-xl border rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-500"
            href="/buitis"
          >
            Buitis
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Page;
