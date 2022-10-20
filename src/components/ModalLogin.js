import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";


const ModalLogin = () => {
  const [show, setShow] = useState(false);
  const [log, setLog] = useState('login')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleView = (mode) => {
    setLog(mode);
  }

  let loginView = {}
  let registerView = {}

  if (log === 'login') {
    registerView.display = "none"
  } else {
    loginView.display = "none"
  }
  return (
    <>
      <div className="login-button" onClick={handleShow}>
        Login
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-lg-12">
              <Modal.Title>Hello, Login or Register</Modal.Title>
            </div>
            <div className="col-lg-12">
              <Button variant="light" className="button-view" onClick={() => handleView('login')}>Login</Button>
              <Button variant="light" className="button-view" onClick={() => handleView('register')}>Register</Button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div style={loginView}>
            <Login />
          </div>
          <div style={registerView}>
            <Register />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLogin;