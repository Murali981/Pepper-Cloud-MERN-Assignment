import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Custom validation rules
  const getValidationRules = (input) => {
    const rules = {
      required: `${input.title} is required`,
    };

    switch (input.type.toLowerCase()) {
      case "number":
        if (
          input.title.toLowerCase().includes("phone") ||
          input.title.toLowerCase().includes("mobile")
        ) {
          rules.pattern = {
            value: /^\d{10}$/,
            message: "Phone number must be exactly 10 digits",
          };
        } else {
          rules.pattern = {
            value: /^\d+$/,
            message: "Please enter a valid number",
          };
        }
        break;

      case "email":
        rules.pattern = {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        };
        break;

      case "password":
        rules.minLength = {
          value: 8,
          message: "Password must be at least 8 characters",
        };
        rules.pattern = {
          value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          message: "Password must contain uppercase, lowercase and numbers",
        };
        break;

      case "text":
        rules.minLength = {
          value: 2,
          message: "This field must have at least 2 characters",
        };
        break;

      case "date":
        rules.validate = {
          isValidDate: (value) =>
            !isNaN(new Date(value).getTime()) || "Please enter a valid date",
        };
        break;
    }

    return rules;
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/forms/${id}`
        );
        setForm(response.data);
        // Initialize form with empty values
        const initialData = {};
        response.data.inputs.forEach((input) => {
          initialData[input.title] = "";
        });
        reset(initialData);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    fetchForm();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/forms/${id}/submit`,
        data
      );
      alert("Form submitted successfully!");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">{form.title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">
          {form.inputs.map((input, index) => (
            <div key={index} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {input.title}
              </label>
              <input
                type={input.type.toLowerCase()}
                placeholder={input.placeholder}
                {...register(input.title, getValidationRules(input))}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 
                  ${
                    errors[input.title] ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors[input.title] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[input.title].message}
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
