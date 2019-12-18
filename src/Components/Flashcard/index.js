import React, { useState } from "react";
import words from "../../german-english.json";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  IconButton
} from "@material-ui/core";
import Celebration from "../Celebration";
import { getSpeaker, getMeaning } from "../../utils";

const Flashcard = ({
  word,
  type,
  onCorrectAnswer = () => {},
  onWrongAnswer = () => {},
  onLearnt = () => {},
  width = "80vw",
  height = "80vh",
  style,
  onDismissed = () => {},
  notActionable
}) => {
  let meaning = getMeaning(word);
  let [answer, setAnswer] = useState("");
  let [error, setError] = useState(false);
  let [confettiActive, setConfettiActive] = useState(false);

  const isPractice = type === "practice";
  const isLearn = type === "learn";
  const isReview = type === "review";

  const onSubmit = e => {
    e && e.preventDefault && e.preventDefault();
    if (answer.toLowerCase().trim() === meaning.toLowerCase().trim()) {
      onCorrectAnswer({ meaning, word, type });
      setConfettiActive(true);
      setTimeout(() => {
        setConfettiActive(false);
      }, 0);
      setAnswer("");
      setError(false);
    } else {
      setError(true);
      onWrongAnswer({ meaning, word, type });
    }
  };

  const speak = getSpeaker();

  return (
    <Card
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width,
        height
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography color="textSecondary" gutterBottom>
          {isPractice || isReview
            ? `What is the meaning of ${word}?`
            : "Learn a new word"}
        </Typography>
        <Typography variant="h5" component="h3">
          {word}
        </Typography>
        {isLearn ? (
          <Typography variant="h6" component="h5" color="textSecondary">
            {meaning}
          </Typography>
        ) : (
          ""
        )}
        {words[word] ? (
          <IconButton onClick={() => speak(word)}>
            <VolumeUpOutlinedIcon />
          </IconButton>
        ) : (
          ""
        )}
      </CardContent>
      <CardActions
        style={{
          margin: "50px"
        }}
      >
        {isPractice || isReview ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "stretch"
            }}
          >
            <form onSubmit={onSubmit}>
              <TextField
                error={error}
                type="text"
                value={answer}
                onChange={e => {
                  let newValue = e.target.value;
                  setAnswer(newValue);
                }}
              />
            </form>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px"
              }}
            >
              <Button onClick={onSubmit} variant="contained" color="primary">
                Submit
              </Button>
              <Button
                onClick={() => {
                  let currentAnswer = answer.toLowerCase();
                  let currentMeaning = meaning.toLowerCase();
                  let newAnswer = "";

                  for (let i = 0; i < currentMeaning.length; ++i) {
                    newAnswer += currentMeaning[i];
                    if (currentMeaning[i] !== currentAnswer[i]) {
                      setAnswer(newAnswer);
                      return;
                    }
                  }

                  if (currentAnswer.length > currentMeaning.length) {
                    setAnswer(currentMeaning);
                  }
                }}
                color="primary"
              >
                Hint
              </Button>
            </div>
            <Celebration active={confettiActive} />
          </div>
        ) : notActionable ? (
          ""
        ) : (
          <React.Fragment>
            <Button
              onClick={() => onLearnt({ meaning, word, type })}
              color="primary"
            >
              Got it
            </Button>
            <Button
              onClick={() => onDismissed({ meaning, word, type })}
              color="primary"
            >
              Learn later
            </Button>
          </React.Fragment>
        )}
      </CardActions>
    </Card>
  );
};

export default Flashcard;
