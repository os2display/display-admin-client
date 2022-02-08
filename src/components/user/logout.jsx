import { Spinner } from "react-bootstrap";
import { React, useEffect } from "react";
import { Redirect } from "react-router-dom";

/**
 * Logout component
 *
 * @returns {object} - The component
 */
function Logout() {
  useEffect(() => {
    localStorage.removeItem("api-token");

    const event = new Event("reauthenticate");
    document.dispatchEvent(event);
  }, []);

  return (
    <>
      <Spinner animation="border" />
      <Redirect to="/" />
    </>
  );
}

export default Logout;
