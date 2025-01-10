/* eslint-disable */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Validation rules
  const validateField = (type, value, title) => {
    switch (type.toLowerCase()) {
      case "number":
        if (title.toLowerCase().includes("phone")) {
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(value)) {
            return "Phone number must be exactly 10 digits";
          }
        } else if (isNaN(value) || value === "") {
          return "Please enter a valid number";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        break;

      case "password":
        if (value.length < 8) {
          return "Password must be at least 8 characters";
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Password must contain uppercase, lowercase and numbers";
        }
        break;

      case "date":
        if (!value || isNaN(new Date(value).getTime())) {
          return "Please enter a valid date";
        }
        break;

      case "text":
        if (value.trim().length < 2) {
          return "This field must have at least 2 characters";
        }
        break;
    }
    return "";
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/forms/${id}`
        );
        setForm(response.data);

        // Initialize form data and errors
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

  const handleInputChange = (input, value) => {
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [input.title]: value,
    }));

    // Validate and update errors
    const error = validateField(input.type, value, input.title);
    setErrors((prev) => ({
      ...prev,
      [input.title]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    let hasErrors = false;
    const newErrors = {};

    form.inputs.forEach((input) => {
      const error = validateField(
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
      alert("Please fix all errors before submitting");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/forms/${id}/submit`,
        formData
      );
      alert("Form submitted successfully!");
      // Reset form
      const resetData = {};
      form.inputs.forEach((input) => {
        resetData[input.title] = "";
      });
      setFormData(resetData);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">{form.title}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          {form.inputs.map((input, index) => (
            <div key={index} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {input.title}
              </label>
              <input
                type={input.type.toLowerCase()}
                placeholder={input.placeholder}
                value={formData[input.title] || ""}
                onChange={(e) => handleInputChange(input, e.target.value)}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500
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
