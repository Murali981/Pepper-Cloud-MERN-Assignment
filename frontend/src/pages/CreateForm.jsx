/* eslint-disable */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateForm = () => {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [showInputTypes, setShowInputTypes] = useState(false);
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [selectedInputType, setSelectedInputType] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState(null);

  const handleTitleEdit = () => {
    setShowTitleEdit(true);
  };

  const updateTitle = (newTitle) => {
    setFormTitle(newTitle);
  };

  const toggleInputTypes = () => {
    setShowInputTypes(!showInputTypes);
    setSelectedInputType(null);
    setCurrentInput(null);
  };

  const selectInputType = (type) => {
    setSelectedInputType(type);
    setCurrentInput({
      type,
      title: "",
      placeholder: "",
    });
  };

  const handleInputEdit = (index) => {
    console.log(inputs);
    setCurrentInput({ ...inputs[index], index });
    console.log(currentInput);
    console.log(index);
  };

  const handleInputDelete = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleInputSave = (inputData) => {
    if (inputData.index !== undefined) {
      // Edit existing input
      setInputs(
        inputs.map((input, i) => (i === inputData.index ? inputData : input))
      );
    } else {
      // Add new input
      setInputs([...inputs, inputData]);
    }
    setCurrentInput(null);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/forms`, {
        title: formTitle,
        inputs,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl text-center mb-8">Create New Form</h1>

      <div className="grid grid-cols-2 ">
        {/* Left Column - Form Preview */}
        <div className="bg-white px-6 py-12 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">{formTitle}</h2>
            <button onClick={handleTitleEdit} className="text-blue-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          {inputs.map((input, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <div className="flex justify-between items-center">
                <span>{input.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      console.log(index);
                      handleInputEdit(index);
                    }}
                    className="text-blue-500"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleInputDelete(index)}
                    className="text-red-500"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={toggleInputTypes}
              className="w-[150px]  py-2 mt-4 bg-blue-100  text-blue-700  rounded"
            >
              {showInputTypes ? "CLOSE ADD INPUT" : "ADD INPUT"}
            </button>
          </div>

          {showInputTypes && (
            <div className="text-center w-full">
              <div className="flex gap-3 mt-5">
                {["TEXT", "NUMBER", "EMAIL", "PASSWORD", "DATE"].map((type) => (
                  <button
                    key={type}
                    onClick={() => selectInputType(type)}
                    className="px-4 py-2 bg-blue-500 text-white  rounded"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Form Editor */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Form Editor</h3>

          {showTitleEdit && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => updateTitle(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {currentInput && (
            <div>
              <h4 className="font-medium mb-4">{currentInput.type}</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentInput.title}
                    onChange={(e) =>
                      setCurrentInput({
                        ...currentInput,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    value={currentInput.placeholder}
                    onChange={(e) =>
                      setCurrentInput({
                        ...currentInput,
                        placeholder: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  onClick={() => {
                    console.log(currentInput);
                    handleInputSave(currentInput);
                  }}
                  className="w-full py-2 bg-green-500 text-white rounded"
                >
                  Save Input
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          CREATE FORM
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
