import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditsInterface';

interface Props {
    actor: Cast
}

export const CastItem = ({ actor }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${ actor.profile_path }`;

    return (
        <View style={ styles.container }>
            {
                actor.profile_path ? (
                    <Image
                        source={ { uri } }
                        style={ { width: 70, height: 70, borderRadius: 5 } }
                    />
                )
                    :
                    <Icon name="help-circle-outline" color="rgba(0, 0, 0, 0.2)" size={ 60 } />
            }
            <View style={ styles.actorInfo }>
                <Text style={ { fontSize: 16, fontWeight: 'bold' } }>{ actor.name }</Text>
                <Text style={ { fontSize: 16, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' } }>{ actor.character }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.20,
        shadowRadius: 8,

        elevation: 2,

        marginRight: 10,
        marginBottom: 10,
        paddingRight: 10,
    },
    actorInfo: {
        marginLeft: 10
    }
});