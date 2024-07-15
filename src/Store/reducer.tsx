
import * as actionTypes from "./actionTypes";
import { Fav } from "../interfaces";
import { combineReducers } from "redux";


interface State1{
  favourites:Fav[]
}

const favouriteState:State1 =   {
  favourites:[],
}

const favouriteReducer =  (state = favouriteState, action:any) => {
  switch (action.type) {

  case actionTypes.favouritesFetched:
    return { 
        ...state,
        favourites:action.payload
    }

  case actionTypes.favouriteAdded:
    return {
      ...state,
      favourites: [...state.favourites, action.payload]
    }

  case actionTypes.favouriteRemoved:
    const updatedFavourites = state.favourites.filter((item) => item.id !== action.payload.movieId)
    return {
      ...state,
      favourites: updatedFavourites
    }

  default:
    return state
  }
}

interface State2{
  mode:string
}

const togglemodeState: State2= {
  mode:'light'
}

 const toggleModeReducer = (state=togglemodeState,action:any) => {
  if(action.type === 'modeToggled'){
    if(state.mode === 'light'){
      return{
        ...state,
        mode:'dark'
      }
    }
    else{
      return{
        ...state,
        mode:'light'
      }
    }
  }
  return state
}

interface State3{
  userIcon:string
}

const initialusericonState:State3 = {
  userIcon:''
}
const usericonReducer = (state = initialusericonState,action:any) => {
  if(action.type === 'usericonFetched'){
    return {
      ...state,
      userIcon:action.payload
    }
  }
  return state
  
}

interface State4{
  isLoggedin:boolean
}
const initialLoginState:State4 = {
  isLoggedin: false
}

const userLoggedinReducer = (state = initialLoginState,action:any) => {
  switch(action.type){
    case actionTypes.userLoggedin:
      return{
        ...state,
        isLoggedin: true
      }
    case actionTypes.userLoggedout:
      return{
        ...state,
        isLoggedin: false
      }
    default:
      return{
        ...state
      }
  }
}
export const rootreducer = combineReducers(
  {
    favourites:favouriteReducer,
    mode:toggleModeReducer,
    userIcon:usericonReducer,
    userLogin:userLoggedinReducer
  }
)

export type RootState = ReturnType<typeof rootreducer>;