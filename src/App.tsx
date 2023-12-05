import React, { useState } from "react";

type Quiz = QuestionSet[];

type Answers = [string, string, string, string];

interface QuestionSet {
  question: string;
  answers: Answers;
  correctAnswerIndex: number;
}

function App() {
  // Current Question Number
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // Quiz Score / if eqals -1 quiz answers is not submited yet
  const [quizScore, setQuizScore] = useState<number>(-1);

  // Current status of the user answers/ if eqals -1 not answered yer
  const [userAnswers, setUserAnswers] = useState<number[]>(
    new Array(mockQuiz.length).fill(-1)
  );

  // Handler for clicked answer
  const handleAnswerSelect = (answerIndex: number) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(updatedUserAnswers);
  };

  // Handler submiting the answers, caclulating the result and showing it
  const handleSubmit = () => {
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === mockQuiz[index].correctAnswerIndex
    );
    const result: number = (correctAnswers.length / mockQuiz.length) * 100;
    setQuizScore(result);
  };

  // Renderes Answers for current question
  const AnswersList = () => (
    <ul>
      {mockQuiz[currentQuestion].answers.map((answer, index: number) => (
        <li
          key={index}
          onClick={() => handleAnswerSelect(index)}
          style={
            userAnswers[currentQuestion] === index
              ? { border: "1px solid blue" }
              : {}
          }
        >
          {answer}
        </li>
      ))}
    </ul>
  );
 
  // Renderes Navigation ( Prev, Next, Submit) Buttons
  const NavButtons = () => (
    <div>
      {currentQuestion ? (
        <button
          onClick={() => setCurrentQuestion((prevQNum: number) => prevQNum - 1)}
        >
          Previos
        </button>
      ) : (
        <></>
      )}
      {currentQuestion === mockQuiz.length - 1 ? (
        <button
          onClick={handleSubmit}
          disabled={userAnswers[currentQuestion] === -1 ? true : false}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => setCurrentQuestion((prevQNum: number) => prevQNum + 1)}
          disabled={userAnswers[currentQuestion] === -1 ? true : false}
        >
          Next
        </button>
      )}
    </div>
  );

  return (
    <main className="App" style={{ textAlign : 'center'}}>
      <article>
        { quizScore === -1  // If quiz not completed/score not calc. yet, show Quiz questions
        ?  ( <div>
            <h2>{mockQuiz[currentQuestion].question}</h2>
            <AnswersList />
            <NavButtons />
          </div>
        ) : (               // If quiz completed show User Score
          <div>
            <h2>Scores</h2>
            <p>Your Score is : {quizScore}</p>
          </div>
        )}
      </article>
    </main>
  );
}

export default App;

 // Mock of quiz data with 5 questions, 4 answers each 
const mockQuiz: Quiz = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswerIndex: 2, 
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswerIndex: 1, 
  },
  {
    question: "What is the largest mammal?",
    answers: ["Elephant", "Whale Shark", "Blue Whale", "Giraffe"],
    correctAnswerIndex: 2, 
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    correctAnswerIndex: 2, 
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Ribosome"],
    correctAnswerIndex: 1, 
  },
];
