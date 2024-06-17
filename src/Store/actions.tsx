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
