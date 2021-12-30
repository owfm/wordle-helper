export type Letter = string;


export interface KnowledgeItem {
    state: LetterState;
    idx: number[];
    notAtIdx: number[];
}
export interface AnswerSelectorProps {
    latest: boolean;
    word: String;
    setCurrentGlobalKnowledge: React.Dispatch<React.SetStateAction<Map<Letter, KnowledgeItem>>>;
    currentGlobalKnowledge: Map<Letter, KnowledgeItem>;
    setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
}

export enum LetterState {
    WRONG,
    MISPLACED,
    CORRECT,
    UNKNOWN,
}

export type LetterIndices = 0 | 1 | 2 | 3 | 4;
