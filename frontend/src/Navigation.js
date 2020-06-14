import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Modal, modal } from "react-bootstrap";

export default class Navigation extends React.Component {
  render() {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Stack Overflow</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Stack Overflows
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Teams</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Enterprise</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Jobs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5">Talent</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">
                Advertising
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Customers</Nav.Link>
            <Nav.Link href="#About">Use cases</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success" size="sm" className="mr-sm-2">
              Search
            </Button>
          </Form>
          <Button
            variant="outline-primary"
            size="sm"
            className="mr-sm-1"
            onClick={handleShow}
          >
            Log in
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Button variant="primary" size="sm" className="mr-sm-1">
            Sign up
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
