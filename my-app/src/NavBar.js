

import React from 'react'

import { Navbar, Container, Nav } from 'react-bootstrap'

export default function NavBar() {

    return (

        <>



            <Navbar style={{ margin: "5vh" }}>

                <Container className="navigationBar">



                    <Nav className="me-auto" >

                        <Nav.Link

                            style={{ color: "white" , margin: "5vh"}} 

                            href="/About">About</Nav.Link>



                        <Nav.Link

                            style={{ color: "white" , margin: "5vh"}} 

                            href="/Plans">Plans</Nav.Link>



                        <Nav.Link

                            style={{ color: "white" , margin: "5vh"}} 

                            href="/Legal">Legal</Nav.Link>

                    </Nav>

                </Container>

            </Navbar>





        </>

    )

}

