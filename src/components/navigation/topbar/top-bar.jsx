import { React, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPhotoVideo,
  faDesktop,
  faStream,
  faQuestionCircle,
  faUserCircle,
  faSignOutAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../context/user-context";
import localStorageKeys from "../../util/local-storage-keys";
import "./top-bar.scss";

/**
 * The top bar navigation component.
 *
 * @returns {object} The top bar navigation component
 */
function TopBar() {
  const { t } = useTranslation("common");
  const context = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Change tenant on select tenant
   *
   * @param {object} props - The props.
   * @param {object} props.target Event target
   */
  function onTenantChange({ target }) {
    context.selectedTenant.set(
      context.tenants.get.find((tenant) => tenant.tenantKey === target.id)
    );
    localStorage.setItem(
      localStorageKeys.SELECTED_TENANT,
      JSON.stringify(
        context.tenants.get.find((tenant) => tenant.tenantKey === target.id)
      )
    );
    navigate("/slide/list/");
  }

  return (
    <Navbar
    id="topbar"
      variant="light"
      bg="white"
      expand="lg"
      className="border-bottom shadow-sm"
    >
      <Navbar.Brand href="/" className="col-lg-2 d-lg-none ms-3">
        {t("topbar.brand")}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
      <Navbar.Collapse id="basic-navbar-nav" className="px-3">
        <Nav className="ms-md-auto mt-3 mt-md-0"><>
          {!context.tenants.get &&
                     <div className="name">   {context.userEmail.get} ({context.selectedTenant.get?.title})}</div>
                     }
        {context.tenants.get &&
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="topbar_user"
              className="text-dark text-decoration-none"
            >
              <FontAwesomeIcon
                className="me-1 fa-lg text-dark text-muted"
                icon={faUserCircle}
              />
              {context.userEmail.get} ({context.selectedTenant.get?.title})
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              {context.tenants.get.map((tenant) => (
                <Dropdown.Item
                  onClick={onTenantChange}
                  id={tenant.tenantKey}
                  className="dropdown-item"
                >
                  <FontAwesomeIcon
                    className="me-1"
                    style={{
                      color:
                        tenant.tenantKey ===
                        context.selectedTenant.get.tenantKey
                          ? "#6c757d"
                          : "transparent",
                    }}
                    icon={faCheck}
                  />
                  {tenant.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
}</>
          <Dropdown className="me-md-3 mb-2 mb-md-0">
            <Dropdown.Toggle variant="primary" id="topbar_add">
              <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
              {t("topbar.add")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link
                id="nav-items_add_slide"
                className="dropdown-item"
                to="/slide/create"
              >
                <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />
                {t("topbar.add-slide")}
              </Link>

              <Link
                id="nav-items_add_playlist"
                className="dropdown-item"
                to="/playlist/create"
              >
                <FontAwesomeIcon className="me-2" icon={faStream} />
                {t("topbar.add-playlist")}
              </Link>
              <Link
                id="nav-items_add_screen"
                className="dropdown-item"
                to="/screen/create"
              >
                <FontAwesomeIcon className="me-2" icon={faDesktop} />
                {t("topbar.add-screen")}
              </Link>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Item className="me-md-3 mb-2 mb-md-0">
            <Link id="topbar-faq" className="btn btn-dark" to="/faq">
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span className="visually-hidden">{t("topbar.faq")}</span>
            </Link>
          </Nav.Item>
          <Nav.Item className="me-md-3 mb-2 mb-md-0">
            <Link id="topbar_signout" className="btn btn-dark" to="/logout">
              <FontAwesomeIcon className="me-1" icon={faSignOutAlt} />
              {t("topbar.signout")}
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;
