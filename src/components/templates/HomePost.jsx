import React from "react";

function HomePost({ data }) {
  // console.log(data._id);

  return (
    <div className="border-b-4 pb-5 border-[black]">
      <div className="">
        <img src={data?.image} alt="postImage" />
      </div>
      <h3>{data?.title}</h3>
    </div>
  );
}

export default HomePost;
