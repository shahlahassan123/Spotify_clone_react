import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { REDUCER_CASES } from '../utils/Constants';

const Playlists = () => {

    const [{token, playlists, selectedPlaylistID}, dispatch] = useStateProvider();

    useEffect(()=>{
        const getPlaylists = async() =>{
            const response = await axios.get('https://api.spotify.com/v1/me/playlists',
            {
                headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }})
            const {items} = response.data

           const playlists = items.map(({name, id}) =>{
            return {name, id}
           })
        //    console.log("playlists inside", playlists)
           dispatch({type: REDUCER_CASES.SET_PLAYLISTS, playlists})
        }
        getPlaylists()
    },[token, dispatch])

    const changeCurrentPlaylist = (selectedPlaylistID)=>{
        dispatch({type: REDUCER_CASES.SET_PLAYLIST_ID , selectedPlaylistID})

    }

    // console.log("playlists outside", playlists)
    // console.log("Selected playlists outside", selectedPlaylistID)

  return (
    <Container>
       <ul>
        {playlists.map(({name, id})=>(
            <li key={id} onClick={()=>changeCurrentPlaylist(id)}>{name}</li>
        )
        )}
       </ul>
      
    </Container>
  )
}

export default Playlists

const Container = styled.div`
color: #b3b3b3;
height: 100%;
overflow: hidden;
ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 55vh;
  max-height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.7rem;
    &-thumb {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
  li {
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
}

`