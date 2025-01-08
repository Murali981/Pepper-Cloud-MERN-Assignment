/* eslint-disable */
const InputTypes = ({ onSelectType }) => {
  const inputTypes = [
    { type: "TEXT", label: "Text" },
    { type: "NUMBER", label: "Number" },
    { type: "EMAIL", label: "Email" },
    { type: "PASSWORD", label: "Password" },
    { type: "DATE", label: "Date" },
  ];

  return (
    <div className="flex gap-2 my-4">
      {inputTypes.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => onSelectType(type)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default InputTypes;
