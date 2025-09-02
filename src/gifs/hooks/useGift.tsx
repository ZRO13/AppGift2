import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

// const gifsCache:Record<string,Gif[]>={};
const useGift = () => {
      const [gifs, setGifs] = useState<Gif[]>([]);
      const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const gifsCache=useRef<Record<string,Gif[]>>(
        {}
    )
      const handleTermClicked = async(term: string) => {
        if(gifsCache.current[term]){
            setGifs(gifsCache.current[term])
            return;
        }
        setGifs(await getGifsByQuery(term))
      };
    
      const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase();
        if(gifsCache.current[query]){
            setGifs(gifsCache.current[query])
            return;
        }
    
        if (query.length === 0) return;
    
        if (previousTerms.includes(query)) return;
    
        setPreviousTerms([query, ...previousTerms].splice(0, 8));
    
        const gifs = await getGifsByQuery(query);
        setGifs(gifs);
        gifsCache.current[query]=gifs;
      };
  return {
    gifs,handleSearch,handleTermClicked,previousTerms
  
  }
}

export default useGift