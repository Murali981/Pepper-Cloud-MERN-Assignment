// src/pages/EditForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InputTypes from "../components/FormBuilder/InputTypes";
import InputConfig from "../components/FormBuilder/InputConfig";
import FormInput from "../components/FormBuilder/FormInput";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/forms/${id}`
        );
        setTitle(response.data.title);
        setInputs(response.data.inputs);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [id]);

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

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/forms/${id}`, {
        title,
        inputs,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating form:", error);
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
          onClick={handleUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Update Form
        </button>
      </div>
    </div>
  );
};

export default EditForm;
