import { isValidEmail, isValidPhone } from './helpers';

/**
 * Validate employee form data
 * @param {Object} data - Employee data
 * @returns {Object} Validation result with errors
 */
export const validateEmployee = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!data.department) {
    errors.department = 'Department is required';
  }

  if (!data.position?.trim()) {
    errors.position = 'Position is required';
  }

  if (!data.joiningDate) {
    errors.joiningDate = 'Joining date is required';
  }

  if (!data.salary || data.salary <= 0) {
    errors.salary = 'Valid salary is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate department form data
 * @param {Object} data - Department data
 * @returns {Object} Validation result with errors
 */
export const validateDepartment = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = 'Department name is required';
  }

  if (!data.description?.trim()) {
    errors.description = 'Description is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate leave application
 * @param {Object} data - Leave data
 * @returns {Object} Validation result with errors
 */
export const validateLeave = (data) => {
  const errors = {};

  if (!data.leaveType) {
    errors.leaveType = 'Leave type is required';
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!data.endDate) {
    errors.endDate = 'End date is required';
  }

  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (end < start) {
      errors.endDate = 'End date must be after start date';
    }
  }

  if (!data.reason?.trim()) {
    errors.reason = 'Reason is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate login credentials
 * @param {Object} data - Login data
 * @returns {Object} Validation result with errors
 */
export const validateLogin = (data) => {
  const errors = {};

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.password?.trim()) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate profile update
 * @param {Object} data - Profile data
 * @returns {Object} Validation result with errors
 */
export const validateProfile = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate password change
 * @param {Object} data - Password data
 * @returns {Object} Validation result with errors
 */
export const validatePasswordChange = (data) => {
  const errors = {};

  if (!data.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!data.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (data.newPassword.length < 6) {
    errors.newPassword = 'Password must be at least 6 characters';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm password';
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
