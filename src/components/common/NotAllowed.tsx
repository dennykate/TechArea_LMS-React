const NotAllowed = () => {
  return (
    <div className="flex justify-center items-center w-full h-[100vh] bg-gray-100">
      <div className="h-[300px]">
        <img
          src="/assets/unauthorised.svg"
          alt="Unauthorised"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NotAllowed;
