import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:3000/authenticate/";

const ModalLogin = () => {
  const [show, setShow] = useState(false);
  const [log, setLog] = useState('login')
  const [logged, setLogged] = useState(getInitialData("logged_status"))
  const [user, setUser] = useState(getInitialData("current_user"))

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = (event, email, password) => {
    event.preventDefault();
    axios.post(baseURL, {
      email: email,
      password: password,
    })
      .then((response) => {
        setLogged(response.data.is_logged);
        localStorage.setItem("authen_token", response.data.auth_token);
        localStorage.setItem("logged_status", response.data.is_logged);
        setShow(false);
        setUser({
          name: response.data.user_name,
          id: response.data.user_id
        });
        localStorage.setItem("current_user", JSON.stringify({
          name: response.data.user_name,
          id: response.data.user_id
        }))
      })
      .catch(error => console.log(error))
  }

  const handleLogout = () => {
    setUser({});
    setLogged(false);
    localStorage.setItem("logged_status", false)
    localStorage.removeItem("authen_token")
    localStorage.removeItem("current_user")
  }

  function getInitialData(name) {
    const temp = localStorage.getItem(name)
    var saveLoggedStatus;
    if (temp !== undefined) {
      saveLoggedStatus = JSON.parse(temp)
    }
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
    loginButton.display = "none"
  } else {
    logoutButton.display = "none"
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-1" style={logoutButton}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {user.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`user/${user.id}`}>User Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>Edit profile</Dropdown.Item>
              <Dropdown.Item>
                <div style={logoutButton} onClick={handleLogout}>
                  <div className="login-button">
                    Logout
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={loginButton}>
          <div className="login-button" onClick={handleShow}>
            Login
          </div>
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
            <div
              style={loginView}
            >
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