import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { validateDepartment } from '../../../utils/validators';

/**
 * DepartmentForm Component
 * Form for adding/editing departments (as modal)
 */
export const DepartmentForm = ({ isOpen, onClose, onSubmit, department = null }) => {
  const isEditMode = !!department;
  const [formData, setFormData] = useState(department || {
    name: '',
    description: '',
    headOfDepartment: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateDepartment(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Department' : 'Add New Department'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Department Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`input ${errors.description ? 'border-red-500' : ''}`}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditMode ? 'Update' : 'Add'} Department
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DepartmentForm;
