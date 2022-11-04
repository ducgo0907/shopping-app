import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000/products";
const baseURLImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1/rails_upload/"
const defaultImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1667469352/rails_upload/74827_x9ytee.png"



const NewProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);
    const [picture, setPicture] = useState({});
    const shop = getInitShop()
    const navigate = useNavigate();

    const uploadPicture = (e) => {
        setPicture({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0]
        });
    }

    function getInitShop(){
        const shop_raw = localStorage.getItem("current_shop");
        let current_shop = null
        if(shop_raw !== "undefined" && shop_raw != null){
            current_shop = JSON.parse(shop_raw);
        }
        return false || current_shop
    }

    const handleSubmit = () => {
        let price_float = parseFloat(price);
        let authen_token = JSON.parse(localStorage.getItem("authen_token")).auth_token

        if (!isNaN(price_float)) {
            axios.post(baseURL, {
                shop_id: shop.id,
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
                    <img src={`${picture.picturePreview}`} id="preview-image" alt="" style={pictureView} />
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
                    <label>For Shop: </label>
                    <br />
                    <div className="row">
                        <div className="col-lg-10">
                            <input readOnly className="form-control" value={
                                shop != null ? shop.name : ""
                            } />
                        </div>
                        <div className="col-lg-2">
                            <img src={shop.image_data != null ? `${baseURLImage}/${JSON.parse(shop.image_data).id}` : `${defaultImage}`} className="icon" alt=""/>
                        </div>
                    </div>
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