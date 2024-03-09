import axios from 'axios';

export default async function handleLogout(setUserAuthenticated) {
    try {
        await axios.post("http://localhost:3006/auth/logout", null, {
          withCredentials: true,
        });
        setUserAuthenticated(false);
        
      } catch (err) {
        console.error("Error logging out:", err);
      }
      
      
}