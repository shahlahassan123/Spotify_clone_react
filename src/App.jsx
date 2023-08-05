import { useEffect } from 'react'
import Login from './components/Login'
import { useStateProvider } from './utils/StateProvider'
import {REDUCER_CASES} from './utils/Constants'
import Spotify from './components/Spotify'

function App() {

  const [{token}, dispatch] = useStateProvider()

  useEffect(()=>{
    const hash = window.location.hash;
    // console.log("HASH", hash)
    if(hash){
      const token = hash.split('&')[0].split('=')[1]
      if(token){
        dispatch({type: REDUCER_CASES.SET_TOKEN, token })
      }
    }
    document.title='Spotify'
  }, [dispatch, token])


  return (
    <>
    {token ? <Spotify />: <Login />}
    
    </>
  )
}

export default App
