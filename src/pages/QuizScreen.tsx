import { useState } from 'react';
import { ValueQuestion } from '../data/valueQuestions';
import { Answers } from '../lib/scoring';
import '../styles/quiz.css';

interface Props {
  questions: ValueQuestion[];
  answers: Answers;
  onAnswer: (questionId: string, choice: 'A' | 'B') => void;
  onBack: () => void;
  onComplete: () => void;
}

export default function QuizScreen({ questions, answers, onAnswer, onBack, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [justPicked, setJustPicked] = useState<'A' | 'B' | null>(null);
  const question = questions[index];
  const progress = 10 + Math.round(((index + (justPicked ? 1 : 0)) / questions.length) * 80);

  function handlePick(choice: 'A' | 'B') {
    if (justPicked) return;
    setJustPicked(choice);
    onAnswer(question.id, choice);
    setTimeout(() => {
      setJustPicked(null);
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
      } else {
        onComplete();
      }
    }, 420);
  }

  function handleBack() {
    if (index === 0) {
      onBack();
    } else {
      setIndex((i) => i - 1);
    }
  }

  return (
    <div className="wk-quiz">
      <div className="wk-topbar">
        <button className="wk-back" onClick={handleBack} aria-label="이전">
          ‹
        </button>
        <div className="wk-progress">
          <div className="wk-progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <p className="wk-eyebrow">
        {index + 1} / {questions.length} · 직업 가치관
      </p>
      <p className="wk-quiz__q-label">QUESTION {index + 1}</p>
      <h1 className="wk-h1">{question.prompt}</h1>
      <p className="wk-sub">둘 중 굳이 하나를 선택한다면? · 선택 후 자동으로 넘어가요</p>

      <div className="wk-quiz__options">
        <button
          className={`wk-quiz__option ${justPicked === 'A' ? 'is-picked' : ''}`}
          onClick={() => handlePick('A')}
        >
          {question.optionA}
        </button>
        <div className="wk-quiz__vs">또는</div>
        <button
          className={`wk-quiz__option ${justPicked === 'B' ? 'is-picked' : ''}`}
          onClick={() => handlePick('B')}
        >
          {question.optionB}
        </button>
      </div>

      <div className="wk-spacer" />
    </div>
  );
}
