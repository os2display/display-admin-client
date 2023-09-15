import { React, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Brand from "react-bootstrap/NavbarBrand";
import Col from "react-bootstrap/Col";
import NavItems from "../nav-items/nav-items";
import "./sidebar.scss";
import Logo from "../logo";
import TenantSelector from "../nav-items/tenant-selector";

/**
 * The sidebar component.
 *
 * @returns {object} The SideBar
 */
function SideBar() {
  const [active, setActive] = useState();

  return (
    <Col className="bg-dark border-end d-none d-lg-block">
      <Nav
        variant="dark"
        id="sidebar"
        className="sidebar-nav flex-column w-100 pb-3 sticky-md-top"
        activeKey={active}
        onSelect={(selectedKey) => setActive(selectedKey)}
      >
        <div className="bg-black pb-3">
          <Brand
            href="/admin"
            className="text-white mb-2 mt-2 d-none d-md-block"
          >
            <Logo />
          </Brand>
          <div className="ms-3">
            <TenantSelector />
          </div>
        </div>
        <NavItems />
      </Nav>
    </Col>
  );
}

export default SideBar;
