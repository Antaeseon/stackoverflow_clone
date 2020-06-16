import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import cookie from "js-cookie";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  buildLoggedInMenu() {
    return (
      <div className="navbar-brand order-1 text-white my-auto">
        <div className="btn-group">
          <Button
            type="button"
            size="sm"
            className="btn btn-success dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Welcome {this.props.user.name}
          </Button>
          <div className="dropdown-menu">
            <a
              className="btn dropdown-item"
              role="button"
              onClick={this.handleSignOut}
            >
              Sign Out
            </a>
          </div>
        </div>
      </div>
    );
  }

  handleSignOut(e) {
    e.preventDefault();
    const user = cookie.getJSON("user");
    if (user === undefined) {
      console.log("Can not sign out as no user cookie found...");
      return;
    }
    console.log("Sign out: " + user);
    fetch("/user/" + user.ID + "/signout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    this.props.handleSignedOut();
    console.log("Handle sign out");
  }

  render() {
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

          {this.props.user.loggedin ? (
            /*<p className="navbar-brand order-1 text-white my-auto">Welcome {this.props.user.name}</p>*/
            this.buildLoggedInMenu()
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="mr-sm-1"
              onClick={() => {
                this.props.showModalWindow();
              }}
            >
              Sign in
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
