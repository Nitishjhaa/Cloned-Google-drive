import React, { useState, useEffect, useRef } from "react";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";
import User from "./User";
import Theme from "./Theme";

// Utility: Get saved structure from localStorage or initialize with a default structure
const getStructureFromLocalStorage = () => {
  const savedStructure = localStorage.getItem("driveStructure");
  return savedStructure
    ? JSON.parse(savedStructure)
    : [{ id: 1, name: "Root", type: "folder", children: [] }];
};

// Utility: Save the current structure to localStorage
const saveStructureToLocalStorage = (structure) => {
  localStorage.setItem("driveStructure", JSON.stringify(structure));
};

const Home = () => {
  // State declarations
  const [structure, setStructure] = useState(getStructureFromLocalStorage());
  const [currentFolder, setCurrentFolder] = useState(structure[0]);
  const [path, setPath] = useState(["Root"]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [itemType, setItemType] = useState("folder");
  const [itemBeingRenamed, setItemBeingRenamed] = useState(null);
  const [renameInput, setRenameInput] = useState("");
  const [hideMenu, setHideMenu] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [styleColor, setStyleColor] = useState({ color: "Black" });
  const [colorTheme, setColorTheme] = useState(false);

  // Grid configurations
  const grid = [
    {
      id: 1,
      icon: <i className="fa-solid fa-users"></i>,
      className: "hover:bg-gray-200 pl-4 rounded-xl h-8 flex items-center",
      text: "Shared with me",
    },
    {
      id: 2,
      icon: <i className="fa-regular fa-clock"></i>,
      className: "hover:bg-gray-200 pl-4 rounded-xl h-8 flex items-center",
      text: "Recent",
    },
    {
      id: 3,
      icon: <i className="fa-regular fa-star"></i>,
      className: "hover:bg-gray-200 pl-4 rounded-xl h-8 flex items-center",
      text: "Starred",
    },
  ];

  const gridA = [
    {
      id: 1,
      icon: <i className="fa-solid fa-triangle-exclamation"></i>,
      className: "hover:bg-gray-200 pl-4 rounded-xl h-8 flex items-center",
      text: "Spam",
    },
    {
      id: 2,
      icon: <i className="fa-solid fa-trash"></i>,
      className: "hover:bg-gray-200 pl-4 rounded-xl h-8 flex items-center",
      text: "Bin",
    },
    {
      id: 3,
      icon: <i className="fa-solid fa-cloud"></i>,
      className: "hover:bg-gray-200 pl-4 rounded-xl h-8 flex items-center",
      text: "Storage",
    },
  ];

  const inputRef = useRef();

  // Effects to handle data persistence and focus
  useEffect(() => {
    saveStructureToLocalStorage(structure);
  }, [structure]);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  useEffect(() => {
    if (itemBeingRenamed) inputRef.current?.focus();
  }, [itemBeingRenamed]);

  // Handlers
  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const isDuplicate = currentFolder.children.some(
      (item) => item.type === itemType && item.name === newItemName
    );

    if (isDuplicate) {
      setErrorMsg(true);
      setTimeout(() => setErrorMsg(false), 3000);
      return;
    }

    const newItem =
      itemType === "folder"
        ? { id: Date.now(), name: newItemName, type: "folder", children: [] }
        : { id: Date.now(), name: newItemName, type: "file" };

    currentFolder.children.push(newItem);
    setStructure([...structure]);
    setNewItemName("");
    setIsAdding(false);
  };

  const handleRename = () => {
    if (!renameInput.trim()) return;

    const isDuplicate = currentFolder.children.some(
      (item) => item.name === renameInput.trim() && item.id !== itemBeingRenamed.id
    );

    if (isDuplicate) return;

    itemBeingRenamed.name = renameInput.trim();
    setStructure([...structure]);
    setItemBeingRenamed(null);
    setRenameInput("");
  };

  const handleNavigate = (folder) => {
    setCurrentFolder(folder);
    setPath([...path, folder.name]);
  };

  const handleGoBack = () => {
    if (path.length > 1) {
      path.pop();
      setPath([...path]);
      const findFolder = (folder, name) => {
        if (folder.name === name) return folder;
        for (const child of folder.children || []) {
          if (child.type === "folder") {
            const found = findFolder(child, name);
            if (found) return found;
          }
        }
        return null;
      };
      setCurrentFolder(findFolder(structure[0], path[path.length - 1]));
    }
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setDeleteConfirmation(true);
  };

  const confirmDeletion = () => {
    if (itemToDelete) {
      currentFolder.children = currentFolder.children.filter(
        (item) => item.id !== itemToDelete.id
      );
      setStructure([...structure]);
    }
    setDeleteConfirmation(false);
    setItemToDelete(null);
  };

  return (
    <>
    <div className="min-h-screen font-QuickSand bg-[#F8FAFD]" style={styleColor}>
      <div className="absolute w-16 h-8 top-4 right-24 rounded-full text-center bg-gray-200 max-md:right-[9.5rem] border-2 border-black active:shadow-xl">
        <button onClick={() => setColorTheme(!colorTheme)} className="w-12 h-8 -ml-1 ">Theme</button>
        {colorTheme?<Theme setStyleColor = {setStyleColor} setColorTheme = {setColorTheme} colorTheme={colorTheme}/>:""}
      </div>

      <div className="border-b-0 h-16 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 ml-5 flex">
          <img src="/images/profile.png" alt="" className="w-12"/>
          <a href="/" className="text-[20px] mt-1 max-md:text-[18px]"> &nbsp;User's Drive</a>
        </h1>
       <User />
      </div>

      <div className="absolute top-0 right-24 mt-2 hidden max-md:block z-[1000] ">
        {/* For mobile view */}
        <div className="flex flex-col gap-5">
          <button
            onClick={() => setHideMenu(!hideMenu)}
            className="h-10 w-10 rounded-full flex justify-center items-center active:scale-[0.98] shadow-md hover:bg-gray-300 active:shadow-inner hover:shadow-lg">
            <i className="fa-solid fa-plus"></i>
          </button>
          {hideMenu ? (
            <div className="flex flex-col gap-1 h-40 bg-gray-100 absolute w-[14rem] rounded-md top-20 -left-28 shadow-lg animate-jump">
              <button
                className="h-8 hover:bg-gray-300"
                onClick={() => {
                  setIsAdding(true);
                  setItemType("folder");
                  setHideMenu(!hideMenu)
                }}
              >
                <i className="fa-solid fa-folder-plus text-sm"></i>&nbsp;&nbsp; New Folder
              </button>
              <button
                className="h-8 hover:bg-gray-300"
                onClick={() => {
                  setIsAdding(true);
                  setItemType("file");
                  setHideMenu(!hideMenu)
                }}
              >
                <i className="fa-solid fa-file-circle-plus text-sm"></i>&nbsp;&nbsp; New File
              </button>
              <hr className="w-full bg-gray-300 p-[0.5px]"/>
              <button>
                More Features Coming soon...
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="absolute  max-sm:-left-[16rem] max-md:-left-[36.5rem] top-[5rem] ">
            {path.length > 1 && (
              <button
                className="text-black w-10 h-10 bg-gray-100 active:bg-gray-300 rounded-full active:scale-95"
                onClick={handleGoBack}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            )}
              </div>
        </div>
      </div>

        {/* For larger Screen */}
      <div className="flex flex-row gap-4">
        {/* Sidebar */}
        <div className="w-[17.5rem] h-[39rem] ml-3 pt-10 max-md:hidden">
          <div className="absolute top-[90%] left-6">
            <h3 className="h-10 font-semibold text-gray-700 flex items-center text-sm">
              Current Directory: {path.join(" / ")}
            </h3>
          </div>
          <div className="flex flex-col gap-5">
            <button
              onClick={() => setHideMenu(!hideMenu)}
              className="h-14 w-32 flex justify-center items-center rounded-xl active:scale-[0.98] shadow-md bg-white hover:bg-gray-400 active:shadow-inner hover:shadow-lg"
            >
              <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;New
            </button>
            {hideMenu ? (
              <div className="flex flex-col gap-1 h-80 bg-white absolute w-[18rem] rounded-md top-44 shadow-lg animate-sink">
                <button
                  className="h-8 hover:bg-gray-300 pr-36"
                  onClick={() => {
                    setIsAdding(true);
                    setItemType("folder");
                    setHideMenu(!hideMenu)
                  }}
                >
                  <i className="fa-solid fa-folder-plus text-sm"></i>&nbsp;&nbsp; New Folder
                </button>
                <button
                  className="h-8 hover:bg-gray-300 pr-[10.2rem]"
                  onClick={() => {
                    setIsAdding(true);
                    setItemType("file");
                    setHideMenu(!hideMenu)
                  }}
                >
                  <i className="fa-solid fa-file-circle-plus text-sm"></i>&nbsp;&nbsp; New File
                </button>
                <hr className="w-full bg-gray-300 p-[0.5px]"/>
                <button>
                  More Features Coming soon...
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="absolute left-[20rem] top-[5rem] max-lg:left-[17rem]">
              {path.length > 1 && (
                <button
                  className="text-black w-10 h-10 bg-gray-100 active:bg-gray-300 rounded-full active:scale-95"
                  onClick={handleGoBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              )}
            </div>
          </div>
          <div className=" mt-5 h-60">
            <a href="/">
              <div className="h-8 bg-[#C2E7FF] hover:bg-[#a8dcff] flex pl-5 items-center rounded-xl text-sm ">
                <i className="fa-solid fa-house"></i>&nbsp;&nbsp;&nbsp;
                Home
              </div>
            </a>
            <a href="/">
              <div className="h-8 hover:bg-gray-200 flex pl-5 items-center rounded-xl text-sm mt-[2px]">
              <i className="fa-brands fa-google-drive"></i>&nbsp;&nbsp;&nbsp;
               My Drive
              </div>
            </a>
            <a href="/">
              <div className="h-8  hover:bg-gray-200 flex pl-5 items-center rounded-xl text-sm">
              <i className="fa-solid fa-computer"></i>&nbsp;&nbsp;&nbsp;
                Computers
              </div>
            </a>

            <div className=" mt-2 h-52 flex gap-5 flex-col">
              <div className=" h-1/2 flex flex-col gap-1 mt-3 cursor-pointer">
                {
                  grid.map((items) => {
                    return (
                      <div key={items.id} className={items.className}>
                        {items.icon}&nbsp;&nbsp;&nbsp;{items.text}
                      </div>
                    )
                  })
                }
              </div>
              <div className="h-1/2 flex flex-col gap-1 ">
                {
                  gridA.map((items) => {
                    return (
                      <div key={items.id} className={items.className}>
                        {items.icon}&nbsp;&nbsp;&nbsp;{items.text}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 rounded-xl shadow-md bg-white h-[39rem] overflow-y-auto max-md:w-full border bordder-black max-md:h-[50rem]">
          {isAdding && (
           <div className="w-full h-screen bg-[#00000033] transition-colors duration-100 absolute top-0 left-0 border border-black flex justify-center items-center">
            <div className="w-[30rem] h-72 bg-gray-100 shadow-lg z-[1000]">
              <div className="flex flex-col items-center justify-center gap-2 h-full text-sm">
                <input
                  ref={inputRef}
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={`Enter ${itemType} name`}
                  className="px-4 py-2 border rounded w-3/4 max-md:w-[50%]"
                />
                <span className="text-red-500">{errorMsg?"Name already exists! Please Change":errorMsg}</span>
                <div className="flex gap-5 mt-2">
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Create {itemType}
                  </button>
                  <button
                    onClick={() => {
                      setNewItemName("");
                      setIsAdding(false);
                    }}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
           </div>
          )}

          <div className="flex flex-wrap justify-start gap-11 mt-16 pl-10">
            {currentFolder.children.map((item) =>
              itemBeingRenamed?.id === item.id ? (
                <div key={item.inde} className="w-full h-screen bg-[#00000033] transition-colors duration-100 absolute top-0 left-0 border border-black flex justify-center items-center">
                  <div className="w-[30rem] h-72 bg-gray-100 shadow-lg rounded-lg z-[1000]">
                    <div key={item.id} className="flex flex-col items-center justify-center h-full">
                    <input
                      type="text"
                      ref={inputRef}
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      placeholder="Enter new name"
                      className="px-4 py-2 border rounded w-3/4"
                    />
                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={handleRename}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => {
                          setItemBeingRenamed(null);
                          setRenameInput("");
                        }}
                        className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
              ) : item.type === "folder" ? (
                <FolderItem
                  key={item.id}
                  folder={item}
                  onNavigate={handleNavigate}
                  onDelete={handleDelete}
                  onRename={() => {
                    setItemBeingRenamed(item);
                    setRenameInput(item.name);
                  }}
                />
              ) : (
                <FileItem
                  key={item.id}
                  file={item}
                  onDelete={handleDelete}
                  onRename={() => {
                    setItemBeingRenamed(item);
                    setRenameInput(item.name);
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
    {deleteConfirmation ? (
        <div className="w-full h-screen bg-[#00000033] transition-colors duration-100 absolute top-0 left-0 border border-black flex justify-center items-center">
            <div className="w-96 h-60 bg-gray-300 rounded-2xl">
                <h1 className="text-center mt-10 text-xl">Are you sure you want to delete?</h1>
                <div className="flex justify-center items-center mt-10 gap-2">
                    <button
                        onClick={confirmDeletion} // Call confirmDeletion to delete
                        className="w-32 h-10 border border-black hover:bg-red-500 rounded-xl rounded-tl-full rounded-bl-full"
                    >
                        Yes!
                    </button>
                    <button
                        onClick={() => setDeleteConfirmation(false)} // Cancel delete
                        className="w-32 h-10 border border-black hover:bg-gray-400 rounded-tr-full rounded-br-full"
                    >
                        No!
                    </button>
                </div>
            </div>
        </div>
    ) : (
        ""
    )}
    </>
  );
};

export default Home;
