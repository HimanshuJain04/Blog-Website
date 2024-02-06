import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCreatePost } from '../../store/slices/showCreatePostSlice';


function Navbar() {

    const dispatch = useDispatch();

    const isUserAuthorized = useSelector(state => state.authorizeUser.value);


    return (
        <div className='w-full shadow-md shadow-[black]/[0.2] fixed top-0 bg-white justify-center flex items-center'>
            <div className='w-11/12 h-16 flex justify-between items-center'>

                {/* blog name or button */}
                <Link to={"/"} className='font-bold text-3xl text-blue-800'>Blog</Link>

                {/* post button */}
                <div className={`flex justify-center items-center gap-5 ` + (isUserAuthorized ? "block" : "hidden")}>
                    <button onClick={() => { dispatch(setShowCreatePost()) }} className='text-white px-5 py-2 rounded-lg bg-blue-900'>Create Post</button>
                    <Link to={"/myPosts"} className='text-white px-5 py-2 rounded-lg bg-blue-900'>My Posts</Link>
                </div>

                {/* login and signup buttons */}
                <div className={`flex justify-center items-center gap-5 ` + (!isUserAuthorized ? "block" : "hidden")}>
                    <Button text="Signup" linkPath={"/signup"} flag={true} ></Button>
                    <Button text="Login" linkPath={"/login"} flag={false} ></Button>
                </div>

            </div>
        </div>
    )
}

export default Navbar