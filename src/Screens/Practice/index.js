import React, { useState, useEffect } from "react";
import Flashcard from "../../Components/Flashcard";
import words from "../../german-english.json";
import { get } from "idb-keyval";
import AutoSizer from "react-virtualized-auto-sizer";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import { Fab, Tooltip } from "@material-ui/core";

const getGetter = source => {
  let prev = "";

  return async () => {
    const learnt = (await source()) || [];
    let randIndex = Math.floor(Math.random() * learnt.length);

    let word = learnt[randIndex] || Object.keys(words)[randIndex];

    while (word === prev && learnt.length > 2) {
      randIndex = Math.floor(Math.random() * learnt.length);
      word = learnt[randIndex] || words[randIndex];
    }

    prev = word;

    return word;
  };
};

const getLearntGermanWord = getGetter(
  async () => (await get("learnt-german-words")) || []
);
const getLearntEnglishWord = getGetter(async () => {
  let germanWords = (await get("learnt-german-words")) || [];
  let englishWords = [];

  for (let word of germanWords) {
    englishWords.push(words[word]);
  }
  console.log(englishWords);
  return englishWords;
});
const getRandomGermanWord = getGetter(() => Object.keys(words));
const getRandomEnglishWord = getGetter(() => Object.values(words));

const getLearntWord = () =>
  Math.random() > 0.5 ? getLearntGermanWord() : getLearntEnglishWord();
const getRandomWord = () =>
  Math.random() > 0.5 ? getRandomGermanWord() : getRandomEnglishWord();

const Practice = () => {
  let [word, setWord] = useState("");
  let [onlyLearnt, setOnlyLearnt] = useState(true);

  const nextWord = async () => {
    let newWord;
    if (onlyLearnt) {
      newWord = await getLearntWord();
    } else {
      newWord = await getRandomWord();
    }
    setWord(newWord);
  };


  useEffect(async () => {
    let newWord;
    if (onlyLearnt) {
      newWord = await getLearntWord();
    } else {
      newWord = await getRandomWord();
    }
    setWord(newWord);
  }, [onlyLearnt]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            width,
            height
          }}
        >
          <Flashcard
            style={{ transform: "translateY(-5vh)" }}
            type="practice"
            word={word}
            onCorrectAnswer={() => {
              nextWord();
            }}
            onSkip={nextWord}
          />
          <Tooltip title={onlyLearnt ? "All words" : "Only from vocabulary"}>
            <Fab
              onClick={() => {
                setOnlyLearnt(!onlyLearnt);
              }}
              style={{
                position: "fixed",
                bottom: "10vh",
                right: "1vw"
              }}
              color="primary"
            >
              {onlyLearnt ? (
                <LanguageOutlinedIcon />
              ) : (
                <FilterListOutlinedIcon />
              )}
            </Fab>
          </Tooltip>
        </div>
      )}
    </AutoSizer>
  );
};

export default Practice;
