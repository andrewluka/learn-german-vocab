import React, { useState, useEffect } from "react";
import { Slide } from "@material-ui/core";
import Flashcard from "../../Components/Flashcard";
import words from "../../german-english.json";
// import { set } from "idb-keyval";
import AutoSizer from "react-virtualized-auto-sizer";
// import { getLearntGermanWords } from "../../utils";

const randomGermanWord = (excludedWords = []) => {
  const germanWords = Object.keys(words);
  const getRandWord = () =>
    germanWords[Math.floor(Math.random() * germanWords.length)];
  let word = getRandWord();

  while (excludedWords.includes(word)) {
    word = getRandWord();
  }

  return word;
};

const Learn = () => {
  let [word, setWord] = useState("");
  let [isIn, setIsIn] = useState(false);
  useEffect(() => {
    (async () => setWord(randomGermanWord(
      // commented out cuz that would mean we exclude all words
      // await getLearntGermanWords()
    )))();
  }, []);

  useEffect(() => {
    setTimeout(() => setIsIn(true), 0);
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
    setTimeout(() => setIsIn(true), 200);
  };

  const setNewWord = async () => {
    // const learntGermanWords = await getLearntGermanWords();
    setWord(randomGermanWord(
      // commented out cuz that would mean we exclude all words
      // learntGermanWords
    ));
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <div style={{ ...styles.container, width, height }}>
          <Slide
            direction={isIn ? "right" : "left"}
            in={isIn}
            mountOnEnter
            unmountOnExit
          >
            <div style={styles.container}>
              <Flashcard
                word={word}
                type="learn"
                onLearnt={async ({ word }) => {
                  // // add word to learnt words
                  // const learntGermanWords = await getLearntGermanWords();
                  // if (!learntGermanWords.find(e => e === word)) {
                  //   learntGermanWords.push(word);
                  // }
                  // await set("learnt-german-words", learntGermanWords);

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
      )}
    </AutoSizer>
  );
};

export default Learn;
