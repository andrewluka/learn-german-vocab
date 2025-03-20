import React, { useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { Fade } from "@material-ui/core"
import { VariableSizeList as List } from "react-window";
import Flashcard from "../../Components/Flashcard";
import words from "../../german-english.json";
import { vh } from "../../utils";

const randomFlashcardConfig = type => {
  if (type !== "practice" && type !== "learn") {
    let randNum = Math.random() * 100;
    type = randNum > 50 ? "practice" : "learn";
  }

  const randWord = () => {
    let germanWords = Object.keys(words);
    return germanWords[Math.floor(Math.random() * germanWords.length)];
  }
  let word = randWord();

  let result = { type, word };

  // const newWord = () => (result.word = randWord());
  // if (type === "learn") {
  //   result.onLearnt = newWord;
  //   result.onDismissed = newWord;
  // } else if (type === "practice") {
  //   result.onCorrectAnswer = newWord;
  // }

  return result;
}

const Card = props => {
  let [isIn] = useState(true);

  return (
    <div>
      <Fade in={isIn}>
        <div>
          <Flashcard 
            {...props}
          />
        </div>
      </Fade>
    </div>
  );
};

const Home = () => {
  let [list, setList] = useState([]);
  const itemCount = Math.pow(10, 4);
  const percent = 80
  const itemHeight = `${percent}vh`;
  const itemWidth = `${percent}vw`;

  const itemSize = index => {
  
    return (index % 2 === 0) ? vh(percent) : 20;
  }

  return (
    <InfiniteLoader
    isItemLoaded={index => !!(list[index])}
    itemCount={itemCount}
    loadMoreItems={(startIndex, endIndex) => {
      let newList = [...list];
      for (let i = startIndex; i < endIndex; ++i) {
        const item = randomFlashcardConfig();
        newList.push(item);
      }
      setList(newList);
    }}
    >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({width, height}) => (
              <List
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={ref}
                itemSize={itemSize}
                width={width}
                height={height}
              >
                {
                  ({index, style}) => {
                    let props = {...(list[index])};
                    return index % 2 === 0
                    ?
                    <Card
                      width={itemWidth} 
                      height={itemHeight} 
                      style={{
                        ...style,
                        position: "fixed",
                        transform: `translateX(calc((100vw - ${itemWidth})/2))`
                      }}
                      onExit={() => {
                        setList([...list].splice(index, 1));
                      }}
                      {...props}
                      notActionable
                    />
                    :
                    <div style={style}></div>
                  }
                }
              </List>
            )}
          </AutoSizer>
        )}
    </InfiniteLoader>
  );
}

export default Home;