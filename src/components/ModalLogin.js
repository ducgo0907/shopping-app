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
  const [errors, setErrors] = useState('');

  const handleClose = () => {
    setShow(false);
    setErrors('')
  }
  const handleShow = () => setShow(true);

  const handleLogin = (event, email, password) => {
    event.preventDefault();
    axios.post(baseURL, {
      email: email,
      password: password,
    })
      .then((response) => {
        const now = new Date().getTime()
        setLogged(response.data.is_logged);
        let authen_token = {
          auth_token: response.data.auth_token,
          expire: now,
        };
        localStorage.setItem("authen_token", JSON.stringify(authen_token));
        localStorage.setItem("logged_status", response.data.is_logged);
        if (response.data.is_logged) {
          setShow(false);
          setErrors('');
          setUser({
            name: response.data.user_name,
            id: response.data.user_id
          });
          localStorage.setItem("current_user", JSON.stringify({
            name: response.data.user_name,
            id: response.data.user_id,
            expire: now,
          }))
        } else {
          setErrors('Password or email is wrong or valid. Please try again!!')
        }
      })
      .catch(error => console.log(error))
  }

  const handleLogout = () => {
    setUser({});
    setLogged(false);
    localStorage.clear()
  }

  function getInitialData(name) {
    const temp = localStorage.getItem(name)
    const now = new Date()
    var saveLoggedStatus;
    if (temp !== 'undefined' && temp !== null) {
      saveLoggedStatus = JSON.parse(temp)
      if (name === 'current_user' && now.getTime() - saveLoggedStatus.expire > 1000 * 60 * 60 * 12) {
        localStorage.clear()
      }
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
      <div className="col-lg-1" style={logoutButton}>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {user.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <li className="dropdown-item">
              <Link className="a-dropdown-item" to={`user/${user.id}`}>User Profile</Link>
            </li>
            <Dropdown.Item>
              <div style={logoutButton} onClick={handleLogout}>
                Logout
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
            <Login handleLogin={handleLogin}
              errors={errors} />
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