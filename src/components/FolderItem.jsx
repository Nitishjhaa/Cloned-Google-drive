import React, {useState} from "react";

const FolderItem = ({ folder, onNavigate, onDelete, onRename }) => {
  const [dots,setDots] = useState(false)
  return (
    <div className="flex flex-col w-36 rounded-lg justify-cente relative p-2">
      <div
        onClick={() => onNavigate(folder)}
        className="cursor-pointer text-lg font-medium text-center"
      >
        <i className="fa-solid fa-folder text-9xl"></i>
      </div>
      <h1 className="text-center w-full ">{folder.name}</h1>
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
        <div className="absolute w-40 h-40 bg-gray-400 -left-5 rounded-lg top-6 animate-jump">
          <div className="flex justify-evenly mt-2 items-center">
            <div className="flex flex-col w-full ">
              <button
                onClick={() => onRename(folder)}
                className="text-lg text-black h-8 hover:bg-gray-300">
                <span>Rename</span>
                <i className="fa-solid fa-edit ml-9"></i>
              </button>
              <button
                onClick={() => onDelete(folder)}
                className="text-lg text-black h-8  hover:bg-gray-300">
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

export default FolderItem;
