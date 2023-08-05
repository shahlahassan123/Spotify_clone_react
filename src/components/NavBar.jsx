import React from 'react'
import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from '../utils/StateProvider';

const NavBar = () => {
  const [{userInfo}] = useStateProvider()
  return (
    <Container>
      <div className="search">
      <FaSearch />
        <input type='text' placeholder='Artists, Songs or Podocasts'></input>
      </div>
      <div className="user_profile">
        <a href={userInfo?.user_url}>
        <CgProfile />
       <span>{userInfo?.name}</span>
        </a>
       
      </div>
      

      
    </Container>
  )
}

export default NavBar


// const Container = styled.div`
// display: flex;
// align-items: center;
// ustify-content: space-between;
// height: 15vh;
// padding: 2rem;
// position:sticky;
// gap:1rem;
// top:0;
// .search{
//   display: flex;
//   gap:1rem;
//   width: 100%;
//   background-color: white;
//   padding: 1rem;
//   border-radius : 5rem;
//   input{
//     width:100%;
//     border:none;
//     &:focus{
//       outline:none;
//     }
//   }
// }
// .user_profile{
// padding:1rem;
// display: flex;
// align-items: center;
// ustify-content: center;
// background-color: black;
// a{
//   text-decoration: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 0.5rem;
//   color: white;
//   font-weight: bold
//   svg {
//     font-size: 1.3rem;
//     background-color: #282828;
//     padding: 0.2rem;
//     border-radius: 1rem;
//     color: #c7c5c5;
//   }
//  }
// }

// `

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
 
  .search {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .user_profile {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;