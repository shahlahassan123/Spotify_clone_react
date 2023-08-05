 import axios from 'axios';
 import React from 'react'
 import { useEffect } from 'react';
 import styled from 'styled-components'
 import { REDUCER_CASES } from '../utils/Constants';
 import { useStateProvider } from '../utils/StateProvider';
 import { AiFillClockCircle } from "react-icons/ai";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylist, selectedPlaylistID }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      console.log("i", token)
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistID}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0]?.url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: REDUCER_CASES.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistID]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    console.log("p", token)
    console.log("p", context_uri)
    try{
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 204) {
        const currentPlaying = {
          id,
          name,
          artists,
          image,
        };
        dispatch({ type: REDUCER_CASES.SET_PLAYING, currentPlaying });
        dispatch({ type: REDUCER_CASES.SET_PLAYER_STATE, playerState: true });
      } else {
        dispatch({ type: REDUCER_CASES.SET_PLAYER_STATE, playerState: true });
      }

    }catch(err){
      console.log(err)
    }
   
  };
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
    
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;



// import axios from 'axios';
// import React from 'react'
// import { useEffect } from 'react';
// import styled from 'styled-components'
// import { REDUCER_CASES } from '../utils/Constants';
// import { useStateProvider } from '../utils/StateProvider';
// import { AiFillClockCircle } from "react-icons/ai";

// const Body = () => {

//   const [{token,selectedPlaylist, selectedPlaylistID}, dispatch] = useStateProvider();

//   useEffect(()=>{
//     const getInitialPlaylists = async() =>{
//       const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistID}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       })
//       console.log("Se", response.data)
//       const selectedPlaylist = {
//         id : response.data.id,
//         name : response.data.name,
//         image : response.data.images[0].url,
//         tracks : response.data.tracks.items.map(({track})=>({
//           id : track.id,
//           name: track.name,
//           artists : track.artists.map((artist)=>artist.name),
//           album : track.album.name,
//           context_uri : track.album.uri,
//           track_number : track.track_number,
//           image : track.album.images[0].url,
//           duration: track.duration_ms,
//         }))
//       }  
//      dispatch({type: REDUCER_CASES.SET_PLAYLIST, selectedPlaylist})

//     }
//     getInitialPlaylists()
//   },[token,dispatch, selectedPlaylistID])

//   const mstoMinandSec = duration =>{
//     var min = Math.floor(duration/60000);
//     var sec = Math.floor((duration%6000)/1000).toFixed(0);
//     return min + ":" + (sec < 10 ? "0" : "") + sec
//   }

//   const playTrack = async({id,name, album,context_uri,artists,track_number, image, duration}) =>{
//     console.log("uri", context_uri)
//     console.log("token", token)
//     const response = await axios.put(
//       `https://api.spotify.com/v1/me/player/play`,
//       {
//         context_uri,
//         offset: {
//           position: track_number - 1,
//         },
//         position_ms: 0,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//           Accept: 'application/json',
//         },
//       }
//     );
//     console.log("current playing res", response)

//     if(response.status ===204){
//       const currentPlaying = {id, name, album, image, artists}
//       dispatch({type: REDUCER_CASES.SET_PLAYING, currentPlaying})
//       dispatch({type:REDUCER_CASES.SET_PLAYING_STATE, playerState : true})
//     }else{
//       dispatch({type:REDUCER_CASES.SET_PLAYING_STATE, playerState : true})
//     }

//   }


//   return (
//     <Container>
//        {selectedPlaylist &&
//        <>
//           <div className="playlists">
//             <div className="image">
//               <img src={selectedPlaylist.image} alt='selected playlist'></img>
//             </div>
//             <div className="details">
//               <span className='type'>PLAYLISTS</span>
//               <h1 className='title'>{selectedPlaylist.name}</h1>
//             </div>
//           </div>
//           <div className="list">
//             <div className="header_row">
//               <div className="col">
//                 <span>#</span>
//               </div>
//               <div className="col">
//                 <span>TITLE</span>
//               </div>
//               <div className="col">
//                 <span>ALBUM</span>
//               </div>
//               <div className="col">
//                 <span><AiFillClockCircle/></span>
//               </div>
//             </div>
//             <div className="tracks">
//               {selectedPlaylist.tracks.map(({id,name, album,context_uri,artists,track_number, image, duration}, index)=>{
//                 return(
//                   <div className="row" key={id} onClick={()=>playTrack({id,name, album,context_uri,artists,track_number, image, duration})}>
//                     <div className="col">
//                       <span>{index + 1}</span>
//                     </div>
//                     <div className="col detail">
//                       <div className="image">
//                         <img src={image} alt='image'></img>
//                       </div>
//                       <div className="info">
//                         <span>{name}</span>
//                         <span>{artists}</span>
//                       </div>
//                     </div>
                    
//                     <div className="album">
//                       <span>{album}</span>
//                     </div>
//                     <div className="col">
//                       <span>{mstoMinandSec(duration)}</span>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>

//           </div>

//         </>

//       }

//     </Container>
//   )
// }

// export default Body

// const Container = styled.div`
//   .playlists {
//     margin: 0 2rem;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     .image {
//       img {
//         height: 15rem;
//         box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
//       }
//     }
//     .details {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       color: #e0dede;
//       .title {
//         color: white;
//         font-size: 4rem;
//       }
//     }
//   }
//   .list {
//     .header_row{
//       display: grid;
//       grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
//       margin: 1rem 0 0 0;
//       color: #dddcdc;
//       position: sticky;
//       top: 15vh;
//       padding: 1rem 3rem;
//       transition: 0.3s ease-in-out;
     
//     }
//     .tracks {
//       margin: 0 2rem;
//       display: flex;
//       flex-direction: column;
//       margin-bottom: 5rem;
//       .row {
//         padding: 0.5rem 1rem;
//         display: grid;
//         grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
//         &:hover {
//           background-color: rgba(0, 0, 0, 0.7);
//         }
//         .col {
//           display: flex;
//           align-items: center;
//           color: #dddcdc;
//           img {
//             height: 40px;
//             width: 40px;
//           }
//         }
//         .detail {
//           display: flex;
//           gap: 1rem;
//           .info {
//             display: flex;
//             flex-direction: column;
//           }
//         }
//       }
//     }
//   }
// `;