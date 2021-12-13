import { React } from "react";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "../navigation/sidebar/sidebar";
import TopBar from "../navigation/topbar/topbar";
import "react-toastify/dist/ReactToastify.css";

/**
 * Sidebar and topbar hoc
 *
 * @param {object} WrappedComponent The component to wrap
 * @returns {object} Returns a hoc that wraps component
 */
const SideAndTopbarHOC = (WrappedComponent) => {
  /**
   * The hoc
   *
   * @returns {object} The hoc
   */
  function HOC() {
    return (
      <Container fluid className="h-100 px-0 bg-light">
        <Row className="row-full-height g-0">
          <SideBar />
          <Col lg={9} xl={10} className="main-col">
            <TopBar />
            <ToastContainer
              autoClose="10000"
              position="bottom-right"
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              progress={undefined}
            />
            <main className="col p-3 no-padding-on-preview">
              <WrappedComponent />
            </main>
          </Col>
        </Row>
      </Container>
    );
  }
  return HOC;
};

export default SideAndTopbarHOC;
