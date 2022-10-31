import axios from "axios";
import React, { useEffect, useState } from "react";
import Bar from "../components/Bar";
import ProductsList from "../components/ProductsList";
import TitleHome from "../components/TitleHome";

const baseURL = "http://localhost:3000/"

const Home = (props) => {
    const [products, setProducts] = useState([]);

    var authen_token;
    if(localStorage.getItem("authen_token") != null && localStorage.getItem("authen_token") !== "undefined"){
        authen_token = JSON.parse(localStorage.getItem("authen_token")).auth_token
    }

    const deleteProduct = (event, id) => {
        axios.delete(`${baseURL}/products/${id}`, {
            headers: {
                Authorization: authen_token
            }
        })
            .then((response) => {
                setProducts(response.data)
                console.log("Product deleted")
            })
            .catch((error) => console.log(error))
        event.stopPropagation();
    }

    useEffect(() => {
        axios.get(`${baseURL}/products`)
            .then((response) => {
                setProducts(response.data)
            })
    }, [])

    useEffect(() => {
        setProducts(props.searchProducts)
    }, [props.searchProducts])

    const getProductsInRange = (minPrice, maxPrice) => {
        console.log("Range: " + minPrice + "-" + maxPrice)

        axios.get(`${baseURL}/products_in_range`, {
            params: {
                min: minPrice,
                max: maxPrice,
            },
        })
            .then(response => {
                setProducts(response.data)
                console.log(response.data)
            })
    }

    return (
        <>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-lg-2">
                        <Bar
                            getProductsInRange={getProductsInRange}
                        />
                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            <TitleHome />
                        </div>
                        <ProductsList
                            products={products}
                            deleteProduct={deleteProduct}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;