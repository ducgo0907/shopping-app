import React from "react";
import { useCookies } from "react-cookie";

const Cart = () => {
    const [cookies] = useCookies(['listProduct'])

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10">
                    <div id="title-cart">Cart</div>
                    <div id="list-products-wrap">
                        <div className="list-products">
                            {cookies.listProduct.map((product, key) => (
                                <div key={key} className="row">
                                    <div className="col-lg-3">
                                        {product.name}
                                    </div>
                                    <div className="col-lg-3">
                                        {product.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2">

                </div>
            </div>
        </div >
    )
}

export default Cart;