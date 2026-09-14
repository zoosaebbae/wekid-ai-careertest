import { useEffect, useState } from 'react';
import '../styles/analyzing.css';

const MESSAGES = [
  '10개의 선택을 확인하고 있어요',
  '나의 가치 우선순위를 정리하고 있어요',
  'AI 시대의 미래 직업 결과를 만들고 있어요',
];

export default function AnalyzingScreen({ onDone }: { onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 550);
    const timeout = setTimeout(onDone, 1700);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <div className="wk-analyzing">
      <div className="wk-spacer" />
      <div className="wk-analyzing__spinner" />
      <p className="wk-eyebrow" style={{ textAlign: 'center' }}>
        STEP 3 · 결과 분석
      </p>
      <h1 className="wk-h1" style={{ textAlign: 'center' }}>
        나의 가치관을
        <br />
        정리하고 있어요
      </h1>
      <p className="wk-sub wk-analyzing__msg">{MESSAGES[msgIndex]}</p>
      <div className="wk-spacer" />
    </div>
  );
}
