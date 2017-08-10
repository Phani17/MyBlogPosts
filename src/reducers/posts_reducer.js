import { FETCH_POSTS, FETCH_POST } from '../actions/index'
const INITIAL_STATE ={ posts:[], post:null }

//from reducer we need to have
//1. data from axios is avalable at action.payload.data
//2. reducer need to return a new object whenever we need to return our state
export default function(state=INITIAL_STATE,action){
  switch (action.type) {
    case FETCH_POSTS:
      return {...state , posts: action.payload.data }
    case FETCH_POST:
      return {...state, post:action.payload.data}
    default:
      return state
  }
}
