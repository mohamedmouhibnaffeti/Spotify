import React from 'react';
import podcasbt from "../Assets/images/podcast.png";

const Search = () => {
    const podcasts = [
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(16 185 129)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(124 58 237)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(219 39 119)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(8 145 178)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(239 68 68)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(8 145 178)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(239 68 68)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(239 68 68)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(239 68 68)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(239 68 68)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(239 68 68)',
        },
        {
          title: 'PodCasts',
          backgroundColor: 'rgb(239 62 68)',
        },
      ];
      

    return (
        <div id="app" style={{ height: "100vh", display: "flex" }}>
            <main className="ml-4 mt-5 flex gap-9 flex-wrap">
                {podcasts.map((podcast, index) => (
                    <div className="block w-[13rem] h-[14rem]  rounded-lg overflow-hidden" style={{ backgroundColor: podcast.backgroundColor }} key={index}>
                        <div className=" px-6 py-3 font-bold text-white">
                            {podcast.title}
                        </div>

                        <img className="rotate-45 mt-24 ml-32" src={podcasbt} alt="" style={{ width: "200px", height: "130px" }} />
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Search;