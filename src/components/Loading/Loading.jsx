const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-4 border-solid"></div>
      <div className="ml-4 text-blue-500 text-2xl font-semibold">
        Loading...
      </div>
    </div>
  );
};
export default Loading;
