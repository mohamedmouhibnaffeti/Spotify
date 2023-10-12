import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import Body from "./Body";
import Navbar from "./NavBar";
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { CirclesWithBar} from "react-loader-spinner";
import Library from "./Library";
import Search from "./Search";

type User = {
  userID: string,
  username: string
}

const Home = (props: any) => {
  const token: string = props.Token
  const [UserData, setUserData] = useState<User>()
  const UserInfo: any = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      return await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  })
  useEffect(()=>{
    if(!UserInfo.isLoading && !UserInfo.error) {setUserData({userID: UserInfo.data.data.id, username: UserInfo.data.data.display_name});}
    console.log("fetched data; ", UserData)
  }, [UserInfo.data])
  const [HomeToggled, setHomeToggled] = useState(true)
  const [LibraryToggled, setLibraryToggled] = useState(false)
  const [SearchToggled, setSearchToggled] = useState(false)
  return (
    <div className="overflow-y-scroll no-scrollbar ">
    <div id="app" className="flex h-[91vh] overflow-hidden">

        <Sidebar Token={token} setLibraryToggled={setLibraryToggled} setHomeToggled={setHomeToggled} setSearchToggled={setSearchToggled}/>
        <main className="overflow-scroll">   
        <Navbar username={UserData?.username} />
          { UserInfo.isLoading ? <div className="w-full h-full flex justify-center ml-96 items-center"><CirclesWithBar height="300" width="300" color="darkgreen" ariaLabel="loading" /></div> : 
            HomeToggled ? <Body Token={token} /> : LibraryToggled ? <Library Token={token} /> : SearchToggled ? <Search /> : ""
          }
        </main>
      </div>    
      <Footer/>
    </div>
  )
}
export default Home

/*import React, {useState} from "react";
import NavBar from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const token = window.localStorage.getItem("token")
  

const Home = () => {
  
  const [search, setSearch] = useState<boolean>(false)
  const RecentActivity = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const SearchArtists = await axios.get("https://api.spotify.com/v1/search",{
        headers: {
          Authorization: `Bearer ${token}`
            },
            params: {
                q: 'drake',
                type: "artist"
            }
        });
      const SavedAlbums = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: 'drake',
            type: "artist"
        }
      });
      const SavedAudioBooks = await axios.get('https://api.spotify.com/v1/me/audiobooks', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      const SavedEpisodes = await axios.get('https://api.spotify.com/v1/me/episodes', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      const GetCurrenlyPlayingTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      const getRecentlyPlayedTrack = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return {
        SearchArtists: SearchArtists.data,
        SavedAlbums: SavedAlbums.data,
        SavedAudioBooks: SavedAudioBooks.data, 
        SavedEpisodes: SavedEpisodes.data,
        GetCurrenlyPlayingTrack: GetCurrenlyPlayingTrack.data,
        getRecentlyPlayedTrack: getRecentlyPlayedTrack.data,
      }
    },
    enabled: search
  })

  
    return(
      <>
       
        <div className="">
          <button onClick={()=>window.localStorage.removeItem("token")}>Click Me</button>
        </div>
      </>
      );
}

export default Home*/