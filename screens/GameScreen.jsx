import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'; 
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";

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

const renderListItem = (value, roundNum) => (
    <Card key={value} style={styles.listItem}>
        <BodyText>#{roundNum}</BodyText>
        <BodyText>{value}</BodyText>
    </Card>
);

const GameScreen = props => {
    const initialguess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialguess);
    const [pastGuesses, setPastGuesses] = useState([initialguess]);
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((!direction && currentGuess < props.userChoice) || (direction && currentGuess > props.userChoice)) {
            Alert.alert('This is weird', 'I think you got it the other way around', [{text: "Sorry!", style: "cancel"}]);
            return;
        }
        if (direction) {
            currentMin.current = currentGuess + 1;
        } else {
            currentMax.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currentRounds => currentRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttons}>
                <MainButton onPress={() => nextGuessHandler(false)}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={() => nextGuessHandler(true)}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
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
        maxWidth: "90%"
    },
    listContainer: {
        flex: 1, // this is needed for scrollview inside view to be scrollable
        width: "80%"
    },
    list: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },  
    listItem: {
        width: "80%",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
    }
});

export default GameScreen;
