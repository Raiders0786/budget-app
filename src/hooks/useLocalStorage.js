
import { useState,useEffect } from 'react';

export default function useLocalStorage(key, defaultValue){
    const [value,setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        if(typeof jsonValue === "function"){
            return defaultValue()
        }else{
            return defaultValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    })

    return [value,setValue]
}