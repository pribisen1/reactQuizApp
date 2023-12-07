import { useState } from "react";
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    console.log(userAnswers);
    

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevSelectedAnswer) => {
            return [...prevSelectedAnswer,selectedAnswer];
        });
    }

    
    if(quizIsComplete){
        return(
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon"/>
                <h2>Quiz Completed</h2>
            </div>
        );
    }
    
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() =>  Math.random() - 0.5);


    return(
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={30000} 
                    onTimeout={() => handleSelectAnswer(null)}
                    key={activeQuestionIndex}
                    />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer)=>{
                        return <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}