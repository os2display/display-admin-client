import { React, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhotoVideo,
  faPlusCircle,
  faProjectDiagram,
  faDesktop,
  faStream,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import NavItems from "../nav-items/nav-items";
import UserContext from "../../../context/user-context";

import "./top-bar.scss";

/**
 * The top bar navigation component.
 *
 * @returns {object} The top bar navigation component
 */
function TopBar() {
  const { t } = useTranslation("common");
  const context = useContext(UserContext);

  return (
    <Navbar
      id="topbar"
      variant="light"
      bg="white"
      expand="lg"
      className="border-bottom shadow-sm"
    >
      <Navbar.Brand
        href="/admin"
        id="top-bar-brand"
        className="col-lg-2 d-lg-none ms-3"
      >
        {t("topbar.brand")}
      </Navbar.Brand>
      <div className="name ms-3">{context.userName.get}</div>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        id="basic-navbar-nav-burger"
        className="me-3"
      />
      <Navbar.Collapse id="basic-navbar-nav" className="px-3">
        <Nav variant="dark" className="topbar-nav d-none d-md-block d-lg-none">
          <NavItems />
        </Nav>
        <Nav className="ms-md-auto mt-3 mt-md-0">
          <Nav.Item className="add-new-dropdown">
            <Dropdown
              style={{ width: "100%" }}
              className="me-md-3 mb-2 mb-md-0"
            >
              <Dropdown.Toggle
                style={{ width: "100%" }}
                variant="primary"
                id="topbar_add"
              >
                <FontAwesomeIcon className="me-2" icon={faPlusCircle} />
                <span className="pe-2">{t("topbar.add")}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link
                  id="nav-add-new-slide"
                  className="dropdown-item"
                  to="/slide/create"
                >
                  <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />
                  {t("topbar.add-slide")}
                </Link>

                <Link
                  id="nav-add-new-playlist"
                  className="dropdown-item"
                  to="/playlist/create"
                >
                  <FontAwesomeIcon className="me-2" icon={faStream} />
                  {t("topbar.add-playlist")}
                </Link>
                <Link
                  id="nav-add-new-screen"
                  className="dropdown-item"
                  to="/screen/create"
                >
                  <FontAwesomeIcon className="me-2" icon={faDesktop} />
                  {t("topbar.add-screen")}
                </Link>

                <Link
                  id="nav-activate-new-code"
                  className="dropdown-item"
                  to="/activation/activate"
                >
                  <FontAwesomeIcon className="me-2" icon={faProjectDiagram} />
                  {t("topbar.activate-new-code")}
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
          <Nav.Item>
            <Link
              id="topbar_signout"
              className="btn btn-dark me-1 mb-1"
              to="/logout"
            >
              <FontAwesomeIcon className="me-2" icon={faSignOutAlt} />
              {t("topbar.signout")}
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;
