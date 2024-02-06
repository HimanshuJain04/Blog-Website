import React from 'react'
import { AiFillUnlock } from "react-icons/ai"
import { FaUser } from "react-icons/fa"
import { login } from "../constants/images";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });


    const navigate = useNavigate();

    function onChange(event) {
        setData(
            {
                ...data,
                [event.target.name]: event.target.value
            }
        );
    }

    async function sendDataToServer(e) {

        e.preventDefault();

        await axios.post("/login", data)
            .then((res) => {
                console.log(res.data.user.token);
                // set cookie
                localStorage.setItem("userToken", res.data.user.token);

                setData({
                    ...data,
                    email: "",
                    password: "",

                })
                navigate("/");

            }).catch((err) => {
                console.log("Login Error : ", err);
            });
    }



    return (
        <div className='h-screen w-full flex justify-center items-center'>

            <div className='flex flex-col justify-center items-center gap-8'>

                <div className='h-40 w-40'>
                    <img className='bg-cover' src={login.image} alt="LoginImage" />
                </div>

                <div className='text-4xl'>LOGIN</div>

                <div className='flex flex-col gap-3'>

                    <div className='flex items-center justify-center gap-2 border-2 border-black py-2 px-3 rounded-md'>
                        <FaUser fontSize={"30px"} />
                        <input name="email" onChange={onChange} type='email' placeholder='Email' className='w-[250px] px-2 py-1 font-semibold text-lg outline-none border-l-2 border-black' />
                    </div>

                    <div className='flex items-center justify-center gap-2 border-2 border-black py-2 px-3 rounded-md'>
                        <AiFillUnlock fontSize={"30px"} />
                        <input name="password" onChange={onChange} type='password' placeholder='Password' className='w-[250px] px-2 py-1 font-semibold text-lg outline-none border-l-2 border-black' />
                    </div>
                </div>

                <button onClick={sendDataToServer} className='bg-blue-400 rounded-lg w-full h-11 font-bold text-white'>Login</button>


            </div>
        </div>
    )
}

export default Login;