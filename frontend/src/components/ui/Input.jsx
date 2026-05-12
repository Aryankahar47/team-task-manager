function Input({
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        bg-zinc-900
        border
        border-zinc-700
        rounded-xl
        px-4
        py-3
        text-white
        placeholder:text-zinc-400
        outline-none
        focus:border-indigo-500
        transition
      "
    />
  );
}

export default Input;