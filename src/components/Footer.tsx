import React from "react";
const Footer = () => {
    return (
        <footer className="flex bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-max w-full py-4 z-50 justify-between">
            <p className="text-white ml-8"><span className="font-thin text-lg">Preview of spotify</span><br/>Sign up to get unlimited songs and postcasts with occasional ads. No credit card needed</p>

            <button className="rounded-3xl w-32 gap-3 font-bold  transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 mr-3" >Sign up free</button>

   
        </footer>
    )
}
export default Footer