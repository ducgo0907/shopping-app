import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000/"
const baseURLImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1/rails_upload/"
const defaultImage = "https://res.cloudinary.com/dwrjzyqnw/image/upload/v1667469352/rails_upload/74827_x9ytee.png"


const ListShop = () => {
    const [shops, setShops] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("current_user"))
        axios.get(`${baseURL}/shops`, {
            params:{
                id: user.id
            }
        })
            .then((response) => {
                setShops(response.data)
                console.log(response.data)
            })
    }, [])

    const showShop = (id) => {
        navigate(`${id}`)
    }

    let listView = {}
    let noficationView = {}

    if (shops.length === 0) {
        listView.display = "none";
    } else {
        noficationView.display = "none";
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10">
                        <h2>My Shop: </h2>
                        <div className="list-shop-wrap" style={listView}>
                            {shops.map((shop) => (
                                <div key={shop.id} className="list-shop row" onClick={() => showShop(shop.id)}>
                                    <div className="col-lg-1">
                                        {shop.image_data
                                            ? <img src={`${baseURLImage}/${JSON.parse(shop.image_data).id}`} alt="" className="icon" />
                                            : <img src={`${defaultImage}`} alt="" className="icon" />}
                                    </div>
                                    <div className="col-lg-3">
                                        {shop.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="nofication" style={noficationView}>
                            You don't have any group. Please create some group !
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <Link to='create'>
                            Create New Shop <FaPlusCircle />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListShop;