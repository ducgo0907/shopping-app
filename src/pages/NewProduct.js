import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000/products";

const NewProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);
    const [picture, setPicture] = useState({});
    const navigate = useNavigate();

    const uploadPicture = (e) => {
        setPicture({

            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0]
        });
    }

    const handleSubmit = () => {
        let price_float = parseFloat(price);
        let authen_token = JSON.parse(localStorage.getItem("authen_token")).auth_token

        if (!isNaN(price_float)) {
            axios.post(baseURL, {
                product: {
                    name: name,
                    description: description,
                    price: price_float,
                    image: picture.pictureAsFile,
                },
            }, {
                headers: {
                    Authorization: authen_token,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(() => {
                    setErrors("Create product sucessfully")
                    navigate("/")
                })
                .catch((error) => console.log(error))
        } else {
            setErrors("Price must be a number")
        }

    }

    let pictureView = {}

    if (!picture.picturePreview) {
        console.log("2")
        pictureView.display = "none"
    }
    return (
        <div className="container">
            <div className="col-lg-12">{errors}</div>
            <div className="col-lg-12">
                <h1 id="create-title">Create new product</h1>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <img src={`${picture.picturePreview}`} id="preview-image" alt="" style={pictureView}/>
                </div>
                <div className="col-lg-4">
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="description">Description</label>
                    <br />
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <br />
                    <label htmlFor="Price">Price</label>
                    <br />
                    <input
                        type="text"
                        name="Price"
                        className="form-control"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <br />
                    <label htmlFor="image">Image</label>
                    <br />
                    <input
                        type="file"
                        name="image"
                        onChange={uploadPicture}
                        className="image-upload"
                    />
                    <br />
                    <input type="submit" value="Create" className="btn btn-primary" onClick={handleSubmit} />
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div >
    )
}

export default NewProduct;