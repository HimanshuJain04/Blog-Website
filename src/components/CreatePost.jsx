import React from 'react';
import { useState, useRef } from 'react';
import { RxCross1 } from "react-icons/rx"
import { useDispatch, useSelector } from 'react-redux';
import { setShowCreatePost } from "../store/slices/showCreatePostSlice";
import axios from "axios";


function CreatePost() {

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const verifiedUserData = useSelector(state => state.authorizeUser.value);

    const [data, setData] = useState({
        title: "",
        description: "",
    });

    const [image, setImage] = useState("");


    async function uploadFile(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append("title", data.title);
        fd.append("description", data.description);
        fd.append("image", image);

        await axios.post('/post', fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then((res) => {
                alert("Image uploaded Succesfully");
            })
            .catch((err) => {
                alert("Image uploaded Failed");
                console.log(err);
            })
    }


    function onChange(event) {
        setData(
            {
                ...data,
                [event.target.name]: event.target.value
            }
        );
    }


    return (
        <form onSubmit={uploadFile} className='bg-white border-2 relative gap-5 w-[800px] p-10 flex flex-col justify-center items-center'>

            {/* Cross button */}
            <button onClick={() => { dispatch(setShowCreatePost()) }} className='cursor-pointer absolute z-10 right-1 top-1'>
                <RxCross1 fontSize={20} />
            </button>

            {/* image */}
            <div className='w-full cursor-pointer h-[300px] flex relative justify-center items-center '>

                <input onChange={(e) => { setImage(e.target.files[0]) }} name="image" ref={inputRef} type="file" className='' />

            </div>

            {/* title and descrption */}
            <div className='flex flex-col justify-center w-full items-center gap-5'>
                <input name='title' onChange={onChange} placeholder='Title' className='px-1 w-full py-1 border-2 border-[black]/[0.5] font-bold text-lg' type="text" />
                <textarea name="description" onChange={onChange} placeholder='Descritpion' className='px-1 w-full min-h-[200px] py-1 border-2 border-[black]/[0.5] font-semibold text-md' />
            </div>

            {/* button */}
            <button type='submit' className='px-6 cursor-pointer py-2 text-lg bg-red-500 text-white rounded-lg font-semibold'>Post</button>
        </form>
    )
}

export default CreatePost