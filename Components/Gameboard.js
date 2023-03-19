import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../Style/Styles';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, SCOREBOARD_KEY, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/Game";
import { Col, Grid} from 'react-native-easy-grid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from './Header';
import Footer from './Footer';


let board = [];

export default Gameboard = ({ route }) => {

    const [playerName, SetPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    //This array has the information wheter dice is selecter or not
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false));

        
    //This array has the spots for a throw
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    //this array has the information wheter the spot count has been selected or not
    const [selectedDicePoints, setSelectedDicePoints] = 
    useState(new Array(MAX_SPOT).fill(false));
    //this array has total points different spot count
    const [dicePointsTotal, setDicepointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    const [scores, setScores] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);


    const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable 
          key={"row" + i}
          onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50} 
          color={getDiceColor(i)}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

  const pointRow = [];
  
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointRow.push(
            <Col key= {"points" + spot}>
                <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
            )

        }

  const buttonRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    buttonRow.push(
    <Col key={"buttowRow" + diceButton}>
        <Pressable
        onPress={() => selectDicePoints(diceButton)}
        key={"buttowRow" + diceButton}>
            <MaterialCommunityIcons
                name={"numeric-" + (diceButton +1) + "-circle"}
                key={"ButtonRow" + diceButton}
                size={40}
                color={getDicePointsColor(diceButton)}>
            </MaterialCommunityIcons>
        </Pressable>
    </Col>
    )
  }

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            SetPlayerName(route.params.player);
            getScoreboardData();
        }
    }, []);

    useEffect(() => {
      if (nbrOfThrowsLeft === 0){
      setStatus('Select your points');
      }
      else if (nbrOfThrowsLeft < 0) {
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
      }
      else if(selectedDicePoints.every(x => x)) {
        savePlayerPoints();
      } else {
        let sum = 0;
        for (let i of dicePointsTotal) {
          sum = sum + i;
        } if (sum > BONUS_POINTS_LIMIT) {
          sum = sum + BONUS_POINTS;
        }
        setTotalPoints(sum);
      }
    }, [nbrOfThrowsLeft]);


    function getDiceColor(i) {
       // if (board.every((val, i, arr) => val === arr[0])) {
         // return "orange";
      //  }
       // else {
          return selectedDices[i] ? "black" : "steelblue";
       // }
      }

      function getDicePointsColor(i) {
        if (selectedDicePoints[i]) {
          return "black";
        }
        else {
          return "steelblue";
        }
      }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
      }
      function getSpotTotal(i) {
        return dicePointsTotal[i];
      }
      function selectDicePoints(i) {
        if (nbrOfThrowsLeft > 0) {
          setStatus('You need to throw 3 times before setting points')
        } else {
        let selected = [...selectedDices];
        let selectedPoints = [...selectedDicePoints];
        let points = [...dicePointsTotal];
        if (!selectedPoints[i]) {
          selectedPoints[i] = true;
          let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1: total), 0);
          points[i] = nbrOfDices * (i + 1);
          setDicepointsTotal(points);
        } 
        selected.fill(false);
        setSelectedDices(selected);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        if (selectDicePoints[i]) {
          setStatus('You already selected points for ' + [i + 1]);
        }

        return points[i];
      }}
  
      function throwDices() {
        if (nbrOfThrowsLeft <= 0) {
          setStatus('Please select your points by clicking numbers underneath');
        } else if (selectedDicePoints.every(x => x === true)) {
          setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
          setDicepointsTotal(new Array(MAX_SPOT).fill(0));
          setTotalPoints(0);
          setStatus('Please throw dices');
        } else {
        let spots = [...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
          if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            spots[i] = randomNumber;
          }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpots(spots);
        setStatus('Select and throw dices again');
      }
    }
      const getScoreboardData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
          if (jsonValue !== null) {
            let tmpScores = JSON.parse(jsonValue);
            setScores(tmpScores);
          }
        }
        catch (error) {
          consologe.log('read error: ' + error.message)
        }
      }

      const savePlayerPoints = async () => {
        const playerpoints = {
          name: playerName,
          date: '3.3.2023',
          time: '9:00', 
          points: totalPoints
        }
        try {
          const newScore = [...scores, playerpoints];
          const jsonValue = JSON.stringify(newScore);
          await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        } catch (error) {
          console.log('Save error ' + error.message)
        }
      }
    return (
        <View style={styles.gameboard}>
          <Header />
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
      </Pressable>
      <Text>Total: {totalPoints}</Text>
      <Text>You are {BONUS_POINTS_LIMIT - totalPoints} points from bonus points.</Text>
      <View style={styles.dicepoints}><Grid>{pointRow}</Grid></View>
      <View style={styles.dicepoints}><Grid>{buttonRow}</Grid></View>
            <Text>Player: {playerName}</Text>
            <Footer />
        </View>
    )
}