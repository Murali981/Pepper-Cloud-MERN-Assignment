import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/forms");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      setForms(forms.filter((form) => form._id !== id));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Forms</h1>
        <Link
          to="/form/create"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create New Form
        </Link>
      </div>
      <div className="grid gap-4">
        {forms.map((form) => (
          <div
            key={form._id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <span className="font-medium">{form.title}</span>
            <div className="flex gap-2">
              <Link
                to={`/form/${form._id}`}
                className="px-3 py-1 text-blue-500 hover:text-blue-700"
              >
                View
              </Link>
              <Link
                to={`/form/${form._id}/edit`}
                className="px-3 py-1 text-green-500 hover:text-green-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(form._id)}
                className="px-3 py-1 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
