import React, { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <div className="row">
            <div className="erorrs">{props.errors}</div>
            <form onSubmit={(event) => props.handleLogin(event, email, password)}>
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
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                    onClick={(event) => props.handleLogin(event, email, password)}
                />
            </form>
        </div>
    )
}

export default Login;