import React, { useState, useEffect } from "react";
import { 
Typography,
Button, 
CardContent, 
Card, 
CardActions, 
Slide } from "@material-ui/core";
import Confetti from 'react-dom-confetti';
import Flashcard from "../../Components/Flashcard";
import FullscreenContainer from "../../Components/FullscreenContainer";
import words from "../../german-english.json";
import { get, set } from "idb-keyval";
import AutoSizer from "react-virtualized-auto-sizer";

const getLearntGermanWords = async () => 
  ((await get("learnt-german-words")) || []);

const randomGermanWord = (excludedWords = []) => {
  const germanWords = Object.keys(words);
  const getRandWord = () => germanWords[Math.floor(Math.random() * germanWords.length)];
  let word = getRandWord();
  
  while (excludedWords.includes(word)) {
    word = getRandWord();
  }

  return word;
}

const Learn = () => {
  let [word, setWord] = useState("");
  let [isIn, setIsIn] = useState(false);
  useEffect(
    () => {
      (async () => 
        setWord(randomGermanWord((await get("learnt-german-words"))) || [])
      )();
    },
    []
  );

  useEffect(() => {
    setTimeout(() => setIsIn(true), 0)
  }, []);
  
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }
  };

  const transition = () => {
    setIsIn(false);
    setTimeout(() => setIsIn(true), 200)
  };

  const setNewWord = async () => {
    const learntGermanWords = await getLearntGermanWords();
    setWord(randomGermanWord(learntGermanWords));
  };

  return  (
    <AutoSizer>
      {({width, height}) =>
        <div style={{...styles.container, width, height}}>
          <Slide
          direction={isIn? "right" : "left"} 
          in={isIn} 
          mountOnEnter 
          unmountOnExit>
            <div style={styles.container}>
              <Flashcard
                word={word} 
                type="learn"
                onLearnt={async ({word}) => {
                  // add word to learnt words
                  const learntGermanWords = await getLearntGermanWords();
                  if (!learntGermanWords.find(e => e === word)) {
                    learntGermanWords.push(word);
                  }
                  await set("learnt-german-words", learntGermanWords);
                  // slide animation
                  transition();
                  await setNewWord();
                }}
                onDismissed={async () => {              
                  // slide animation
                  transition();
                  await setNewWord();
                }}
              />
            </div>
          </Slide>
        </div> 
      }
    </AutoSizer>
  );
}

export default Learn;
