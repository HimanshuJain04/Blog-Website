import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';


function MyPosts() {

    const userData = useSelector(state => state.authorizeUser.value);

    const showMyPost = async () => {
        try {

            const response = await axios.post("/getUserPost", { userId: userData?.id });
            console.log("All Posts : ", response?.data?.posts);


        } catch (err) {
            console.log("Error when getting att data on home page :   ");
            console.log(err);
        }
    }

    useEffect(() => {
        showMyPost();
    }, []);


    return (
        <div>MyPosts</div>
    )
}

export default MyPosts