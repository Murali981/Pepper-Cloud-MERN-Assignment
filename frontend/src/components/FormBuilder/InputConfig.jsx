/* eslint-disable */
import { useState } from "react";

const InputConfig = ({ onAdd }) => {
  const [config, setConfig] = useState({
    title: "",
    placeholder: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(config);
    setConfig({ title: "", placeholder: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          value={config.title}
          onChange={(e) =>
            setConfig((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Placeholder</label>
        <input
          type="text"
          value={config.placeholder}
          onChange={(e) =>
            setConfig((prev) => ({ ...prev, placeholder: e.target.value }))
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Input
      </button>
    </form>
  );
};

export default InputConfig;
