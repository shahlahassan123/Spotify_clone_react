import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { REDUCER_CASES } from "../utils/Constants";
export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: REDUCER_CASES.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: REDUCER_CASES.SET_PLAYING, currentPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
        padding-bottom : 3rem
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;


// import axios from 'axios';
// import React from 'react'
// import { useEffect } from 'react';
// import { REDUCER_CASES } from '../utils/Constants';
// import { useStateProvider } from '../utils/StateProvider'
// import styled from 'styled-components';


// const CurrentTrack = () => {
//     const [{token, currentPlaying}, dispatch] = useStateProvider();
//     useEffect(()=>{
//         const getCurrentTrack = async() =>{
//             const response = await axios.get( "https://api.spotify.com/v1/me/player/currently-playing",{
//                 headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type" : "application/json"
//             }}
//             )
        
//             if(response.data !== ""){
//                 const currentPlaying = {
//                     id: response.data.item.id,
//                     name: response.data.item.name,
//                     artists: response.data.item.artists.map((artist)=>artist.name),
//                     image : response.data.item.album.images[0]?.url
//                 }
//                 dispatch({type: REDUCER_CASES.SET_PLAYING,currentPlaying : currentPlaying })
//             }else{
//                 dispatch({type: REDUCER_CASES.SET_PLAYING,currentPlaying : null })
//             }

//         }
//         getCurrentTrack()
//     },[token,dispatch,currentPlaying])

//     console.log("Track current", currentPlaying)
//   return (
//     <Container>
//         {currentPlaying && 
//         (
//             <div className="track">
//                 <div className="track_image">
//                     <img src={currentPlaying.image} alt="track" />
//                 </div>
//                 <div className="track_info">
//                     <h4 className="track_info_track_name">{currentPlaying.name}</h4>
//                     <h6 className="track_info_track_artists">{currentPlaying.artists.join(' , ')}</h6>
//                 </div>
//             </div>
//         )
//         }

      
//     </Container>
//   )
// }

// export default CurrentTrack

// const Container = styled.div`
// .track {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     &__image {
//     }
//     &__info {
//       display: flex;
//       flex-direction: column;
//       gap: 0.3rem;
//       &__track__name {
//         color: white;
//       }
//       &__track__artists {
//         color: #b3b3b3;
//       }
//     }
//   }

// `
