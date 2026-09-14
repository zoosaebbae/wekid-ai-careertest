import '../styles/start.css';

export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="wk-start">
      <div className="wk-brandline">
        <span className="wk-brandline__dot" />
        WE:KID × 고양시자원봉사센터
      </div>

      <div className="wk-start__hero">
        <div className="wk-start__orbit">
          <span>🧑‍🏫</span>
          <span>👩‍⚕️</span>
          <span>🧑‍💻</span>
          <span>🎨</span>
          <span>🚒</span>
          <span>🤖</span>
        </div>
      </div>

      <p className="wk-eyebrow">🌱 직업 가치관 × AI 미래직업</p>
      <h1 className="wk-h1">
        AI 시대, 나의 일은
        <br />
        어떻게 달라질까?
      </h1>
      <p className="wk-sub">
        10개의 질문으로 내가 중요하게 생각하는 직업의 조건을 알아보고,
        AI가 발전한 10년 후 나의 직업을 상상해보세요.
      </p>

      <div className="wk-start__meta">
        <span>⏱ 약 2~3분 소요</span>
        <span className="wk-start__dot">·</span>
        <span>회원가입 없음</span>
      </div>

      <blockquote className="wk-start__quote">
        “AI가 바꾸는 직업, 나는 무엇을 더 잘해야 할까?”
      </blockquote>

      <div className="wk-spacer" />

      <button className="wk-btn wk-btn--primary" onClick={onStart}>
        테스트 시작하기
      </button>
    </div>
  );
}
