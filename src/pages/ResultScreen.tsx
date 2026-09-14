import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Job } from '../data/jobs';
import { JobMode } from './JobSelectScreen';
import { AxisResult } from '../lib/scoring';
import { AiImpactResult, RESEARCH_SOURCES } from '../lib/aiImpactEngine';
import '../styles/result.css';

const MODE_LABEL: Record<JobMode, string> = {
  current: '현재 하고 있는 직업',
  hope: '희망하는 직업',
  interest: '관심 있는 직업',
};

interface Props {
  job: Job;
  jobMode: JobMode;
  topValues: AxisResult[];
  impact: AiImpactResult;
  onRestart: () => void;
}

const LEVEL_TEXT: Record<AiImpactResult['automationLevel'], string> = {
  high: 'AI로 인한 변화가 큰 편',
  mid: '부분적으로 달라지는 편',
  low: '사람의 역할이 오히려 커지는 편',
};

export default function ResultScreen({ job, jobMode, topValues, impact, onRestart }: Props) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!captureRef.current) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(captureRef.current, { backgroundColor: '#fbf7ee', scale: 2 });
      const fileName = `WEKID_${job.name}_AI미래직업결과.png`;
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      // 모바일(특히 iOS Safari)에서는 다운로드 링크가 갤러리 저장으로 바로 이어지지 않는 경우가 많아,
      // 공유 시트(사진에 저장)를 우선 시도하고, 지원하지 않으면 새 탭에서 길게 눌러 저장하도록 안내합니다.
      if (blob) {
        const file = new File([blob], fileName, { type: 'image/png' });
        const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean; share?: (data: ShareData) => Promise<void> };
        if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
          try {
            await nav.share({ files: [file], title: 'WE:KID AI 미래직업 결과' });
            return;
          } catch {
            // 사용자가 공유를 취소한 경우 등 — 아래 다운로드/새 탭 방식으로 대체
          }
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wk-result">
      <div className="wk-topbar">
        <div className="wk-progress">
          <div className="wk-progress__fill" style={{ width: '100%' }} />
        </div>
      </div>
      <p className="wk-eyebrow" style={{ textAlign: 'center' }}>
        RESULT
      </p>

      <div className="wk-ticket" ref={captureRef}>
        <div className="wk-ticket__header">
          <img src="/wekid-logo.png" alt="WE:KID" className="wk-ticket__header-logo" />
          <span>2036 CAREER FORECAST</span>
        </div>

        <h2 className="wk-ticket__title">🌟 당신의 직업 가치관은</h2>
        <div className="wk-ticket__values">
          {topValues.map((v, i) => (
            <div className="wk-value-chip" key={v.axis.id}>
              <span className="wk-value-chip__rank">{i + 1}</span>
              <span className="wk-value-chip__emoji">{v.emoji}</span>
              <div className="wk-value-chip__text">
                <strong>{v.label}</strong>
                <em>{v.desc}</em>
              </div>
            </div>
          ))}
        </div>

        <h3 className="wk-ticket__subtitle">📊 나의 가치 우선순위</h3>
        <div className="wk-bars">
          {topValues.map((v) => (
            <div className="wk-bar-row" key={`bar-${v.axis.id}`}>
              <span className="wk-bar-row__label">
                {v.emoji} {v.label}
              </span>
              <div className="wk-bar-row__track">
                <div className="wk-bar-row__fill" style={{ width: `${40 + v.intensity * 30}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="wk-ticket__divider" />

        <h3 className="wk-ticket__subtitle">💼 내가 살펴본 직업</h3>
        <div className="wk-job-badge">
          <span className="wk-job-badge__name">{job.name}</span>
          <span className="wk-job-badge__mode">{MODE_LABEL[jobMode]}</span>
        </div>

        <h3 className="wk-ticket__subtitle">🤖 AI가 무엇을 맡고, 사람은 무엇을 맡게 될까?</h3>

        <div className="wk-impact-block wk-impact-block--ai">
          <h4>🤖 AI가 맡기 쉬운 업무</h4>
          <ul>
            {impact.aiTasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="wk-impact-block wk-impact-block--human">
          <h4>❤️ 사람이 더 중요해지는 업무</h4>
          <ul>
            {impact.humanTasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="wk-impact-block wk-impact-block--collab">
          <h4>🤝 AI와 함께하게 될 업무</h4>
          <ul>
            {impact.collabTasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="wk-ticket__divider" />

        <h3 className="wk-ticket__subtitle">🔮 2036년, 이 직업은 어떻게 달라질까요?</h3>
        <p className="wk-outlook">
          <span className="wk-outlook__badge">{LEVEL_TEXT[impact.automationLevel]}</span>
          {impact.outlook}
        </p>

        <h3 className="wk-ticket__subtitle">🌱 앞으로 키우면 좋은 능력</h3>
        <div className="wk-skills">
          {impact.skills.map((s) => (
            <span className="wk-skill-chip" key={s}>
              {s}
            </span>
          ))}
        </div>

        <blockquote className="wk-ticket__quote">
          “AI 시대에 중요한 것은
          <br />
          AI를 활용하면서 사람만이 할 수 있는 일을 잘하는 것.”
        </blockquote>

        <div className="wk-ticket__footer">
          <img src="/wekid-logo.png" alt="WE:KID" className="wk-ticket__footer-logo" />
          <span className="wk-ticket__footer-x">×</span>
          <img src="/goyang-volunteer-logo.png" alt="고양시자원봉사센터" className="wk-ticket__footer-logo wk-ticket__footer-logo--goyang" />
        </div>
      </div>

      <button className="wk-btn wk-btn--primary wk-result__save" onClick={handleSave} disabled={saving}>
        {saving ? '이미지 만드는 중…' : '📸 결과 이미지 저장하기'}
      </button>
      <button className="wk-btn wk-btn--ghost" onClick={onRestart}>
        ↻ 처음부터 다시하기
      </button>

      <p className="wk-disclaimer">
        AI와 직업의 미래는 기술과 사회 변화에 따라 달라질 수 있습니다. 본 결과는 자신의 직업 가치와 미래
        변화를 생각해보기 위한 참여형 참고자료이며, 특정 직업의 소멸·대체 확률이나 고용 가능성을 단정하지
        않습니다.
      </p>
      <p className="wk-disclaimer wk-disclaimer__sources">
        참고자료: {RESEARCH_SOURCES.join(' · ')}
      </p>
    </div>
  );
}
