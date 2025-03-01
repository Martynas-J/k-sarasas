import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center justify-center px-5 py-3">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          Prekių kategorijos
        </h1>
      </div>
      <div className="flex justify-between sm:justify-center gap-3 sm:gap-24 px-3 xs:px-5">
        {" "}
        {/* Maistas Link */}
        <div className="w-full sm:w-auto">
          <Link
            className="w-full text-xl border-2 border-transparent rounded-lg bg-gradient-to-r from-pink-500 to-purple-400 text-white px-8 py-4 transform transition-all duration-300 hover:scale-105 hover:from-purple-400 hover:to-pink-500 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
            href="/maistas"
          >
            Maistas
          </Link>
        </div>
        {/* Buitis Link */}
        <div className="w-full sm:w-auto">
          <Link
            className="w-full text-xl border-2 border-transparent rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 transform transition-all duration-300 hover:scale-105 hover:from-teal-400 hover:to-blue-500 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
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
