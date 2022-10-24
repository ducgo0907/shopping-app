import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const baseURL = "http://localhost:3000/users";
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleRegister = () => {
        axios.post(baseURL, {
            user: {
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            }
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
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                className="form-control"
                onChange={(e) => setPasswordConfirmation(e.target.value)} />
            <br/>
            <Button variant="primary" onClick={handleRegister}>
                Register
            </Button>
        </div>
    )
}

export default Register;