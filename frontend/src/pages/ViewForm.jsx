// src/pages/ViewForm.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/forms/${id}`
        );
        setForm(response.data);

        // Initialize form data
        const initialData = {};
        response.data.inputs.forEach((input) => {
          initialData[input.title] = "";
        });
        setFormData(initialData);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [id]);

  const handleInputChange = (title, value) => {
    setFormData((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/forms/${id}/submit`,
        formData
      );
      alert("Form submitted successfully!");
      // Reset form
      const resetData = {};
      form.inputs.forEach((input) => {
        resetData[input.title] = "";
      });
      setFormData(resetData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">{form.title}</h1>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {form.inputs.map((input, index) => (
            <div key={index} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {input.title}
              </label>
              <input
                type={input.type.toLowerCase()}
                placeholder={input.placeholder}
                value={formData[input.title]}
                onChange={(e) => handleInputChange(input.title, e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewForm;
