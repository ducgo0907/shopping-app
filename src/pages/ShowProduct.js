import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const baseURL = "http://localhost:3000/products"

const ShowProduct = () => {
    const [product, setProduct] = useState({
        amount: 0
    })
    const [amount, setAmout] = useState(1)
    const [cookies, setCookies] = useCookies(['listProduct'])
    const { productId } = useParams();

    useEffect(() => {
        axios.get(`${baseURL}/${productId}`)
            .then((response) => {
                setProduct(response.data)
            })
    }, [productId])

    const handleAmount = () => {
        if (amount > 1) {
            setAmout(amount - 1)
        }
    }

    const addToCart = () => {
        var listProduct = [];
        if (cookies.listProduct != null) {
            cookies.listProduct.forEach(prevProduct => {
                listProduct.push(prevProduct)
            })
        } else {
            setCookies('listProduct', listProduct, { path: '/' })
        }
        listProduct.push(product)
        setCookies('listProduct', listProduct, { path: '/' })
        console.log(cookies.listProduct)
    }

    return (
        <div className="container">
            <br />
            <div className="row" id="wrap-product">
                <div className="col-lg-3" id="image-details">
                    Image
                </div>
                <div className="col-lg-1" id="vertical-line"></div>
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="name-product-details">
                                {product.name}
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="description-product-details">
                                {product.description}
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="price-product-details">
                                {product.price}$
                            </div>
                        </div>
                        <div className="col-lg-7"><hr /></div>
                        <div className="col-lg-5"></div>
                        <div className="col-lg-12">
                            <div className="amount-wrap">
                                <button
                                    className="minus"
                                    onClick={handleAmount}
                                    disabled={amount === 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={amount}
                                    className="amount-product"
                                    onChange={(e) => setAmout(parseInt(e.target.value))}
                                />
                                <button
                                    className="plus"
                                    onClick={() => setAmout(amount + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <br />
                        <div className="col-lg-12">
                            <button
                                className="btn btn-danger button-add-cart col-lg-5"
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProduct;