import Link from "next/link";
import React from "react";

const PostCard = ({ item }) => {
  const createdAtTime = item.createdAt.split("T")[0];
  console.log(item);
  return (
    <Link className="max-w-3xl h-45v" href={`/posts/${item._id}`}>
      <div className="h-full w-full flex flex-col items-start justify-start space-y-2 hover:shadow-lg shadow-gray-400 ease-in-out duration-300 rounded-xl cursor-pointer ">
        <img
          src={item.postImg[0]}
          alt=""
          className="w-full h-25v rounded-2xl p-1"
        />
        <div className="w-full h-20v flex flex-col items-start justify-start p-1 space-y-6 ">
          <h1 className="text-3xl text-semibold text-neutral-900 px-1">
            {item.postTitle}
          </h1>
          <p className="text-sm px-1">{item.postDescription}</p>
          <div className="flex items-center justify-center md:space-x-3 px-1">
            <img
              src="https://imgs.search.brave.com/BbT4YBOEdGKbwvMFyV7Qg37YCw7HDRNLEaLepM1KdxE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/bWlsaW5nLWNhdWNh/c2lhbi1ndXktd2l0/aC1iZWFyZC1sb29r/aW5nLWhhcHB5XzE3/NjQyMC0xODcwNy5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
            <p className="text-lg">
              {item.creatorName} <i className="text-4xl">.</i> {createdAtTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
