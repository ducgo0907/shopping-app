import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleLogin = () => {
    //     axios.post(baseURL, {
    //         sessions: {
    //             email: email,
    //             password: password,
    //         },
    //     })
    //         .then((response) => {
    //             console.log(response.data)
    //             setLogged(response.data.logged_in)
    //         })
    //         .catch(error => console.log(error))
    // }

    return (
        <div className="row">
            <label htmlFor="emailLogin">Email</label>
            <input
                type="text"
                id="emailLogin"
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="passwordLogin">Password</label>
            <input
                type="password"
                id="passwordLogin"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)} />
            <br />
            <Button variant="primary" onClick={() => props.handleLogin(email, password)}>
                Login
            </Button>
        </div>
    )
}

export default Login;