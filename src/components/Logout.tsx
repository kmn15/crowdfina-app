import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Add your logout API call here
        // Example: await api.logout();
        
        // Clear any stored tokens/user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        // Still redirect to login even if logout API fails
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate]);

  // Show nothing while logging out
  return null;
} 