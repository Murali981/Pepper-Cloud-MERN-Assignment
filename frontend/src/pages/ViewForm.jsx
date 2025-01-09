/* eslint-disable */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Validation rules for different input types
  const validateInput = (type, value, title) => {
    switch (type.toLowerCase()) {
      case "number":
        if (title.toLowerCase().includes("phone")) {
          // Phone number validation
          const phoneRegex = /^\d{10}$/;
          return phoneRegex.test(value)
            ? ""
            : "Phone number must be exactly 10 digits";
        }
        // Other number validations
        return isNaN(value) ? "Must be a valid number" : "";

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Invalid email address";

      case "password":
        // Password must be at least 8 characters, contain uppercase, lowercase, number
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(value)
          ? ""
          : "Password must be at least 8 characters with uppercase, lowercase and numbers";

      case "date":
        const dateValue = new Date(value);
        return dateValue instanceof Date && !isNaN(dateValue)
          ? ""
          : "Please enter a valid date";

      case "text":
        return value.trim().length < 2 ? "Must be at least 2 characters" : "";

      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/forms/${id}`
        );
        setForm(response.data);

        const initialData = {};
        const initialErrors = {};
        response.data.inputs.forEach((input) => {
          initialData[input.title] = "";
          initialErrors[input.title] = "";
        });
        setFormData(initialData);
        setErrors(initialErrors);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [id]);

  const handleInputChange = (title, value, type) => {
    setFormData((prev) => ({
      ...prev,
      [title]: value,
    }));

    // Validate on change
    const error = validateInput(type, value, title);
    setErrors((prev) => ({
      ...prev,
      [title]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    let hasErrors = false;

    form.inputs.forEach((input) => {
      const error = validateInput(
        input.type,
        formData[input.title],
        input.title
      );
      if (error) {
        newErrors[input.title] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/forms/${id}/submit`,
        formData
      );
      alert("Form submitted successfully!");
      // Reset form
      const resetData = {};
      const resetErrors = {};
      form.inputs.forEach((input) => {
        resetData[input.title] = "";
        resetErrors[input.title] = "";
      });
      setFormData(resetData);
      setErrors(resetErrors);
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
                onChange={(e) =>
                  handleInputChange(input.title, e.target.value, input.type)
                }
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  ${
                    errors[input.title] ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {errors[input.title] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[input.title]}
                </p>
              )}
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
