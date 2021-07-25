import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { Movie } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen = ({ route, navigation }: Props) => {
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

    return (
        <ScrollView>
            <View style={ styles.imageContainer }>

                <View style={ styles.imageBorder }>
                    <Image
                        source={ { uri } }
                        style={ styles.cardImage }
                    />
                </View>
            </View>

            <View style={ styles.marginContainer }>
                <Text style={ styles.subtitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>

            {
                isLoading
                    ? <ActivityIndicator size={ 60 } color="#3490dc" style={ { marginTop: 20 } } />
                    : <MovieDetails movieFull={ movieFull! } cast={ cast } />
            }
            {/* <Icon name="star-outline" color="grey" size={ 20 }/> */ }

            {/* Button to close */ }
            <View style={ styles.backButton }>
                <TouchableOpacity
                    onPress={ () => navigation.pop() }
                >
                    <Icon
                        color="white"
                        size={ 50 }
                        name="arrow-back-outline"
                        style={ styles.shadow }
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        // overflow: 'hidden',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 8,

        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'blue',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
    },
    cardImage: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, .5)'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 10,
        left: 5
    },
    shadow: {
        shadowOpacity: 2,
        textShadowRadius: 15,
        textShadowOffset:{width: 3,height: 2}
    }
});