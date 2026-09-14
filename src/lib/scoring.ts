import { VALUE_AXES, ValueAxis } from '../data/valueAxes';
import { VALUE_QUESTIONS } from '../data/valueQuestions';

export type Answers = Record<string, 'A' | 'B'>;

export interface AxisResult {
  axis: ValueAxis;
  winner: 'A' | 'B';
  key: string;
  label: string;
  emoji: string;
  desc: string;
  intensity: 0 | 1 | 2; // 2 = 두 문항 모두 같은 방향, 1 = 없음(2문항 기준 불가), 0 = 팽팽
}

export function scoreAnswers(answers: Answers): AxisResult[] {
  const results: AxisResult[] = VALUE_AXES.map((axis) => {
    const questions = VALUE_QUESTIONS.filter((q) => q.axis === axis.id);
    let aCount = 0;
    let bCount = 0;
    questions.forEach((q) => {
      const ans = answers[q.id];
      if (ans === 'A') aCount += 1;
      if (ans === 'B') bCount += 1;
    });
    const diff = aCount - bCount;
    const winner: 'A' | 'B' = diff >= 0 ? 'A' : 'B';
    const pole = winner === 'A' ? axis.poleA : axis.poleB;
    const intensity = Math.abs(diff) as 0 | 2;
    return {
      axis,
      winner,
      key: pole.key,
      label: pole.label,
      emoji: pole.emoji,
      desc: pole.desc,
      intensity,
    };
  });

  // 강도(intensity) 내림차순, 동률이면 축 정의 순서 유지
  return [...results].sort((a, b) => b.intensity - a.intensity);
}

export function topValueLabels(results: AxisResult[], count = 3): AxisResult[] {
  return results.slice(0, count);
}
