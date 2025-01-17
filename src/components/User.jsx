import React, { useState } from 'react';
import ProfileImg from '/images/default.png';

const User = () => {
    const [profile, setProfile] = useState(false);

    return (
        <div>
            <button onClick={() => setProfile(!profile)}>
                <img src={ProfileImg} alt="profile_img" className="mr-8 h-10" />
            </button>
            {profile && (
                <div className="z-[2000] absolute animate-sink rounded-2xl bg-gray-200 right-10 max-md:right-5 max-md:top-16">
                    <button
                        className="w-8 h-8 rounded-full absolute right-1 top-1 active:scale-90"
                        onClick={() => setProfile(!profile)}
                    >
                        <i className="fa-solid fa-x"></i>
                    </button>
                    <div className="h-80 w-80">
                        <div className="w-full h-full">
                            <h1 className="text-center font-bold mt-2">Welcome User@gmail.com</h1>
                            <div className="flex flex-col items-center mt-5">
                                <img src={ProfileImg} alt="" className="w-12" />
                                <h1 className="text-center font-bold mt-2">Hi, User!</h1>
                            </div>
                            <div className="flex gap-2 mt-10 w-full h-14">
                                <div
                                    className="bg-white w-1/2 ml-5 rounded-tl-[3rem] rounded-bl-[3rem] flex justify-center items-center cursor-pointer"
                                >
                                    <i className="fa-solid fa-plus ml-3 mr-2"></i>Add account
                                </div>
                                <div
                                    className="bg-white w-1/2 mr-5 rounded-tr-[3rem] rounded-br-[3rem] flex justify-center items-center cursor-pointer"
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;&nbsp;&nbsp;Sign Out
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
