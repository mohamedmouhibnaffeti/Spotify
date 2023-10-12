import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Library = (props) => {
    const token = props.Token
    const RecentActivity = useQuery({
        queryKey: ["recent-activity"],
        queryFn: async () => {
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
            SavedAlbums: SavedAlbums.data,
            SavedAudioBooks: SavedAudioBooks.data, 
            SavedEpisodes: SavedEpisodes.data,
            GetCurrenlyPlayingTrack: GetCurrenlyPlayingTrack.data,
            getRecentlyPlayedTrack: getRecentlyPlayedTrack.data,
          }
        }
      })
      const [RecentlyPlayed, setRecentlyPLayed] = useState<[]>() 
      function msToMinutesAndSeconds(ms: number) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
      
        // Pad the minutes and seconds with leading zeros if necessary.
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      
        // Return the string of minutes and seconds.
        return `${paddedMinutes}:${paddedSeconds}`;
      }
      
      useEffect(()=>{
        if(!RecentActivity.isLoading && !RecentActivity.error){
            setRecentlyPLayed(RecentActivity.data?.getRecentlyPlayedTrack.items)
        }
      }, [RecentActivity.data?.getRecentlyPlayedTrack])
      console.log(RecentlyPlayed)
    return (
        <div className="flex flex-col mt-5 ml-7 w-[77vw] py-5 overflow-y-scroll no-scrollbar">
            <div className="flex justify-between  flex-col p-2 gap-2">
                <p className="text-white font-bold text-3xl">Recently Played</p>
            </div>
            <div className="flex flex-wrap gap-4">
  {RecentlyPlayed && RecentlyPlayed.map((item: any) => (
    <div
      className="mt-9 ml-52 bg-slate-900 border  border-gray-200 rounded-lg flex items-center shadow h-[8vh] w-[100vh] hover:bg-gray-800 cursor-pointer">
      <div className="flex flex-row p-2 justify-center items-center gap-16">
        <a href="#" className="flex justify-center items-center gap-16">
          <h4 className=" text-md font-bold tracking-tight text-gray-900 dark:text-white">
            (Title) {item.track.name}
          </h4>
          <h5 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            (Author) {item.track.artists[0].name}
          </h5>
        </a>
        <p className=" text-gray-500 text-sm">(Popularity) {item.track.popularity}</p>
        <p className=" text-gray-500 text-sm">(Track) {item.track.track_number}</p>
        <p className=" text-gray-500 text-sm ">(duration) {msToMinutesAndSeconds(item.track.duration_ms)}</p>
      </div>
    </div>
  ))}

      </div>
        </div>
    )
}

export default Library