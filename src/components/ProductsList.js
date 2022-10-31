import React from "react";
import { Link, useNavigate } from "react-router-dom";

const baseURLImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1/rails_upload/"

const ProductsList = (props) => {
    const navigate = useNavigate();

    const editProduct = (event, id) => {
        let product = props.products.filter((product) => product.id === id)
        localStorage.setItem("product_edit", JSON.stringify(product));
        event.stopPropagation();
    }

    const showProduct = (id) => {
        navigate(`products/show/${id}`)
    }

    const crudDisplay = (product_id) => {
        let user = JSON.parse(localStorage.getItem("current_user"))
        if (user == null || user.id !== product_id) {
            return { display: "none" }
        }
        return {}
    }

    return (
        <div className="row">
            {
                props.products.map(product => (
                    <div key={product.id} className="col-lg-2 product-item" onClick={(e) => showProduct(product.id)}>
                        <div className="name-product">{product.name}</div>
                        <div>
                            <img
                                src={product.image_data == null ? "" : `${baseURLImage}/${JSON.parse(product.image_data).id}`}
                                style={product.image_data == null ? { display: "none" } : {}}
                                alt={product.name}
                                className="image-list-product"
                            />
                            <div className="image-list-product" style={product.image_data != null ? { display: "none" } : {}}></div>
                        </div>
                        <div className="description-product">{product.description}</div>
                        <div className="price-product">{product.price}</div>
                        <button
                            className="btn btn-danger btn-product"
                            onClick={(e) => props.deleteProduct(e, product.id)}
                            style={crudDisplay(product.user_id)}
                        >
                            Delete
                        </button>
                        <Link
                            to="/edit"
                            className="btn btn-primary btn-product"
                            onClick={(e) => editProduct(e, product.id)}
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