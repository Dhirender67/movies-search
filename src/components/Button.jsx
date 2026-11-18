function Button({ children, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="cursor-pointer w-6 h-6 font-semibold text-2xl flex items-center justify-center bg-neutral-700 rounded-full hover:bg-indigo-900"
      >
        {children}
      </button>
    </>
  );
}

export default Button;
