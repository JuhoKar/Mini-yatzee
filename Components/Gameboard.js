import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default Gameboard = ( {route} ) => {

    const {playerName, SetPlayerName} = useState('');

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            SetPlayerName(route.params.player);
        }
    }, []);

    return (
        <View>
            <Text>
            Gameboard will be here...
            </Text>
            <Text>Player: {playerName}</Text>
        </View>
    )
}