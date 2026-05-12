function Button({ text, type = "button" }) {
  return (
    <button
      type={type}
      className="
        w-full
        bg-indigo-600
        hover:bg-indigo-700
        transition
        text-white
        py-3
        rounded-xl
        font-semibold
      "
    >
      {text}
    </button>
  );
}

export default Button;