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

  console.log(misplacedLetters);

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

  if (possibleWords.length === 0) {
    res.status(400).json("No words found.");
  }

  res.status(200).json({ word: sample(possibleWords)! });
}
