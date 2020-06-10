import React from 'react';
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {NavDropdown} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
export default class Navigation extends React.Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Stack Overflow</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Products" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Stack Overflows</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Teams</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Enterprise</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Jobs</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.5">Talent</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.6">Advertising</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home">Customers</Nav.Link>
                        <Nav.Link href="#About">Use cases</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}