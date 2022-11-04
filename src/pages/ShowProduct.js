import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FaPlus } from "react-icons/fa";

const baseURLImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1/rails_upload/"
const defaultImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1667469352/rails_upload/74827_x9ytee.png"

const baseURL = "http://localhost:3000"

const ShowProduct = () => {
    const [product, setProduct] = useState({
        amount: 0
    })
    const [amount, setAmount] = useState(1)
    const [shop, setShop] = useState({})
    const [cookies, setCookies] = useCookies(['listProduct'])
    const { productId } = useParams();

    useEffect(() => {
        axios.get(`${baseURL}/products/${productId}`)
            .then((response) => {
                let current_product = {
                    ...response.data,
                    amount: amount
                }
                setProduct(current_product)
                axios.get(`${baseURL}/shops/${response.data.shop_id}`)
                    .then(response => {
                        setShop(response.data.shop)
                    })
            })
    }, [productId, amount])

    const handleAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    const addToCart = () => {
        var listProduct = [];
        let d = new Date();
        var isDuplicated = false;

        d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * 30))
        if (cookies.listProduct != null) {
            cookies.listProduct.forEach(prevProduct => {
                if (prevProduct.id === product.id) {
                    prevProduct.amount += amount
                    isDuplicated = true
                }
                listProduct.push({
                    id: prevProduct.id,
                    name: prevProduct.name,
                    image_data: prevProduct.image_data,
                    amount: prevProduct.amount,
                    shop_id: prevProduct.shop_id,
                    price: prevProduct.price
                })
            })
        } else {
            setCookies('listProduct', listProduct, { path: '/', expires: d })
        }

        if (isDuplicated) {
            console.log("hi")
            isDuplicated = false;
        } else {
            listProduct.push({
                id: product.id,
                name: product.name,
                image_data: product.image_data,
                amount: product.amount,
                shop_id: product.shop_id,
                price: product.price
            })
        }
        setCookies('listProduct', listProduct, { path: '/', expires: d })
        console.log("Add to cart successfully")
    }

    return (
        <div className="container">
            <br />
            <div className="row" id="wrap-product">
                <div className="col-lg-3" id="image-details">
                    <img
                        src={product.image_data == null ? "" : `${baseURLImage}/${JSON.parse(product.image_data).id}`}
                        style={product.image_data == null ? { display: "none" } : {}}
                        alt={product.name}
                        className="image-show-product"
                    />
                    <div className="image-show-product" style={product.image_data != null ? { display: "none" } : {}}></div>
                </div>
                <div className="col-lg-1 vertical-line-left"></div>
                <div className="col-lg-5 vertical-line-right">
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
                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                />
                                <button
                                    className="plus"
                                    onClick={() => setAmount(amount + 1)}
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
                <div className="col-lg-3">
                    <div className="row" id="wrap-product-shop-details">
                        <div className="col-lg-2">
                            <img src={shop.image_data != null
                                ? `${baseURLImage}/${JSON.parse(shop.image_data).id}`
                                : `${defaultImage}`}
                                alt="" className="icon-shop" />
                        </div>
                        <div className="col-lg-10">
                            <div className="text-shop">
                                {shop.name}
                            </div>
                        </div>
                        <div className="space-shop-details" />
                        <div className="col-lg-6">
                            <Link to={`/shops/${shop.id}`}>
                                <button className="btn btn-light">
                                    See Shop
                                </button>
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <button className="btn btn-light">
                                <FaPlus /> Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProduct;