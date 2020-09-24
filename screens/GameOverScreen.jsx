import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

const GameOverScreen = props => {
    return (
        <View style={styles.screen}> 
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    fadeDuration={1000}
                    source={require('../assets/success.png')}
                    //source={{ uri: "https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg" }}  
                    style={styles.image}
                    // resizeMode="contain"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed{" "}
                    <Text style={styles.highlight}>{props.rounds}</Text> rounds to 
                    guess the number{" "}
                    <Text style={styles.highlight}>{props.userNumber}</Text>!
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>PLAY AGAIN</MainButton> 
        </View>
    );
};

/**
 * React-Native is able to read the width and height
 * of a locally loaded image, and hence we don't need 
 * to set these props if the image is in the size we need.
 * We can set them if we want to over-write the default ones.
 */

/**
 * The above does not hold true for images loaded from the web.
 */

/**
 * Styles added to <Text> components are inherited by the
 * nested <Text> components. This does not happen with any
 * other component in react-native. <Text> also has it's own
 * positioning system where the text moves to a new line if
 * it does not fit in the container.
 * We can set the numberOfLines prop to control it as well.
 * <Text numberOfLines={1} ellipsizeMode="tail">
 *     This text will never wrap into a new line, instead it will be cut off like this if it is too lon...
 * </Text>
 */

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: 30
    },
    image: {
        width: "100%",
        height: "100%"
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    highlight: {
        color: Colors.primary,
        fontFamily: "open-sans-bold" 
    },
    resultText: {
        textAlign: "center",
        fontSize: 20
    }
});

export default GameOverScreen;
