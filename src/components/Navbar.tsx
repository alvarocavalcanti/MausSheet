import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/" style={{ marginLeft: "10pt" }}>
        MausSheets
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/" style={{ marginLeft: "10pt" }}>
            <Nav.Link>Mice List</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/new" style={{ marginLeft: "10pt" }}>
            <Nav.Link>New Mouse</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/help" style={{ marginLeft: "10pt" }}>
            <Nav.Link>Help</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
