import React, { useState, useEffect } from "react";

export default function Login() {
  const handleClick = async () => {
    const CLIENT_ID: string = "96c7ad0a510345c08e3845ef1fb6db3f";
    const CLIENT_SECRET: string = "57db9cd70bf9498b9b1aa6e0dcf730e5";
    const REDIRECT_URI: string = "http://localhost:3000"
    const AUTH_ENDPOINT: string = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE: string = "token"
    const SCOPE: string = "user-read-email user-read-private user-library-read user-read-playback-position user-read-recently-played user-read-currently-playing user-top-read user-modify-playback-state user-read-playback-state"
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
  };
  const [token, setToken]= useState<string>("")
  useEffect(()=>{
      const hash: string = window.location.hash
      let token: any | string = window.localStorage.getItem("token")
      if(!token && hash) {
          token = hash.split('#')[1].split('=')[1]
          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }
      setToken(token)
  }, [])
  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen bg-green-600 gap-20">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
        className="h-32"
      />
      <button onClick={handleClick} className="py-4 px-20 text-green-600 bg-black rounded-3xl font-bold hover:-translate-y-1">Connect Spotify</button>
    </div>
  );
}


/*import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axios from "axios";
//list recent activities
//fetch and display the recent activities of the connected user, activities may include provide options to filter played tracks, playlists, tic... DONE
//provide options to filter and sort recent activities DONE
//search and filter recent activities DONE 
//allow users to search for tracks and playlists DONE
//implement filtering options to refine search based on various criteria (artist, album, duration)
//stream a selected track
//pleay and stream a selected track

const CLIENT_ID: string = "96c7ad0a510345c08e3845ef1fb6db3f";
const CLIENT_SECRET: string = "57db9cd70bf9498b9b1aa6e0dcf730e5";
const REDIRECT_URI: string = "http://localhost:3000"
const AUTH_ENDPOINT: string = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE: string = "token"
const SCOPE: string = "user-read-email user-read-private user-library-read user-read-playback-position user-read-recently-played user-read-currently-playing"

const Login = () => {

    const [token, setToken]= useState<string>("")
    useEffect(()=>{
        const hash: string = window.location.hash
        let token: any | string = window.localStorage.getItem("token")
        if(!token && hash) {
            token = hash.split('#')[1].split('=')[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])
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
    const [tracks, setTracks] = useState(false)
    const SearchTracks = useQuery({
      queryKey: ["search-tracks"],
      queryFn: async () => {
        return await axios.get('https://api.spotify.com/v1/me/tracks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) 
      },
      enabled: tracks
    })
    const getFeaturedPlaylist = useQuery({
      queryKey: ["featured-playlists"],
      queryFn: async () => {
        return await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      },
      enabled: tracks
    })
    const getMyPlaylists = useQuery({
      queryKey: ["my-plalists"],
      queryFn: async () => {
        return await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      },
      enabled: tracks
    })
    console.log(getMyPlaylists.data)
    //-> get user playlists
    //get saved tracks
    if(RecentActivity.isLoading && search) return <h1>Loading data</h1>
    if(RecentActivity.error && search ) return <h1>Error</h1>

    console.log(RecentActivity)

    const Logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return (
        <div className="flex justify-center items-center flex-col gap-11">
            <a href={} className="flex-1 text-blue">Login to spotify</a>
            {token ? <button onClick={()=>setSearch(true)} className="p-3 rounded-lg bg-slate-900 text-white w-32">Search</button> : <h1>Please Login</h1>}
            <button onClick={Logout} className="p-3 bg-slate-600 active:bg-slate-400">Logout</button>
            <button onClick={()=>setTracks(true)} className="p-3 bg-slate-600 active:bg-slate-400">get tracks</button>

        </div>
    );
};

export default Login;


/*const queryKeys = [
  ["recent-activity", "artists"],
  ["recent-activity", "saved-albums"],
  ["recent-activity", "saved-audiobooks"],
  ["recent-activity", "saved-episodes"],
  ["recent-activity", "currently-playing"],
  ["recent-activity", "recently-played"],
  ["recent-activity", "queue"],
];
You would then pass the queryKeys array to the multiQuery option of the useQuery function. For example:

const SearchArtists: any = useQuery({
  queryKey: queryKeys,
  queryFn: async ({ queryKey }) => {
    switch (queryKey[1]) {
      case "artists":
        return await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            q: 'drake',
            type: "artist"
          }
        });
      case "saved-albums":
        return await axios.get("https://api.spotify.com/v1/me/albums", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      case "saved-audiobooks":
        return await axios.get('https://api.spotify.com/v1/me/audiobooks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      case "saved-episodes":
        return await axios.get('https://api.spotify.com/v1/me/episodes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      case "currently-playing":
        return await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      case "recently-played":
        return await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      case "queue":
        return await axios.get('https://api.spotify.com/v1/me/player/queue', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      default:
        return null;
    }
  },
});
The useQuery function will then execute all of the queries and return the results in an object, where the keys of the object are the query keys and the values of the object are the results of the queries.

You can then access the results of the queries using the SearchArtists.data object. For example:

const artistsData = SearchArtists.data.recent-activity.artists;
const savedAlbumsData = SearchArtists.data.recent-activity["saved-albums"];
const savedAudioBooksData = SearchArtists.data.recent-activity["saved-audiobooks"];
const savedEpisodesData = SearchArtists.data.recent-activity["saved-episodes"];
const currentPlayingTrackData = SearchArtists.data.recent-activity["currently-playing"];
const recentlyPlayedTracksData = SearchArtists.data.recent-activity["recently-played"];
const queueData = SearchArtists.data.recent-activity["queue"]; */


/*const SearchArtists: any =  useQuery({
        queryKey:["recent-activity"],
        queryFn: async () => {return await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: 'drake',
                type: "artist"
            }
        })},
        enabled: search
    })
    
    //Recent activity: 
    //-> get saved albums
    const SavedAlbums: any = useQuery({
        queryKey: ["recent-activity", "albums"],
        queryFn: async () => {
            return await axios.get("https://api.spotify.com/v1/me/albums", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        enabled: search
    })
    console.log(SavedAlbums.data)
    //-> get saved audiobooks
    const savedAudioBooks: any = useQuery({
        queryKey: ["recent-activity"],
        queryFn: async () => {
            return await axios.get('https://api.spotify.com/v1/me/audiobooks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        enabled: search
    })
    //-> get saved episodes
    const SavedEpisodes: any = useQuery({
        queryKey: ["recent-activity"],
        queryFn: async () => {
            return await axios.get('https://api.spotify.com/v1/me/episodes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        enabled: search
    })
    //-> get currently playing track
    const GetCurrentlyPlayingTrack: any = useQuery({
        queryKey: ["recent-activity"],
        queryFn: async () => {
            return await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        enabled: search
    })
    //-> get recently played tracks
    const GetRecentlyPlayedTrack: any = useQuery({
        queryKey: ["recent-activity"],
        queryFn: async () => {
            return await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        enabled: search
    })
    
    //-> get user queue
    const GetQueue: any = useQuery({
        queryKey: ["recent-activity"],
        queryFn: async () => {
            return await axios.get('https://api.spotify.com/v1/me/player/queue', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        enabled: search
    })  */