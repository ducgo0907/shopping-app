import React from "react";
import { useCookies } from "react-cookie";


const Cart = () => {
    const [cookies, setCookie] = useCookies(['listProduct'])

    console.log(cookies.listProduct[1])
    return (
        <div>
            {cookies.listProduct[1].id}
        </div >
    )
}

export default Cart;