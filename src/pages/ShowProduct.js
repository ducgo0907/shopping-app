import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:3000/products"

const ShowProduct = () => {
    const [product, setProduct] = useState("")
    const { productId } = useParams();

    useEffect(() => {
        axios.get(`${baseURL}/${productId}`)
            .then((response) => {
                setProduct(response.data)
            })
    }, [productId])

    return (
        <div className="container">
            <br/>
            <div className="row" id="wrap-product">
                <div className="col-lg-3" id="image-details">
                    Image
                </div>
                <div className="col-lg-1" id="vertical-line"></div>
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-12">
                            {product.name}
                        </div>
                        <div className="col-lg-12">
                            {product.description}
                        </div>
                        <div className="col-lg-12">
                            {product.price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProduct;