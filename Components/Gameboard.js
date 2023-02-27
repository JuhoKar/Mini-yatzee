import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../Style/Styles';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT } from "../constants/Game";
import { Col, Grid} from 'react-native-easy-grid';

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
        }
    }, []);

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
        setSelectedDicePoints(selectedPoints);
        return points[i];
      }
      function throwDices() {
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

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
      </Pressable>
      <View style={styles.dicepoints}><Grid>{pointRow}</Grid></View>
      <View style={styles.dicepoints}><Grid>{buttonRow}</Grid></View>
            <Text>Player: {playerName}</Text>
        </View>
    )
}