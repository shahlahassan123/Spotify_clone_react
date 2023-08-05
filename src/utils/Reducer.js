import {REDUCER_CASES} from './Constants.js'

export const initialState = {
    token : null,
    playlists : [],
    userInfo : null,
    selectedPlaylist: null,
    selectedPlaylistID : "0yAK62quApmpcRcUeWKica",
    playerState: false,
    currentPlaying: null

}

const reducer = (state, action) =>{
    switch(action.type){
        case REDUCER_CASES.SET_TOKEN : 
           return {
            ...state,
            token: action.token
           };
        case REDUCER_CASES.SET_PLAYLISTS : 
           return {
            ...state,
            playlists: action.playlists
           };
        case REDUCER_CASES.SET_PLAYLIST_ID : 
           return {
            ...state,
            selectedPlaylistID: action.selectedPlaylistID
           };
        case REDUCER_CASES.SET_PLAYLIST : 
           return {
            ...state,
            selectedPlaylist: action.selectedPlaylist
           };
        case REDUCER_CASES.SET_PLAYING : 
           return {
            ...state,
            currentPlaying: action.currentPlaying
           };
        case REDUCER_CASES.SET_PLAYING_STATE : 
           return {
            ...state,
            playerState: action.playerState
           };

        default:
           return state
    }
}

export default reducer