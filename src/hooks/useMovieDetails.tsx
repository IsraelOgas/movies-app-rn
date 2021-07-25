import { useEffect, useState } from "react"
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';
import movieDB from "../api/movieDB";

interface MovieDetails {
    isLoading: boolean,
    movieFull?: MovieFull,
    cast: Cast[],
}

export const useMovieDetails = (movieId: number) => {

    const [ movieDetails, setMovieDetails ] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: [],
    });

    const getMovieDetails = async () => {
        const movieDetailsPromise = movieDB.get<MovieFull>(`/${ movieId }`);
        const castPromise = movieDB.get<CreditsResponse>(`/${ movieId }/credits`);
        
        const [ movieDetailsResponse, castPromiseResponse ] = await Promise.all([ movieDetailsPromise, castPromise ]);
    
        setMovieDetails({
            isLoading: false,
            movieFull: movieDetailsResponse.data,
            cast: castPromiseResponse.data.cast
        })
    }
    
    useEffect(() => {
        getMovieDetails();
    }, [])

    return {
        ...movieDetails,
    }
}