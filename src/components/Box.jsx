function Box({ children }) {
  return (
    <>
      <div className="bg-neutral-800 rounded-md h-[calc(100vh-105px)] overflow-auto">
        {children}
      </div>
    </>
  );
}

export default Box;
