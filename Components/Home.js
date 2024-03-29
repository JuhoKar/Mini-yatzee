import React, { useState } from "react"
import { Text, View, TextInput, Pressable, Keyboard } from "react-native"
import Styles from "../Style/Styles";
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT} from "../constants/Game";

export default function Home( {navigation} ) {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <View>
            <Header />
            <Text style={Styles.homeText}>Welcome to mini-yatzee mobilegame!</Text>
            { !hasPlayerName
            ?
            <>
            <Text style={Styles.homeText}>For Scoreboard enter your name</Text>
            <TextInput onChangeText={setPlayerName} autoFocus={true} style={Styles.textInput} placeholder="Enter your name here"/>
            <Pressable onPress={() => handlePlayerName(playerName)}>
                <Text style={Styles.pressable}>OK</Text>
            </Pressable>
            </>
            :
            <>
            <Text style={Styles.ruleText}>
                    THE GAME: Upper section of the classic Yahtzee
                    dice game. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in
                    order to get same dice spot counts as many as
                    possible. In the end of the turn you must select
                    your points from {MIN_SPOT} to {MAX_SPOT}.
                    Game ends when all points have been selected.
                    The order for selecting those is free.
            </Text>
            <Text style={Styles.ruleText}>
                    POINTS: After each turn game calculates the sum
                    for the dices you selected. Only the dices having
                    the same spot count are calculated. Inside the
                    game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
            </Text>
            <Text style={Styles.ruleText}>
                    GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of
                    getting bonus which gives you {BONUS_POINTS} points more.
            </Text>
            <Text style={Styles.ruleText}>Good luck, {playerName}!</Text>
            <Pressable onPress={() => navigation.navigate('Gameboard', 
                {player: playerName})}>
                <Text style={Styles.pressable}>PLAY</Text>
            </Pressable>
            </>
            }
            <Footer />
        </View>
    )
}