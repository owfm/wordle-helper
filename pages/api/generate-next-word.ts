import { pick, sample } from "lodash";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { KnowledgeItem, LetterState } from "../../models";
import { fiveLetterWords } from "./words";

type NextWord = {
  word: string;
};

type Error = string;

type Body = [string, KnowledgeItem][];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextWord | Error>
) {
  const knowledgeMap = req.body as Body;
  const correctLetters = knowledgeMap.filter(([_, knowledgeItem]) => {
    if (knowledgeItem.state === LetterState.CORRECT) {
      return true;
    }
    return false;
  });

  const misplacedLetters = knowledgeMap.filter(([_, knowledgeItem]) => {
    if (knowledgeItem.state === LetterState.MISPLACED) {
      return true;
    }
    return false;
  });

  const wrongLetters = knowledgeMap.filter(([_, knowledgeItem]) => {
    if (knowledgeItem.state === LetterState.WRONG) {
      return true;
    }
    return false;
  });

  const possibleWords = [...fiveLetterWords].filter((word) => {
    const wordLetters = word.split("");
    for (let [letter, knowledgeItem] of correctLetters) {
      if (wordLetters[knowledgeItem.idx!] !== letter) return false;
    }

    for (let [letter, knowledgeItem] of misplacedLetters) {
      if (!word.includes(letter)) return false; // if the word doesn't contain a misplaced letter it can't be correct
      for (let wrongIdx of knowledgeItem.notAtIdx) {
        if (wordLetters[wrongIdx] === letter) return false; //if a word contains the misplaced letter in the wrong index, it can't be correct
      }
    }

    for (let [letter, _] of wrongLetters) {
      if (word.includes(letter)) return false;
    }

    return true;
  });

  const knownLetterIdxs = correctLetters.map(
    ([_, knowledgeItem]) => knowledgeItem.idx!
  );

  const letterWeights = calculateLetterWeights(possibleWords, knownLetterIdxs);

  const wordWeights = calculateWordWeights(
    letterWeights,
    possibleWords,
    knownLetterIdxs
  );

  const maxIndex = indexOfMax(wordWeights);

  if (possibleWords.length === 0) {
    res.status(400).json("No words found.");
  }

  res.status(200).json({ word: possibleWords[maxIndex] });
}

function calculateLetterWeights(words: string[], knownIndexes: number[]) {
  const weights: Record<any, any> = {};
  for (let word of words) {
    for (let pos of [0, 1, 2, 3, 4]) {
      if (pos in knownIndexes) continue;
      if (!(pos in weights)) {
        weights[pos] = {};
      }
      const letter = word.charAt(pos);
      if (!(letter in weights[pos])) {
        weights[pos][letter] = 0;
      }
      weights[pos][letter]++;
    }
  }
  return weights;
}

function calculateWordWeights(
  weights: Record<any, any>,
  words: string[],
  knownIndexes: number[]
) {
  const wordWeights = [];
  for (let word of words) {
    let thisWordWeight = 0;
    for (let pos of [0, 1, 2, 3, 4]) {
      if (pos in knownIndexes) continue;
      thisWordWeight += weights[pos][word.charAt(pos)];
    }
    wordWeights.push(thisWordWeight);
  }
  return wordWeights;
}

function indexOfMax(arr: number[]) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}
