import React, { useState, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import {
  IconButton,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import AutoSizer from "react-virtualized-auto-sizer";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import { getSpeaker, getLearntGermanWords, getMeaning } from "../../utils";
// import words from "../../german-english.json";

const Vocabulary = () => {
  let [learntWords, setLearntWords] = useState([]);
  useEffect(() => {
    (async () => {
      setLearntWords(await getLearntGermanWords());
    })();
  }, []);
  const itemSize = () => 60;

  function renderRow(props) {
    const { index, style } = props;
    const speak = getSpeaker();
    let word = learntWords[index];
    let meaning = getMeaning(learntWords[index]);

    return (
      <ListItem style={style} key={index}>
        <ListItemText primary={word} secondary={meaning} />
        <IconButton onClick={() => speak(word)}>
          <VolumeUpOutlinedIcon />
        </IconButton>
      </ListItem>
    );
  }

  return learntWords.length > 0 ? (
    <AutoSizer>
      {
        ({ width, height }) => (
          <List
            itemCount={learntWords.length}
            width={width}
            height={height}
            itemSize={itemSize}
          >
            {renderRow}
          </List>
        )
      }      
    </AutoSizer>
  ) : 
  (
    <Typography variant="subtitle2" style={{
      margin: "auto"
    }}>No words learnt until now</Typography>
  )
};

export default Vocabulary;
