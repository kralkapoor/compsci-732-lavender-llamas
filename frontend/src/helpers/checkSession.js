import axios from 'axios';

export default async function checkSession(setUserAuthenticated) {
    try {
        const response = await axios.post('http://localhost:3006/auth/checkSession', null, {
          withCredentials: true,
        });
        
        if (response.data.isAuthenticated) {
          setUserAuthenticated(true);
        } else {
          setUserAuthenticated(false);
          if ((window.location.pathname !== "/login") && (!["/", "/login", "/register", "/disclaimer"].includes(window.location.pathname))) {
            window.location.replace("/login");
          }
        }
        
      } catch (err) {
        console.error('Error checking session:', err);
      }
}