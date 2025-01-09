import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormList from "../components/FormList";

const Home = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/forms");
      setForms(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching forms. Please try again later.");
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await axios.delete(`http://localhost:5000/api/forms/${id}`);
        setForms(forms.filter((form) => form._id !== id));
      } catch (error) {
        console.error("Error deleting form:", error);
        alert("Error deleting form. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/form/create"
          className="px-4 py-1 bg-green-700 text-white mx-auto rounded-sm hover:bg-green-600 transition-colors"
        >
          Create New Form
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Forms</h1>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="text-red-500">{error}</div>
        </div>
      ) : (
        <FormList forms={forms} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
