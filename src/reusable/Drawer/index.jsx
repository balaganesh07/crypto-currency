import React from 'react'
import { Offcanvas } from 'react-bootstrap';

/**
 * Slide drawer component to show single coin data
*/

const  Drawer = ({ children, show, handleDrawer, drawerPlacement }) => {

  return (
    <>
      <Offcanvas show={show} onHide={handleDrawer} placement={drawerPlacement}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

Drawer.defaultProps ={
  drawerPlacement : "end" // options start, top, bottom
}

export default Drawer;