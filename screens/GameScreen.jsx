import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native'; 

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const nextGuessHandler = direction => {
        if((!direction && currentGuess < props.userChoice) || (direction && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie to me ):', 'You know that is wrong', [{text: "Sorry!", style: "cancel"}]);
            return;
        }
        if (direction) {
            currentMin.current = currentGuess;
        } else {
            currentMax.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screen}>
            <Text>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttons}>
                <Button title="LOWER" onPress={() => nextGuessHandler(false)} />
                <Button title="HIGHER" onPress={() => nextGuessHandler(true)} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({ 
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    }
});

export default GameScreen;
