/* eslint-disable */

const FormInput = ({ input, onDelete, index }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{input.title}</h3>
        <button
          onClick={() => onDelete(index)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
      <input
        type={input.type.toLowerCase()}
        placeholder={input.placeholder}
        className="w-full p-2 border rounded"
        readOnly
      />
    </div>
  );
};

export default FormInput;
