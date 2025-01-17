import React, {useState} from "react";

const FileItem = ({ file, onDelete, onRename }) => {
    const [dots,setDots] = useState(false)
  
  return (
    <div className="flex flex-col w-36 text-center justify-center relative ">
      <i className="fa-regular fa-file text-9xl"></i>
        <h1 className=" w-full text-center mt-1">{file.name}</h1>
        <div className="absolute top-1 right-1 ">
          <button 
            onClick={() => setDots(!dots)}
            className="w-10 h-5 flex justify-end"
            >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
        {
        dots
        ?
        <div className="absolute w-36 h-40 bg-gray-400 -left-5 rounded-lg top-6 hover:shadow-2xl animate-jump">
          <div className="flex justify-evenly mt-2 items-center">
            <div className="flex flex-col w-full ">
              <button
                onClick={() => onRename(file)}
                className="text-lg h-8 text-black hover:bg-gray-300">
                <span>Rename</span>
                <i className="fa-solid fa-edit ml-9"></i>
              </button>
              <button
                onClick={() => onDelete(file)}
                className="text-lg h-8 text-black  hover:bg-gray-300">
                <span>Delete</span> 
                <i className="fa-solid fa-trash ml-12"></i>
              </button>
            </div>
          </div>
          <hr className="bg-black p-[0.5px]"/>
          <button className="text-sm text-white">
            More Features coming soon...
          </button>
        </div>
      :
      dots
      }
    </div>
  );
};

export default FileItem;
