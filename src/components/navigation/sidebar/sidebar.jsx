import { React, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
    <Col className="bg-black border-end d-none d-lg-block">
      <Nav
        variant="dark"
        id="sidebar"
        className="sidebar-nav flex-column w-100 pb-3 sticky-md-top"
        activeKey={active}
        onSelect={(selectedKey) => setActive(selectedKey)}
      >
        <Navbar.Brand
          href="/admin"
          className="text-white mb-2 mt-2 ms-3 d-none d-md-block"
        >
          <Logo />
        </Navbar.Brand>
        <TenantSelector />
        <div className="bg-dark">
          <NavItems />
        </div>
      </Nav>
    </Col>
  );
}

export default SideBar;
