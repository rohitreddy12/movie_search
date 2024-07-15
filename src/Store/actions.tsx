import * as actionTypes from './actionTypes';
import { Fav } from "../interfaces";
 
export default function favouritesFetched(fav:Fav[]){
    return {
        type:actionTypes.favouritesFetched,
        payload:fav
    }
}

export function favouriteAdded(fav:Fav) {
    return {
        type: actionTypes.favouriteAdded,
        payload:fav
    }
 }

export function favouriteRemoved(id:string){
    return {
        type: actionTypes.favouriteRemoved,
        payload:{
            movieId: id
        }
    }
 }

export function modeToggled(){
    return{
        type: actionTypes.modeToggled
    }
}

export function usericonFetched(userIcon:string){
    return{
        type:actionTypes.usericonFetched,
        payload: userIcon
    }
}

export function userLoggedin(){
    return{
        type:actionTypes.userLoggedin
    }
}

export function userLoggedout(){
    return{
        type:actionTypes.userLoggedout
    }
}
