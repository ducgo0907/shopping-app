import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseURL = "http://localhost:3000/users";

const ShowProfile = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`${baseURL}/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("authen_token")
            }
        })
            .then((response) => {
                setUser(response.data.user)
            })
    })

    return (
        <>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-lg-2" id="user-bar">bar</div>
                    <div className="col-lg-9" id="user-details">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="col-lg-12">User informations</div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-6">Name: </div>
                                    <div className="col-lg-6">{user.name}</div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="col-lg-12">
                                    Email and phone number:
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-5">Email: </div>
                                    <div className="col-lg-7">{user.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowProfile;