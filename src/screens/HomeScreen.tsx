import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { Movie } from '../interfaces/movieInterface';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBg } from '../components/GradientBg';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';

const windowWidth = Dimensions.get('window').width;
// const itemHeight = Dimensions.get('window').height;

export const HomeScreen = () => {

    const { isLoading, nowPlaying, popular, topRated, upcoming } = useMovies();
    const { top } = useSafeAreaInsets();

    const { setMainColors } = useContext(GradientContext);

    const getMovieColors = async (index: number) => {
        const movie = nowPlaying[ index ];
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

        const [ primary = 'green', secondary = 'orange' ] = await getImageColors(uri);

        setMainColors({ primary, secondary })
    }

    useEffect(() => {
        if( nowPlaying.length > 0 ) {
            getMovieColors(0);
        }
    }, [ nowPlaying ])

    if (isLoading) {
        return (
            <View style={ { flex: 1, justifyContent: 'center', alignContent: 'center' } }>
                <ActivityIndicator color="#3490dc" size={ 60 } />
            </View>

        )
    }

    return (
        <GradientBg>
            <ScrollView>
                <View style={ { marginTop: top + 20 } }>
                    {/* <MovieCard movie={ moviesNowPlaying[ 0 ] } /> */ }

                    {/* Main carousel */ }
                    <View style={ { height: 440 } }>
                        <Carousel
                            data={ nowPlaying }
                            renderItem={ ({ item }: any) => <MovieCard movie={ item } /> }
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }

                            // itemHeight={ 300 }
                            inactiveSlideOpacity={ 0.8 }
                            onSnapToItem={ index => getMovieColors(index) }

                            // decelerationRate={'fast'}
                        />
                    </View>

                    {/* Popular movies */ }
                    <HorizontalSlider
                        title="Popular movies"
                        movies={ popular }
                    />

                    {/* Top rated movies */ }
                    <HorizontalSlider
                        title="Top rated movies"
                        movies={ topRated }
                    />

                    {/* Upcoming movies */ }
                    <HorizontalSlider
                        title="Upcoming movies"
                        movies={ upcoming }
                    />

                </View>
            </ScrollView>
        </GradientBg>
    );
}

const styles = StyleSheet.create({
});