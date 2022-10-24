import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000/products"

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const deleteProduct = (event, id) => {
        axios.delete(`${baseURL}/${id}`)
            .then((response) => {
                setProducts(response.data)
                console.log("Product deleted")
            })
            .catch((error) => console.log(error))
        event.stopPropagation();
    }

    useEffect(() => {
        axios.get(baseURL)
        .then((response) => {
            setProducts(response.data)
            })
    }, [])

    const editProduct = (event, id) => {
        let product = products.filter((product) => product.id === id)
        localStorage.setItem("product_edit", JSON.stringify(product));
        event.stopPropagation();
    }

    const showProduct = (id) => {
        navigate(`/show/${id}`)
    }

    const crudDisplay = (product_id) => {
        let user = JSON.parse(localStorage.getItem("current_user"))
        if(user == null || user.id !== product_id){
            return {display: "none"}
        }
        return {}
    }
    return (
        <div className="row">
            {
                products.map(product => (
                    <div key={product.id} className="col-lg-2 product-item" onClick={(e) => showProduct(product.id)}>
                        <div className="name-product">{product.name}</div>
                        <div className="description-product">{product.description}</div>
                        <div className="price-product">{product.price}</div>
                        <button
                            className="btn btn-danger btn-product"
                            onClick={(e) => deleteProduct(e, product.id)}
                            style={crudDisplay(product.user_id)}
                        >
                            Delete
                        </button>
                        <Link
                            to="/edit"
                            className="btn btn-primary btn-product"
                            onClick={(e) => editProduct(e,product.id)}
                            style={crudDisplay(product.user_id)}
                        >
                            Edit
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductsList;