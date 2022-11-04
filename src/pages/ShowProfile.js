import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseURL = "http://localhost:3000/users";

const ShowProfile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
    })
    const [day, setDay] = useState(1)
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(1920)
    const { userId } = useParams();

    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const years = Array.from({ length: 100 }, (_, i) => i + 1923)

    let authen_token = JSON.parse(localStorage.getItem("authen_token")).auth_token

    let birthday = new Date(year, month, day)

    const changeUserInfo = (e) => {
        setUser({
            ...user,
            birthday: birthday,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {

        let authen_token = JSON.parse(localStorage.getItem("authen_token")).auth_token

        axios.patch(`${baseURL}/${user.id}`, {
            user: {
                ...user,
                birthday: birthday,
            }
        }, {
            headers: {
                Authorization: authen_token
            }
        })
            .then((response) => {
                if (response.data.user != null) {
                    setUser(response.data.user)
                    const expire = JSON.parse(localStorage.getItem("current_user")).expire

                    var current_user = {
                        ...response.data.user,
                        expire: expire,
                        shop_id: response.data.shop_id
                    }
                    localStorage.setItem("current_user", JSON.stringify(current_user))
                    console.log("Update user successful")
                } else {
                    console.warn("Update failed")
                }
            })
    }

    useEffect(() => {
        axios.get(`${baseURL}/${userId}`, {
            headers: {
                Authorization: authen_token
            }
        })
            .then((response) => {
                setUser(response.data.user)
                let birthday_user = new Date(response.data.user.birthday);
                setDay(birthday_user.getDate());
                setMonth(birthday_user.getMonth());
                setYear(birthday_user.getFullYear());
            })
    }, [authen_token, userId])
    return (
        <>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-lg-2" id="user-bar">bar</div>

                    <div className="col-lg-9" id="user-details">
                        <div className="row">
                            <div className="col-lg-7">
                                {/* Information user left */}
                                <div className="col-lg-12">User informations</div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-2">
                                        <label htmlFor="name">Name:</label>
                                    </div>
                                    <div className="col-lg-10">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={user.name}
                                            className="form-control"
                                            onChange={changeUserInfo}
                                        />
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-lg-2">
                                        <label htmlFor="birthday">Birth day:</label>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <select value={day || "Day"} className="form-select" onChange={(e) => setDay(e.target.value)}>
                                                    <option>Day</option>
                                                    {days.map((day) => (
                                                        <option key={"day" + day} value={day}>{day}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-4">
                                                <select value={month + 1 || "Month"} className="form-select" onChange={(e) => setMonth(e.target.value)}>
                                                    <option>Month</option>
                                                    {months.map((month) => (
                                                        <option key={"month" + month} value={month}>{month}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-4">
                                                <select value={year || "Year"} className="form-select" onChange={(e) => setYear(e.target.value)}>
                                                    <option>Year</option>
                                                    {years.map((year) => (
                                                        <option key={"years" + year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-lg-2">
                                        <label htmlFor="name">Gender:</label>
                                    </div>
                                    <div className="col-lg-10">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={1}
                                            onChange={changeUserInfo}
                                            checked={user.gender === null ? false : user.gender.toString() === '1'}
                                        /> Male &nbsp;
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={0}
                                            onChange={changeUserInfo}
                                            checked={user.gender === null ? false : user.gender.toString() === '0'}
                                        /> Female
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-2"></div>
                                    <div className="col-lg-10">
                                        <input type="submit" value="Save" className="btn btn-primary" onClick={handleSubmit} />
                                    </div>
                                </div>
                            </div>

                            {/* This is left information */}
                            <div className="col-lg-1 vertical-line"></div>
                            <div className="col-lg-4">
                                <div className="col-lg-12">
                                    Email and phone number:
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-5">Email: </div>
                                    <div className="col-lg-7">{user.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowProfile;