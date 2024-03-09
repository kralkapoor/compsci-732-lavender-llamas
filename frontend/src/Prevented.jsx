import { Navigate } from "react-router";


export default function Prevented({ isAuthenticated, children }) {
  if (isAuthenticated == true) {
    return <Navigate to="../ootd" replace />;
  } else if (isAuthenticated == false) {
    return children;
  }
}
