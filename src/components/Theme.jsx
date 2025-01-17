import React from 'react'

const Theme = ({setStyleColor,setColorTheme,colorTheme}) => {
    const changeColor = (newColor) => {
        setStyleColor((prevState) => ({ ...prevState, color: newColor }));
      };
  return (
    <div>
      <div className="w-48 h-12 absolute right-0 top-12 bg-gray-300 flex items-center justify-center gap-2 rounded-3xl animate-sink max-md:top-9 max-md:-right-14">
        <button onClick={() => {
          changeColor("red"),
          setColorTheme(!colorTheme)
          }} 
          className="w-7 h-7 rounded-full border-2 border-black bg-red-500">
        </button>
        <button onClick={() => {
          changeColor("blue"),
          setColorTheme(!colorTheme)
          }} 
          className="w-7 h-7 rounded-full border-2 border-black bg-blue-500">
        </button>
        <button onClick={() => {
          changeColor("violet"),
          setColorTheme(!colorTheme)
          }} 
          className="w-7 h-7 rounded-full border-2 border-black bg-violet-500">
        </button>
        <button onClick={() => {
          changeColor("Green"),
          setColorTheme(!colorTheme)
          }} 
          className="w-7 h-7 rounded-full border-2 border-black bg-green-500">
        </button>
        <button onClick={() => {
          changeColor("Black"),
          setColorTheme(!colorTheme)
          }} 
          className="w-7 h-7 rounded-full border-2 border-black bg-black">
        </button>
      </div>
    </div>
  )
}

export default Theme
