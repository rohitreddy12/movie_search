import { useEffect, useState } from "react";

export const useDebounce = (value:string,delay:number) => {
    const [debouncedSearch,setDebouncedSearch]=useState<string>('')
    
       
    useEffect( 
        () => {
            const timeoutId=setTimeout(() => {
                setDebouncedSearch(value)
            }, delay);
            return () => clearTimeout(timeoutId)
        } ,[value]        
    )
    return debouncedSearch;


}