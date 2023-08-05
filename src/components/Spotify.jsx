import React from 'react'
import styled from 'styled-components'
import SideBar from './SideBar'
import NavBar from './NavBar'
import Body from './Body'
import Footer from './Footer'

const Spotify = () => {
  return (
    <Container>
          <div className="spotify_body">
              <SideBar />
              <div className="body">
                  <NavBar />
                  <div className="body_contents">
                      <Body />
                  </div>
              </div>
          </div>
          <div className="spotify_footer">
              <Footer />
          </div>
    </Container>
  )
}

export default Spotify

const Container = styled.div`
width : 100vw;
height : 100vh;
display: grid;
grid-template-rows: 85vh 15vh;
overflow: hidden;
.spotify_body{
    height: 100%;
    display: grid;
    grid-template-columns: 25vw 75vw;
    width : 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body{
        height: 100%;
        width: 100%;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 0.7rem;
            max-height: 2rem;
            &-thumb{
                background-color: rgba(255, 255, 255, 0.6);
            }
        } 
    }
}

`

// const Container = styled.div`
//   max-width: 100vw;
//   max-height: 100vh;
//   overflow: hidden;
//   display: grid;
//   grid-template-rows: 85vh 15vh;
//   .spotify_body {
//     display: grid;
//     grid-template-columns: 15vw 85vw;
//     height: 100%;
//     width: 100%;
//     background: linear-gradient(transparent, rgba(0, 0, 0, 1));
//     background-color: rgb(32, 87, 100);
//     .body {
//       height: 100%;
//       width: 100%;
//       overflow: auto;
//       &::-webkit-scrollbar {
//         width: 0.7rem;
//         max-height: 2rem;
//         &-thumb {
//           background-color: rgba(255, 255, 255, 0.6);
//         }
//       }
//     }
//   }
// `;