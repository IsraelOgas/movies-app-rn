import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';

import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull,
    cast: Cast[],
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <View>
            <View style={ { marginHorizontal: 20 } }>
                <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                    <Icon name="star-outline" color="grey" size={ 16 } />

                    <Text style={ { marginLeft: 3 } }>{ movieFull.vote_average }</Text>

                    <Text style={ { marginLeft: 5 } }>
                        - { movieFull.genres.map(g => g.name).join(', ') }
                    </Text>
                </View>


                <Text style={ { marginTop: 10, fontSize: 20, fontWeight: 'bold' } }>
                    Overview
                </Text>
                <Text style={ { fontSize: 14, textAlign: 'justify', color: 'rgba(0, 0, 0, 0.6)' } }>
                    { movieFull.overview }
                </Text>

                <Text style={ { marginTop: 10, fontSize: 20, fontWeight: 'bold' } }>
                    Budge
                </Text>
                <Text style={ { fontSize: 14, textAlign: 'justify', color: 'rgba(0, 0, 0, 0.6)' } }>
                    { currencyFormatter.format(movieFull.budget, { code: 'USD' }) }
                </Text>

            </View>
            {/* Casting */ }
            <View style={ { marginTop: 10, marginBottom: 50, marginLeft: 20, } }>
                <Text style={ { fontSize: 20, fontWeight: 'bold' } }>
                    Actors
                </Text>
                <FlatList
                    data={ cast }
                    keyExtractor={ (item) => item.id.toString() }
                    renderItem={ ({ item }) => <CastItem actor={ item } /> }
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    style={ { marginTop: 10 } }
                />
            </View>
        </View>
    );
}
