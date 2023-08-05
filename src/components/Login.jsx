import React from 'react'
import styled from 'styled-components'

export default function  Login() {

  const handleClick = async () => {
    const clientID = "c4184d8d62014a04b6827afc17d64f1a";
    const redirectURI = "http://127.0.0.1:5173/";
    const apiURL = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = 
    `${apiURL}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  }



  return (
    
    <Container>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png' alt='Spotify Logo'></img>
        <button onClick={handleClick}>Connect Spotify</button>   
    </Container>
  )
}




const Container = styled.div`
display : flex;
justify-content : center;
align-items : center;
background-color: #1db954;
height : 100vh;
width : 100vw;
flex-direction : column;
gap: 5rem;
img{
  height: 20vh;
}
button{
  background-color: black;
  color: #49f585;
  padding: 1rem 2rem;
  border:none;
  border-radius: 5rem;
  cursor : pointer;
  font-size: 1.5rem;
}
`