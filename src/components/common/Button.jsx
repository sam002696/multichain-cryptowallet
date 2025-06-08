const Button = ({ children, onClick, type = "button", className }) => {
  const defaultStyles =
    "bg-gray-800 text-white  py-1 px-6 rounded-md focus:outline-none hover:bg-pink-500 border-d-color border-dashed border";
  return (
    <button
      type={type}
      className={`${defaultStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
