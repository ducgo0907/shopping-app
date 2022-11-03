import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaTrash } from "react-icons/fa";


const baseURLImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1/rails_upload/"

const Cart = () => {
    const [cookies, setCookies] = useCookies(['listProduct'])
    const [total, setTotal] = useState(0);

    const handleAmount = (event, action, id) => {
        let d = new Date();
        d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * 30))
        var listProduct = cookies.listProduct.map((product) => {
            if (product.id === id) {
                switch (action) {
                    case 'up':
                        product.amount += 1;
                        break;
                    case 'down':
                        if (product.amount > 1) {
                            product.amount -= 1;
                        } else {
                            console.log("hi")
                            return null;
                        }
                        break;
                    case 'input':
                        product.amount = event.target.value
                        break;
                    default:
                        break;
                }
            }
            return product;
        })
        listProduct = listProduct.filter(product => product != null)
        setCookies('listProduct', listProduct, { path: '/', expires: d })
    }

    useEffect(() => {
        setTotal(cookies.listProduct.reduce((total, product) => {
            return total + product.price * product.amount
        }, 0));
        console.log(total)
    }, [cookies, total])

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-9">
                    <div id="title-cart">
                        <h2>Cart</h2>
                    </div>
                    <div id="list-products-wrap">
                        <div className="list-products">
                            {cookies.listProduct.map((product, key) => (
                                <div
                                    key={key}
                                    className="row product-list-cart"
                                >
                                    <div className="col-lg-12 shop-name">
                                        Shop Name
                                    </div>
                                    <div className="col-lg-2">
                                        <img src={`${baseURLImage}/${JSON.parse(product.image_data).id}`} alt="" className="image-cart" />
                                    </div>
                                    <div className="col-lg-2">
                                        {product.name}
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="text-product-cart">
                                            {product.price + "$"}
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="text-product-cart">

                                            <div className="amount-wrap">
                                                <button
                                                    className="minus"
                                                    onClick={(e) => handleAmount(e, 'down', product.id)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={product.amount}
                                                    className="amount-product-cart"
                                                    onChange={(e) => handleAmount(e, 'input', product.id)}
                                                />
                                                <button
                                                    className="plus"
                                                    onClick={(e) => handleAmount(e, 'up', product.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="text-product-cart">
                                            {product.amount * product.price + "$"}
                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="text-product-cart">
                                            <FaTrash />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2" id="payment-wrap">
                    <div className="row">
                        <div className="col-lg-12 payment-bar">
                            Address
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 payment-bar">
                            Promotion
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 payment-bar">
                            <div>
                                Total Money: {total + "$"}
                            </div>
                            <div>
                                Promotion money:
                            </div>
                            <hr />
                            Real Money:
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <button className="btn btn-danger col-lg-12">Check out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart;