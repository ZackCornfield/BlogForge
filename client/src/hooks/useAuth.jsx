import { useEffect, useState } from 'react';
import { getAuthHeaders } from '../utils/getAuthHeaders';

function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkLoginStatus() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/session`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders(),
                    }
                })

                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Error with login status: ', err)
                setUser(null);
            }
        }
        checkLoginStatus();
    }, [])

    return { user, setUser};
}

export default useAuth;