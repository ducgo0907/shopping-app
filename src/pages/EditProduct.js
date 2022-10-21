import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000/products";

const EditProduct = () => {
    const [name, setName] = useState(getInitProduct("name"));
    const [description, setDescription] = useState(getInitProduct("description"));
    const [price, setPrice] = useState(getInitProduct("price"));
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function getInitProduct(property){
        const editProduct = JSON.parse(localStorage.getItem("product_edit"))
        return editProduct[0][property] || ''
    }

    const handleSubmit = () => {
        let price_float = parseFloat(price);

        if (!isNaN(price_float)) {
            axios.patch(`${baseURL}/${JSON.parse(localStorage.getItem("product_edit"))[0].id}`, {
                product: {
                    name: name,
                    description: description,
                    price: price_float
                },
            })
                .then(() => {
                    setErrors("Update product sucessfully")
                    navigate("/")
                })
                .catch((error) => console.log(error))
        } else {
            setErrors("Price must be a number")
        }

    }

    return (
        <div className="container">
            <div className="col-lg-12">{errors}</div>
            <div className="col-lg-12">
                <h1 id="create-title">Create new product</h1>
            </div>
            <div className="row">
                <div className="col-lg-4"></div>
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
                    <label htmlFor="description">Price</label>
                    <br />
                    <input
                        type="text"
                        name="Price"
                        className="form-control"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <br />
                    <input type="submit" value="Create" className="btn btn-primary" onClick={handleSubmit} />
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default EditProduct;