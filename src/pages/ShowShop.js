import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { FaPlusCircle } from 'react-icons/fa'

const baseURL = "http://localhost:3000/shops";
const baseURLImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1/rails_upload/"
const defaultImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1667469352/rails_upload/74827_x9ytee.png"


const ShowShop = () => {
    const [shop, setShop] = useState({})
    const [products, setProducts] = useState([])
    const { shopId } = useParams()

    useEffect(() => {
        axios.get(`${baseURL}/${shopId}`)
            .then(response => {
                setShop(response.data.shop)
                setProducts(response.data.products)
            })
    }, [shopId, setShop, setProducts])

    const handleCreateProduct = () => {
        localStorage.setItem("current_shop", JSON.stringify(shop))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="header-shop">
                        <div className="row">
                            <div className="col-lg-1">
                                {shop.image_data
                                    ? <img src={`${baseURLImage}/${JSON.parse(shop.image_data).id}`} alt="" className="icon" />
                                    : <img src={`${defaultImage}`} alt="" className="icon" />}
                            </div>
                            <div className="col-lg-4">
                                <h3>{shop.name}</h3>
                            </div>
                            <div className="col-lg-7">
                                <button
                                    style={{ float: "right", marginTop: "20px" }}
                                    className="btn btn-primary"
                                    onClick={handleCreateProduct}
                                >
                                    <Link to="/new" style={{ color: "white"}}>
                                        Add Product <FaPlusCircle />
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2">
                                Popular
                            </div>
                            <div className="col-lg-2">
                                Hot Seller
                            </div>
                            <div className="col-lg-2">
                                New Product
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="list-products">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-12">
                                <ProductsList
                                    products={products}
                                />
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowShop;