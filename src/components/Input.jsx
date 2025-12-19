const Input = ({ label, type = "text", name, value, onChange, placeholder }) => (
  <label className="block w-full">
    <div className="text-sm text-gray-300 mb-2">{label}</div>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400 text-white"
    />
  </label>
);

export default Input;