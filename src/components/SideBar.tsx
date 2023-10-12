import React, { useEffect, useState } from "react";
import { MdHomeFilled, MdSearch ,MdLanguage} from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import {VscDiffAdded} from "react-icons/vsc";
import likedsongs from "../Assets/images/likedsongs.jpg"
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
export default function Sidebar(props: any) {
    
    const [MyPlaylists, setMyPlaylists] = useState<[]>()
    const PlaylistsFetched = useQuery({
        queryKey: ["myPlaylists"],
        queryFn: async () => {
            return await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: `Bearer ${props.Token}`
                }
            })
        }
    })
    useEffect(()=>{
        setMyPlaylists(PlaylistsFetched.data?.data.items)
    }, [PlaylistsFetched.data])
  return (
    <>
      <div className="bg-black flex flex-col text-gray-500 h-[91vh]	min-w-[15vw] w-[15vw] ">
        <div className="text-center m-4	">
          <img className="w-32 "
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul className="flex flex-col text-xl gap-4 mt-4 ml-4" >
          <li className="flex gap-4 cursor-pointer transition ease-in-out delay-150 hover:text-white " onClick={()=>{props.setHomeToggled(true); props.setLibraryToggled(false); props.setSearchToggled(false)}}>
            <MdHomeFilled  className="translate-y-0.75 text-3xl" />
            <span>Home</span>
          </li>
          <li className="flex gap-4 transition ease-in-out delay-150 cursor-pointer hover:text-white" onClick={()=>{props.setHomeToggled(false); props.setLibraryToggled(false); props.setSearchToggled(true)}}>
            <MdSearch className="translate-y-0.75 text-3xl" />
            <span>Search</span>
          </li>
          <li className="flex gap-4 transition ease-in-out delay-150 cursor-pointer hover:text-white " onClick={()=>{props.setHomeToggled(false); props.setLibraryToggled(true); props.setSearchToggled(false)}}>
            <IoLibrary  className="translate-y-0.75 text-3xl"/>
            <span>Your Library</span>
          </li>

      <div className="mt-4">
          <li className="flex gap-4 transition ease-in-out delay-150 cursor-pointer hover:text-white ">
            <VscDiffAdded  className="translate-y-0.75 text-3xl"/>
            <span>Create Playlist</span>
          </li>

          <li className="flex gap-5 transition ease-in-out delay-150 cursor-pointer hover:text-white  mt-4">
            <img src={likedsongs} alt='likedsongs' className="translate-y-0.75  w-6 h-6 "/>
            <span>Liked Songs</span>
          </li>
          {MyPlaylists && MyPlaylists.map((playlist: any)=>(
                <li className="flex gap-5 mt-7 ml-7 transition ease-in-out delay-150 cursor-pointer hover:text-white"  >
                <span>{playlist.name}</span>
            </li>
          ))   
          }
          </div>

        </ul>


        <div className="mt-40 ml-8">

          <div className="flex gap-6">
            <p>legacy</p>
            <p>Privacy Center</p>
          </div>

          <div className="flex mt-4 gap-6">
            <p>Privacy  Police</p>
            <p>Cookies</p>
          </div>

          <div className="mt-4 flex gap-4">
          
            <p>About Ads</p>
            <Switch defaultChecked size="small" />
          </div>
          

          <p className="mt-4">Cookies</p>

        </div>

     
        <div className="mt-9 ml-8 ">
        <Button className="rounded-xl w-32 gap-3 cursor-pointer hover:text-white" variant="outlined" color="inherit"><MdLanguage className=" text-2xl "/>English</Button>
        </div>
 


      </div>
    </>
  );
}

