import React, { useState } from 'react'
import './stepTwo.css'
import TitleDecorator from '../../../../global/TitleDecorator/TitleDecorator'

function StepTwo({nextStep}) {

  const questionMaquet = {
    questionTitle: "",
    questionOrder: 1,
    choices: [
      {
        choiceValue: "",
        isCorrect: false,
      },
      {
        choiceValue: "",
        isCorrect: false,
      },
      {
        choiceValue: "",
        isCorrect: false,
      },
    ]
  }
  const [questions, setQuestions] = useState([questionMaquet])
  console.log(questions)
  const handleQuestionTitleChange = (index, newTitle) => {
    const newQuestions = [...questions];
    newQuestions[index].questionTitle = newTitle;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, newValue) => {
    const newQuestions = [...questions];
    const newChoices = [...newQuestions[questionIndex].choices];
    newChoices[choiceIndex] = { ...newChoices[choiceIndex], choiceValue: newValue };
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], choices: newChoices };
    setQuestions(newQuestions);
  };

  const handleCorrectChoiceChange = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices.forEach((choice, idx) => {
      choice.isCorrect = idx === choiceIndex;
    });
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestions = [...questions, { ...questionMaquet, questionOrder: questions.length + 1 }];
    setQuestions(newQuestions);
  };


  const handleSubmit = () => {
    const isFormValid = questions.every(question => (
      question.questionTitle.trim() !== "" &&
      question.choices.every(choice => choice.choiceValue.trim() !== "")
    ));
    if (isFormValid) {
      nextStep({questions: questions})
    } else {
      alert("Please fill in all required fields.");
    }
	}
  return (
	<div className='step-two-quiz-container'>
    {questions.map((question, index) => (
      <div className='step-two-quiz-container-question'>
        <TitleDecorator>
          <label>Question {question.questionOrder}</label>
        </TitleDecorator>
        <input type='text' value={question.questionTitle} onChange={(e) => handleQuestionTitleChange(index, e.target.value)} />
        <label>Choix</label>
        {questions[index].choices.map((choice, choiceIndex) => (
          <div className='step-two-quiz-container-choice'>
            <input type='radio' checked={choice.isCorrect} name={`isCorrectChoice-${index}`} onChange={() => handleCorrectChoiceChange(index, choiceIndex)}/>
            <input type='text' value={choice.choiceValue} onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}/>
          </div>
        ))}
      </div>
    ))}
    <button className='step-two-quiz-container-add-button' onClick={handleAddQuestion} >+</button>
    <button className='step-two-quiz-container-continue-button' onClick={handleSubmit}>Continuer</button>
  </div>
  )
}

export default StepTwo