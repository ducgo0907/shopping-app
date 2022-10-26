import React from "react";
import Bar from "../components/Bar";
import ProductsList from "../components/ProductsList";
import TitleHome from "../components/TitleHome";

const Home = () => {
    return (
        <>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-lg-2">
                        <Bar />
                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            <TitleHome />
                        </div>
                        <ProductsList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;