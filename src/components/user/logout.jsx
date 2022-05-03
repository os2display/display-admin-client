import { React, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

/**
 * Logout component
 *
 * @returns {object} - The component
 */
function Logout() {
  useEffect(() => {
    const event = new Event("reauthenticate");
    document.dispatchEvent(event);
  }, []);

  return (
    <>
      <Spinner animation="border" />
      <Navigate to="/login" />
    </>
  );
}

export default Logout;
