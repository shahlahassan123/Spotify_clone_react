import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { REDUCER_CASES } from "../utils/Constants";

export default function PlayerControls() {
    const [{token, playerState}, dispatch] = useStateProvider()

    const changeState = async() =>{
        // const state = playerState ? "pause" : "play" 
        const state = playerState ? "play" : "pause" 
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
          dispatch({type: REDUCER_CASES.SET_PLAYING_STATE , playerState : !playerState})
    }

    const changeTrack = async(type) =>{
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`,{},{
            headers : {
                'Authorization': "Bearer " + token,
                "Content-Type" : "application/json"
            }
        })
        window.location.reload()
        dispatch({type: REDUCER_CASES.SET_PLAYING_STATE, playerState : true})
        const response1 = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          if (response1.data !== "") {
            const currentPlaying = {
              id: response1.data.item.id,
              name: response1.data.item.name,
              artists: response1.data.item.artists.map((artist) => artist.name),
              image: response1.data.item.album.images[2].url,
            };
            dispatch({ type: REDUCER_CASES.SET_PLAYING, currentPlaying });
          } else {
            dispatch({ type: REDUCER_CASES.SET_PLAYING, currentPlaying: null });
          }
    }

    return(
        <Container>
            <div className="shuffle">
                <BsShuffle size={24}/>
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
            </div>
            <div className="state">
                {playerState ?
                    <BsFillPlayCircleFill onClick={changeState} /> :
                    <BsFillPauseCircleFill onClick={changeState} />
                }
            </div>
            <div className="next">
                <CgPlayTrackNext  onClick={()=> changeTrack('next')}/>
            </div>
            <div className="repeat">
                <FiRepeat/>
            </div>
        </Container>
    )

}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 2rem;
svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
.state {
    svg {
      color: white;
    }
  }
.previous,
.next,
.state {
    font-size: 2rem;
  }

`