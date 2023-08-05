import axios from 'axios';
import React from 'react'
import styled from'styled-components';
import { useStateProvider } from '../utils/StateProvider';

const Volume = () => {
    const [{token}] = useStateProvider()

    const changeVolume = async (e) => {
        await axios.put("https://api.spotify.com/v1/me/player/volume",
            {},
            {
                params: {
                    volume_percent: parseInt(e.target.value)
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
        )
    }

  return (
    <Container>
      <input type='range' min={0} max={100} onMouseUp={e=>changeVolume(e)}></input>
    </Container>
  )
}

export default Volume

const Container = styled.div`
display: flex;
justify-content : center;
align-items: center;

input{
    border-radius: 2rem;
    height: 0.5rem
}
`
