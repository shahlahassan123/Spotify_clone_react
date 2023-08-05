import React from 'react'
import styled from 'styled-components'
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from './Playlists';

const SideBar = () => {
  return (
    <Container>
        <div className="top_links">
            <div className="logo">
                <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' alt='logo'></img>
            </div>
            <ul>
                <li>
                    <MdHomeFilled />
                    <span>Home</span>
                </li>
                <li>
                    <MdSearch />
                    <span>Search</span>
                </li>
                <li>
                    <IoLibrary />
                    <span>Library</span>
                    
                </li>
            </ul>
        </div>
        
        <Playlists />
    </Container>
  )
}

export default SideBar

const Container = styled.div`
background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top_links{
    display: flex;
  flex-direction: column;
  .logo{
    text-align: center;
    margin: 1rem 0;
    img{
        max-inline-size : 80%;
        block-size : auto;
    }
  }
  ul{
    list-style: none;
    display: flex;
  flex-direction: column;
  padding: 1rem;
  gap:1rem;
  li{
    display: flex;
  flex-direction: row;
  gap:1rem;
  cursor: pointer;
  transition : 0.3s ease-in-out;
  &:hover {
    color: white
  }

  }
  }


  }
  `
