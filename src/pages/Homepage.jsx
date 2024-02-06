import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import HomePost from "../components/templates/HomePost";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthorize } from '../store/slices/authorizeUser';

function Homepage() {

  const [allPost, setAllPost] = useState([]);

  const data = useSelector(state => state.authorizeUser.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function userValidate() {

    let token = localStorage.getItem("userToken");

    fetch("/validate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      }

    ).then(async (res) => {

      const result = await res.json();

      if (!result.status) {
        dispatch(setUserAuthorize(null));
        navigate("/login");

      } else {

        dispatch(setUserAuthorize(
          {
            id: result?.validUser?._id,
            email: result?.validUser?.email,
            name: result?.validUser?.name
          }
        ));

        getAllData();
      }


    }).catch((error) => {

      dispatch(setUserAuthorize(null));
      navigate("/login");
      console.log("error : ", error);
    })

  }


  const getAllData = async () => {
    try {

      const response = await axios.get("/getAllPost");
      setAllPost(response.data.post);

    } catch (err) {
      console.log("Error when getting att data on home page :   ");
      console.log(err);
    }
  }


  useEffect(() => {
    userValidate();
  }, []);


  return (
    <div className='text-lg font-bold flex flex-col w-10/12 gap-5 items-center justify-center'>
      <div className='flex justify-evenly w-full'>

        <p>Email: {data?.email} </p>
        <p>UserName: {data?.name}</p>
      </div>

      <div>
        {allPost?.length > 0 ? (
          <div className='flex flex-col gap-5 '>
            {allPost?.map((post) => (
              <HomePost key={post._id} data={post} />
            ))}
          </div>
        ) : (
          <div>No Data Found</div>
        )}
      </div>

    </div>
  )
}

export default Homepage