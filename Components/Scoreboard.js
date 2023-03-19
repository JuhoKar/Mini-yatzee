import React, {  useEffect, useState} from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCOREBOARD_KEY } from "../constants/Game";

export default function Scoreboard( {navigation} ) {

    const [scores, setScores] = useState([]);
/*I have no idea why this is not working. First it did work but when i tried to add real time and date
it stopped working and gave me error when opening scoreboard */
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        })
        return unsubscribe;
    }, [navigation]);
    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <View>
            {scores.map((player, i) => (
                <Text key={i}>{i + 1}. {player.name} {player.time} {player.date} {player.points}</Text>
            ))}
        </View>
    )
}