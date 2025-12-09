const NoPurchasedCourse = () => {
  return (
    <div className="w-full h-[49%] bg-[white] border-1 border-gray-200 rounded-xl py-3 px-4 mt-5 overflow-auto flex flex-col justify-center items-center">
      <img
        src="/No data.webp"
        alt="No purchase course data found"
        className="w-[20%]"
      />
    </div>
  );
};

export default NoPurchasedCourse;
