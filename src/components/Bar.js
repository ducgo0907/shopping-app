import React, { useState } from "react";

const Bar = (props) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const typeProduct = ["Tivi", "Fridge", "Air condition", "Game", "Fruit", "Clock",
        "Phone"];
    return (
        <div className="bar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12" id="bar-list-type">
                        <div className="title-bar">List Product</div>
                        {typeProduct.map((type) => (
                            <div key={type}>{type}</div>
                        ))}
                        <hr />
                    </div>
                    <div className="col-lg-12" id="price-option">
                        <div className="title-bar">Price</div>
                        <div className="subtitle">Range price</div>
                        <input
                            className="input-range"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        -
                        <input
                            className="input-range"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <div
                            className="button-apply"
                            onClick={() => props.getProductsInRange(minPrice, maxPrice)}
                        >Apply</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bar;