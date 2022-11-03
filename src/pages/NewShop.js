import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000/";

const NewShop = () => {
    const [name, setName] = useState('')
    const [picture, setPicture] = useState({});

    const navigate = useNavigate()

    const uploadPicture = (e) => {
        setPicture({

            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0]
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let authen_token = JSON.parse(localStorage.getItem("authen_token")).auth_token
        axios.post(`${baseURL}/shops`, {
            shop: {
                name: name,
                image: picture.pictureAsFile
            },
        }, {
            headers: {
                Authorization: authen_token,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                console.log(response.data)
                navigate("/shops")
            })
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12" style={{ margin: "20px 0px 0px 0px" }}>
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <label htmlFor="name" style={{ fontWeight: "bold", textAlign: "left" }}>
                                        Shop Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="image">Image</label>
                                    <br />
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={uploadPicture}
                                        className="image-upload"
                                    />
                                    <br />
                                    <button
                                        className="btn btn-primary"
                                        onClick={(e) => handleSubmit(e)}
                                    >Submit</button>
                                </form>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewShop;