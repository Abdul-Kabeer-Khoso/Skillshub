const PurchasedCourseBox = ({ children }) => {
  return (
    <div className="w-full h-[49%] bg-[white] border-1 border-gray-200 rounded-xl py-3 px-4 mt-5 overflow-auto flex flex-col justify-start items-center">
      {children}
    </div>
  );
};

export default PurchasedCourseBox;
