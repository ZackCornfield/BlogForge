import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/session`, {
                method: 'DELETE',
                credentials: 'include',
            })

            if (response.ok) {
                localStorage.removeItem('token'); // Clear the token from local storage
                navigate(-1);
            } else {
                console.error('Failed to logout');
            }
        }
        logout();
    }, [navigate])
}

export default LogoutPage;
