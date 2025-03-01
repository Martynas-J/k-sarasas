const ButtonComponent = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 border-2 shadow-xl border-gray-800 text-white py-3 px-6 rounded-md font-bold  hover:bg-white hover:text-gray-800  focus:outline-none  focus:bg-white focus:text-gray-800"
    >
      {children}
    </button>
  );
};
export default ButtonComponent;
