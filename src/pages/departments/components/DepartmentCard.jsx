/**
 * DepartmentCard Component
 * Card display for a single department
 */
export const DepartmentCard = ({ department, employeeCount, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
            🏢
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
            <p className="text-sm text-gray-500">{department.id}</p>
          </div>
        </div>
        <span className={`badge ${department.status === 'Active' ? 'badge-success' : 'bg-gray-100 text-gray-800'}`}>
          {department.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {department.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500">Employees</p>
          <p className="text-lg font-semibold text-gray-900">{employeeCount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Created</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(department.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t">
        <button
          onClick={() => onEdit(department)}
          className="flex-1 btn btn-outline text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(department)}
          className="flex-1 btn bg-red-50 text-red-600 hover:bg-red-100 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
