import Button from '../../../components/ui/Button';

/**
 * EmployeeActions Component
 * Action buttons for employee management
 */
export const EmployeeActions = ({ onAdd, onExport, totalCount }) => {
  const handleExport = () => {
    // Simple CSV export functionality
    alert('Export feature would download employee data as CSV');
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{totalCount}</span> employee{totalCount !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="medium"
          onClick={handleExport}
        >
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={onAdd}
        >
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </Button>
      </div>
    </div>
  );
};

export default EmployeeActions;
