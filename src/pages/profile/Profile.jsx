import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { validateProfile, validatePasswordChange } from '../../utils/validators';
import { useToast } from '../../components/ui/Toast';

/**
 * Profile Page Component
 */
export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [profileErrors, setProfileErrors] = useState({});

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const validation = validateProfile(profileData);
    if (!validation.isValid) {
      setProfileErrors(validation.errors);
      return;
    }

    updateProfile({
      name: `${profileData.firstName} ${profileData.lastName}`,
      email: profileData.email,
      phone: profileData.phone
    });

    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const validation = validatePasswordChange(passwordData);
    if (!validation.isValid) {
      setPasswordErrors(validation.errors);
      return;
    }

    // Simulate password change
    toast.success('Password changed successfully');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full border-4 border-gray-200"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.role}</p>
              <p className="text-sm text-gray-500">{user?.employeeId}</p>
            </div>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Form */}
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              error={profileErrors.firstName}
              disabled={!isEditing}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              error={profileErrors.lastName}
              disabled={!isEditing}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
              error={profileErrors.email}
              disabled={!isEditing}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              error={profileErrors.phone}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setProfileData({
                    firstName: user?.name?.split(' ')[0] || '',
                    lastName: user?.name?.split(' ')[1] || '',
                    email: user?.email || '',
                    phone: user?.phone || ''
                  });
                  setProfileErrors({});
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
          Change Password
        </h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
            required
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
            required
          />
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmPassword}
            required
          />

          <div className="flex items-center justify-end pt-4">
            <Button type="submit" variant="primary">
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
