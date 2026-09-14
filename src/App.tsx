import { useMemo, useState } from 'react';
import { Job } from './data/jobs';
import { VALUE_QUESTIONS } from './data/valueQuestions';
import { Answers, scoreAnswers, topValueLabels } from './lib/scoring';
import { generateAiImpact } from './lib/aiImpactEngine';
import StartScreen from './pages/StartScreen';
import JobSelectScreen, { JobMode } from './pages/JobSelectScreen';
import QuizScreen from './pages/QuizScreen';
import AnalyzingScreen from './pages/AnalyzingScreen';
import ResultScreen from './pages/ResultScreen';

export type Step = 'start' | 'job' | 'quiz' | 'analyzing' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('start');
  const [job, setJob] = useState<Job | null>(null);
  const [jobMode, setJobMode] = useState<JobMode>('current');
  const [answers, setAnswers] = useState<Answers>({});

  const results = useMemo(() => (step === 'result' ? scoreAnswers(answers) : []), [step, answers]);
  const topValues = useMemo(() => topValueLabels(results, 3), [results]);
  const impact = useMemo(() => {
    if (step !== 'result' || !job) return null;
    return generateAiImpact(job, topValues);
  }, [step, job, topValues]);

  function handleRestart() {
    setStep('start');
    setJob(null);
    setJobMode('current');
    setAnswers({});
  }

  return (
    <div className="wk-app-shell">
      <div className="wk-screen">
        {step === 'start' && <StartScreen onStart={() => setStep('job')} />}

        {step === 'job' && (
          <JobSelectScreen
            mode={jobMode}
            onModeChange={setJobMode}
            onBack={() => setStep('start')}
            onConfirm={(selected) => {
              setJob(selected);
              setStep('quiz');
            }}
          />
        )}

        {step === 'quiz' && (
          <QuizScreen
            questions={VALUE_QUESTIONS}
            answers={answers}
            onAnswer={(qid, choice) => setAnswers((prev) => ({ ...prev, [qid]: choice }))}
            onBack={() => setStep('job')}
            onComplete={() => setStep('analyzing')}
          />
        )}

        {step === 'analyzing' && <AnalyzingScreen onDone={() => setStep('result')} />}

        {step === 'result' && job && impact && (
          <ResultScreen job={job} jobMode={jobMode} topValues={topValues} impact={impact} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
