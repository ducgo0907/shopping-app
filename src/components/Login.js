import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const baseURL = "http://localhost:3000/authenticate";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post(baseURL, {
            email: email,
            password: password,
        })
            .then((response) => {
                console.log(response.data.auth_token)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="row">
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)} />
            <br/>
            <Button variant="primary" onClick={handleLogin}>
                Login
            </Button>
        </div>
    )
}

export default Login;