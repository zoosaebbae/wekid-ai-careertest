import { useMemo, useState } from 'react';
import { Job, JOBS, CATEGORIES, UNKNOWN_JOB } from '../data/jobs';
import '../styles/jobselect.css';

export type JobMode = 'current' | 'hope' | 'interest';

const MODES: { key: JobMode; emoji: string; label: string; desc: string }[] = [
  { key: 'current', emoji: '💼', label: '현재 하고 있는 직업', desc: '지금 하고 있는 일을 기준으로 보기' },
  { key: 'hope', emoji: '🌱', label: '희망하는 직업', desc: '앞으로 하고 싶은 일을 기준으로 보기' },
  { key: 'interest', emoji: '🔎', label: '관심 있는 직업', desc: '궁금한 직업을 가볍게 살펴보기' },
];

interface Props {
  mode: JobMode;
  onModeChange: (m: JobMode) => void;
  onBack: () => void;
  onConfirm: (job: Job) => void;
}

export default function JobSelectScreen({ mode, onModeChange, onBack, onConfirm }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Job | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim();
    let pool = JOBS;
    if (category) pool = pool.filter((j) => j.category === category);
    if (!q) return pool.slice(0, category ? pool.length : 8);
    return pool.filter((j) => j.name.includes(q) || j.category.includes(q)).slice(0, 20);
  }, [query, category]);

  return (
    <div className="wk-job">
      <div className="wk-topbar">
        <button className="wk-back" onClick={onBack} aria-label="뒤로가기">
          ‹
        </button>
        <div className="wk-progress">
          <div className="wk-progress__fill" style={{ width: '10%' }} />
        </div>
      </div>

      <p className="wk-eyebrow">STEP 1 · 직업 선택</p>
      <h1 className="wk-h1">어떤 직업이 궁금한가요?</h1>
      <p className="wk-sub">현재 직업도, 앞으로 하고 싶은 직업도 좋아요.</p>

      <div className="wk-job__modes">
        {MODES.map((m) => (
          <button
            key={m.key}
            className={`wk-job__mode ${mode === m.key ? 'is-active' : ''}`}
            onClick={() => onModeChange(m.key)}
          >
            <span className="wk-job__mode-emoji">{m.emoji}</span>
            <span className="wk-job__mode-text">
              <strong>{m.label}</strong>
              <em>{m.desc}</em>
            </span>
          </button>
        ))}
      </div>

      <div className="wk-job__search">
        <span className="wk-job__search-icon">🔍</span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
          }}
          placeholder="직업 이름으로 검색해보세요 (예: 간호사, 개발자)"
        />
      </div>

      <div className="wk-job__categories">
        <button
          className={`wk-job__cat-chip ${category === null ? 'is-active' : ''}`}
          onClick={() => setCategory(null)}
        >
          전체
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`wk-job__cat-chip ${category === c ? 'is-active' : ''}`}
            onClick={() => setCategory((prev) => (prev === c ? null : c))}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="wk-job__list">
        {filtered.map((j) => (
          <button
            key={j.id}
            className={`wk-job__item ${selected?.id === j.id ? 'is-active' : ''}`}
            onClick={() => setSelected(j)}
          >
            <span className="wk-job__item-name">{j.name}</span>
            <span className="wk-job__item-cat">{j.category}</span>
          </button>
        ))}
        {filtered.length === 0 && <p className="wk-job__empty">검색 결과가 없어요. 다른 이름으로 찾아볼까요?</p>}
      </div>

      <div className="wk-spacer" />

      <button
        className="wk-btn wk-btn--primary"
        disabled={!selected}
        onClick={() => selected && onConfirm(selected)}
      >
        이 직업으로 시작하기
      </button>
      <button className="wk-btn wk-btn--ghost wk-job__skip" onClick={() => onConfirm(UNKNOWN_JOB)}>
        아직 모르겠어요
      </button>
      <p className="wk-job__note">
        이 테스트에는 정답이 없습니다. 오래 고민하지 말고 지금 마음에 조금 더 가까운 쪽을 골라주세요.
      </p>
    </div>
  );
}
