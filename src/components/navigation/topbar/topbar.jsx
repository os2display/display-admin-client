import { React } from "react";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTags,
  faImages,
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
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/">{t("topbar.brand")}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <SearchBox />
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="topbar_add">
              <FontAwesomeIcon className="mr-1" icon={faPlusCircle} />
              {t("topbar.add")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link id="topbar_add_content_tag" to="/tag/new">
                  <FontAwesomeIcon className="mr-1" icon={faTags} />
                  {t("topbar.add-content-tag")}
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link id="topbar_add_content_media" to="/media/new">
                  <FontAwesomeIcon className="mr-1" icon={faImages} />
                  {t("topbar.add-content-media")}
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;
