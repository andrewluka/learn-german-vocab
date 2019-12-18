import { get } from "idb-keyval";
import words from "../german-english.json";

export const getLearntGermanWords = async () =>
  (await get("learnt-german-words")) || [];

export const getEnglishToGermanMapping = (germanToEnglishMapping = words) => {
  let keys = Object.keys(germanToEnglishMapping);
  let values = Object.values(germanToEnglishMapping);

  let englishToGerman = {};
  for (let i = 0; i < keys.length; ++i) {
    englishToGerman[values[i]] = keys[i];
  }

  return englishToGerman;
};

export const getSpeaker = (lang = "de-DE") => {
  let counter = 1;
  return word => {
    const speechSynthesis = window.speechSynthesis;
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
    let speech = new SpeechSynthesisUtterance(word);
    speech.lang = lang;
    speech.rate = counter % 2 === 0 ? 0.5 : 1;
    speechSynthesis.speak(speech);
    ++counter;
  };
};

export function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

export const getMeaning = word => {
  let meaning = words[word] || getEnglishToGermanMapping()[word];
  if (!meaning) {
    return "";
  }
  let bracketIndex = meaning.indexOf("(") === -1 ? 0 : meaning.indexOf("(");
  return meaning.substring(bracketIndex).trim();
};
