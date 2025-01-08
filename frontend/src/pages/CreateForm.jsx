// src/pages/CreateForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputTypes from "../components/FormBuilder/InputTypes";
import InputConfig from "../components/FormBuilder/InputConfig";
import FormInput from "../components/FormBuilder/FormInput";

const CreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled Form");
  const [selectedType, setSelectedType] = useState(null);
  const [inputs, setInputs] = useState([]);

  const handleAddInput = (config) => {
    if (inputs.length >= 20) {
      alert("Maximum 20 inputs allowed");
      return;
    }

    setInputs((prev) => [
      ...prev,
      {
        type: selectedType,
        ...config,
      },
    ]);
    setSelectedType(null);
  };

  const handleDeleteInput = (index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/forms", {
        title,
        inputs,
      });
      navigate("/");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold w-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
        />
      </div>

      {!selectedType ? (
        <InputTypes onSelectType={setSelectedType} />
      ) : (
        <InputConfig onAdd={handleAddInput} />
      )}

      <div className="grid grid-cols-2 gap-4 mt-8">
        {inputs.map((input, index) => (
          <FormInput
            key={index}
            input={input}
            index={index}
            onDelete={handleDeleteInput}
          />
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Form
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
