import React, { useState, useEffect } from "react";
import { AiFillClockCircle } from 'react-icons/ai'
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
type PLAYLIST = {
    id: string,
    name: string,
    description: string,
    image: string,
    tracks: [{
        id: string,
        name: string,
        artists: string,
        image: string,
        duration: number,
        album: string,
        context_uri: string,
        track_number: number
    }]
}

const cleanData = (items: any) => {
    const cleanedData: any[] = [];
  
    for (const item of items) {
      const cleanedItem = {
        image: item.images[0].url,
        name: item.name,
        id: item.id,
        type: item.type,
        tracks: item.total_tracks,
        author: item.artists[0].name,
      };
  
      cleanedData.push(cleanedItem);
    }
  
    return cleanedData;
  };
  

const Body = (props: any) => {
    const [showAll, collapse] = useState({str: 'Show All', val: 10 })
    const token = props.Token
    const selectedPlaylist = "2WYviYF0npUhFNYrJqKo3r"
    const [playlist, setPlaylist] = useState<PLAYLIST>()
    const [newAlbumReleases, setNewAlbumReleases] = useState<any>()
    const AlbumReleases = useQuery({
        queryKey: ["album-releases"],
        queryFn: async () => {
            return await axios.get('https://api.spotify.com/v1/browse/new-releases', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })
    console.log('new: ', JSON.stringify(AlbumReleases))
    const Playlist = useQuery({
        queryKey: ["initialPlaylist"],
        queryFn: async () => {
            return await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylist}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })
    
    useEffect(()=>{
        if(!Playlist.isLoading && !Playlist.error && Playlist.data){
            setPlaylist({
                id: Playlist.data.data.id,
                name: Playlist.data.data.name,
                description: Playlist.data.data.description,
                image: Playlist.data.data.images[0].url,
                tracks: Playlist.data.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist: any) => artist.name),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    track_number: track.track_number,
                  })),
            })
        }
            if(!AlbumReleases.isLoading && !AlbumReleases.error){setNewAlbumReleases(cleanData(AlbumReleases.data?.data.albums.items))}
        }, [Playlist.data, AlbumReleases.data])
    const Genre = useQuery({
        queryKey: ["Genre"],
        queryFn: async () => {
            return await axios.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })
    const Recommondations = useQuery({
        queryKey: ["Genre"],
        queryFn: async () => {
            return await axios.get(`https://api.spotify.com/v1/recommendations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
                    seed_genres: 'classical,country',
                    seed_tracks: '0c6xIDDpzE81m2q797ordA'
                }
            })
        }
    })
    console.log("Recommondations: ", Recommondations)
    
    return (
        <div className="flex flex-col mt-5 ml-24 w-[77vw] py-5 overflow-y-scroll no-scrollbar">
            <div className="flex justify-between">
                <p className="text-white font-bold text-3xl">New Album Releases</p>
                <p className="text-gray-400 mr-16 translate-y-3 text-lg cursor-pointer" onClick={()=>{showAll.str === "Collapse" ? collapse({str: 'Show All', val: 10})  : collapse({str: 'Collapse', val: newAlbumReleases.length}) }}>{showAll.str}</p>
            </div>
            <div className="flex flex-wrap gap-14 ">
            {newAlbumReleases && newAlbumReleases.slice(0, showAll.val).map((album: any)=>(
                <div className="mt-9 bg-black border border-gray-200 rounded-lg flex justify-center flex-col items-center shadow w-[12vw] h-[35vh]  hover:bg-gray-800 cursor-pointer">
                    <a href="#">
                        <img className="rounded-t w-40 h-22 py-2 " src={album.image} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h4 className=" text-md font-bold tracking-tight text-gray-900 dark:text-white">{album.author}</h4>
                            <h5 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">{album.name}</h5>
                        </a>
                        <p className=" text-gray-500 text-sm">{album.tracks} Tracks</p>
                    
                    </div>
            </div>
            ))}        
            
      </div>
        </div>
        
    )
}
export default Body