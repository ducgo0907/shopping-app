import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

const baseURL = "http://localhost:3000/authenticate/";

const ModalLogin = () => {
  const [show, setShow] = useState(false);
  const [log, setLog] = useState('login')
  const [logged, setLogged] = useState(getInitialLoggedStatus)
  const [user, setUser] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = (email, password) => {
    axios.post(baseURL, {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.data.auth_token)
        setLogged(response.data.logged_in)
        localStorage.setItem("logged_status", response.data.logged_in)
        setShow(false)
        setUser({
          name: response.data.user_name,
          id: response.data.user_id
        })
      })
      .catch(error => console.log(error))
  }

  const handleLogout = () => {
    axios.delete(`${baseURL}/${user.id}`)
      .then(response => {
        console.log(response)
        setLogged(false);
        localStorage.setItem("logged_status", false)
      })
  }

  function getInitialLoggedStatus() {
    const saveLoggedStatus = JSON.parse(localStorage.getItem("logged_status"))
    return saveLoggedStatus || false
  }

  let loginView = {}
  let registerView = {}
  let loginButton = {}
  let logoutButton = {}

  if (log === 'login') {
    registerView.display = "none"
  } else {
    loginView.display = "none"
  }
  if (logged === true) {
    // loginButton.display = "none"
  } else {
    logoutButton.display = "none"
  }
  return (
    <>
      <div style={logoutButton} onClick={handleLogout}>
        <div className="login-button">
          Logout
        </div>
      </div>
      <div style={loginButton}>
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
                <Button variant="light" className="button-view" onClick={() => setLog('login')}>Login</Button>
                <Button variant="light" className="button-view" onClick={() => setLog('register')}>Register</Button>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div style={loginView}>
              <Login handleLogin={handleLogin} />
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
      </div>
    </>
  );
}

export default ModalLogin;