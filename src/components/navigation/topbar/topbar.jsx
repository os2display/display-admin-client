import { React } from "react";
import Nav from "react-bootstrap/nav";
import Col from "react-bootstrap/col";
import Row from "react-bootstrap/row";
import Dropdown from "react-bootstrap/dropdown";
import Navbar from "react-bootstrap/navbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPhotoVideo,
  faDesktop,
  faStream,
  faQuestionCircle,
  faUserCircle,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../../util/search-box/search-box";
/**
 * The side bar component.
 *
 * @returns {object}
 *   The NavBar
 */
function TopBar() {
  const [t] = useTranslation("common");
  return (
    <Navbar bg="dark" expand="lg" className="border-bottom">
      <Col sm={2}>
        <Navbar.Brand href="/" className="text-white">{t("topbar.brand")}</Navbar.Brand>
      </Col>
      <Col>
        <Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Col sm="auto" className="">
              {/* TODO: Global searchbox: results show as list in popover when typing more than 3 characters */}
              <SearchBox />
            </Col>
            <Col sm="auto" className="ms-auto">
              <Nav>
                <Dropdown className="me-md-3">
                  <Dropdown.Toggle variant="primary" id="topbar_add">
                    <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
                    {t("topbar.add")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link id="nav-items_slides" className="nav-link" to="/slides">
                        <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />{t("topbar.add_slide")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link id="nav-items_screens_screens" className="nav-link" to="/screens">
                        <FontAwesomeIcon className="me-2" icon={faDesktop} />{t("topbar.add_screen")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link id="nav-items_playlists_playlists" className="nav-link" to="/playlists">
                        <FontAwesomeIcon className="me-2" icon={faStream} />{t("topbar.add_playlist")}
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Item className="me-md-3">
                  <Link id="topbar-faq" className="btn btn-primary" to="/faq">
                    <FontAwesomeIcon className="me-2 " icon={faQuestionCircle} /><span className="visually-hidden">{t("topbar.faq")}</span>
                  </Link>
                </Nav.Item>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-light" id="topbar_user">
                    <FontAwesomeIcon className="me-1 fa-lg" icon={faUserCircle} />
                    {t("topbar.user")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link id="topbar_signout" to="/signout">
                        <FontAwesomeIcon className="me-1" icon={faSignOutAlt} />
                        {t("topbar.signout")}
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Col>
          </Navbar.Collapse>
        </Row>
      </Col>
    </Navbar>
  );
}

export default TopBar;
