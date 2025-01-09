/* eslint-disable */
import { Link } from "react-router-dom";

const FormList = ({ forms, onDelete }) => {
  return (
    <div className="space-y-4">
      {forms.length === 0 ? (
        <div className="text-left py-8 text-gray-500">
          No forms created yet.
        </div>
      ) : (
        forms.map((form) => (
          <div
            key={form._id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {form.title}
              </h3>
              <div className="flex items-center space-x-4">
                <Link
                  to={`/form/${form._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  VIEW
                </Link>
                <Link
                  to={`/form/${form._id}/edit`}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  EDIT
                </Link>
                <button
                  onClick={() => onDelete(form._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  DELETE
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {form.inputs.length}{" "}
              {form.inputs.length === 1 ? "input" : "inputs"} • Created{" "}
              {new Date(form.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FormList;
