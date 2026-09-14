import { Job, JobTags } from '../data/jobs';
import { AxisResult } from './scoring';

export interface AiImpactResult {
  aiTasks: string[];
  humanTasks: string[];
  collabTasks: string[];
  outlook: string;
  skills: string[];
  automationLevel: 'high' | 'mid' | 'low';
}

/**
 * 콘텐츠 근거 (본문 문장은 아래 자료를 직접 인용하지 않고, 발견된 패턴을 참고해 새로 작성했습니다)
 * - 한국고용정보원, 「인공지능에 의한 화이트칼라의 직무 대체 및 변화」(2025)
 *   : 정보 탐색·수집·분석 업무 비중이 큰 직업일수록 대체율이 높고, 신체적 숙련 기술이 필요한 직업은
 *     대체율이 낮게 나타남. 생성형 AI의 발달로 방송작가·게임그래픽디자이너 등 창작 업무의 대체율도
 *     상승 추세.
 * - 한국고용정보원, 「AI·로봇에 의한 직업별 대체 가능성」(2016, 옥스퍼드 모델 적용)
 *   : 단순 반복 육체노동은 대체 확률이 높고, 판단·창의·대인 신뢰가 핵심인 직업은 대체 확률이 낮음.
 * - World Economic Forum, 「Future of Jobs Report 2025」
 *   : 2030년까지 핵심 업무 역량의 약 39%가 변화할 것으로 전망되며, 분석적 사고·창의적 사고·회복탄력성
 *     및 유연성·호기심과 평생학습·리더십과 사회적 영향력 등 사람 중심 역량의 중요도가 함께 상승.
 *     AI는 다수 업무를 완전히 대체하기보다 절반가량을 "보강(augment)"하는 방향으로 조직에 도입되는 추세.
 */
export const RESEARCH_SOURCES = [
  '한국고용정보원, 「AI에 의한 화이트칼라의 직무 대체 및 변화」(2025)',
  'World Economic Forum, 「Future of Jobs Report 2025」',
];

interface Candidate {
  check: (t: JobTags) => boolean;
  text: string;
  weight: number; // 높을수록 우선 노출
}

function pick(candidates: Candidate[], tags: JobTags, count: number): string[] {
  const matched = candidates
    .filter((c) => c.check(tags))
    .sort((a, b) => b.weight - a.weight)
    .map((c) => c.text);
  const unique = Array.from(new Set(matched));
  return unique.slice(0, count);
}

// AI가 먼저 맡게 될 가능성이 큰 업무
// 근거: 정보 탐색·수집·분석·반복 처리 비중이 큰 업무일수록 대체율이 높다는 국내 연구 결과를 반영.
// 생성형 AI로 인해 "창의적" 업무의 초기 단계(시안·초안 생성)도 더 이상 안전지대가 아니라는 점을 반영.
const AI_CANDIDATES: Candidate[] = [
  { check: (t) => t.analytical >= 0.7, text: '방대한 자료·사례를 탐색하고 1차로 정리·요약하는 작업', weight: 4 },
  { check: (t) => t.routine >= 0.6, text: '정해진 절차와 서식에 따라 반복되는 문서·기록 처리', weight: 4 },
  { check: (t) => t.routine >= 0.5 && t.social < 0.5, text: '자주 묻는 질문을 분류하고 정해진 답변으로 1차 응대하는 일', weight: 3 },
  { check: (t) => t.analytical >= 0.55 && t.routine >= 0.4, text: '과거 데이터를 근거로 한 수치 예측이나 보고서 초안 작성', weight: 3 },
  { check: (t) => t.creative >= 0.6, text: '레퍼런스를 모으고 여러 시안·초안을 빠르게 만들어보는 초기 작업', weight: 3 },
  { check: (t) => t.decision < 0.4 && t.routine >= 0.45, text: '정해진 기준에 따라 서류를 검토·승인하는 단순 심사', weight: 2 },
  { check: (t) => t.physical < 0.3 && t.creative < 0.4, text: '일정 조율, 기록 정리 같은 부수적인 행정 업무', weight: 1 },
  { check: () => true, text: '비슷한 이전 사례를 참고해 표준화된 결과물을 빠르게 만드는 작업', weight: 0 },
];

// 사람의 역할이 오히려 더 중요해지는 업무
// 근거: 대인 신뢰, 최종 판단·책임, 현장 대응, 독창적 발상은 여전히 대체 확률이 낮은 영역으로 꼽힘.
const HUMAN_CANDIDATES: Candidate[] = [
  { check: (t) => t.social >= 0.7, text: '표정과 말투, 상황을 읽고 신뢰를 쌓아가는 대화', weight: 4 },
  { check: (t) => t.decision >= 0.75, text: '여러 이해관계를 따져 결과에 책임을 지는 최종 판단', weight: 4 },
  { check: (t) => t.physical >= 0.75, text: '현장의 예측 불가능한 상황에 몸으로 즉각 대응하는 일', weight: 3 },
  { check: (t) => t.creative >= 0.7 && t.social >= 0.3, text: '아무도 시도하지 않은 독창적인 아이디어를 처음 떠올리는 일', weight: 3 },
  { check: (t) => t.social >= 0.5 && t.decision >= 0.5, text: '민감하고 이해관계가 얽힌 상황에서 사람 사이를 조율하는 일', weight: 2 },
  { check: (t) => t.physical >= 0.6 && t.decision >= 0.4, text: '숙련된 손기술과 감각으로 미세한 오차를 잡아내는 일', weight: 2 },
  { check: (t) => t.creative >= 0.5, text: '내 경험과 관점을 담아 결과물에 고유한 개성을 불어넣는 일', weight: 1 },
  { check: (t) => t.decision >= 0.5, text: '정해진 기준만으로는 답이 나오지 않는 애매한 상황을 판단하는 일', weight: 1 },
  { check: () => true, text: '동료·고객과 실제 관계를 맺고 오래 유지하는 일', weight: 0 },
];

// AI와 함께하게 될 업무
// 근거: WEF(2025)는 AI가 다수 업무를 전면 대체하기보다 절반가량을 "보강"하는 방향으로 도입되고 있다고
// 분석 — 사람이 AI의 결과를 검토·조율·현장 적용하는 협업형 업무가 늘어나는 흐름을 반영.
const COLLAB_CANDIDATES: Candidate[] = [
  { check: (t) => t.analytical >= 0.55, text: 'AI가 정리한 자료·초안을 검토하고 방향을 다시 잡는 일', weight: 4 },
  { check: (t) => t.creative >= 0.55, text: 'AI가 제안한 여러 시안 중 고르고 다듬어 완성도를 높이는 일', weight: 4 },
  { check: (t) => t.social >= 0.55, text: 'AI가 정리한 기록·데이터를 참고해 더 깊은 대화로 이어가는 일', weight: 3 },
  { check: (t) => t.physical >= 0.55, text: 'AI 센서·장비가 알려주는 정보를 보고 현장에서 최종 판단하는 일', weight: 3 },
  { check: (t) => t.routine >= 0.45, text: 'AI가 처리한 반복 업무 결과를 확인하고 예외 상황만 직접 처리하는 일', weight: 2 },
  { check: (t) => t.decision >= 0.6, text: 'AI의 분석을 참고 자료로 삼되, 최종 책임은 사람이 지는 의사결정', weight: 1 },
  { check: () => true, text: 'AI 도구를 활용해 이전보다 빠르게 초안을 만들고 다듬어가는 일', weight: 0 },
];

// 자동화 성향 점수
// 근거: 국내 연구에서 정보 탐색·분석·반복 처리 비중이 큰 직업일수록 대체율이 높고, 신체적 숙련 기술 ·
// 대인 신뢰 · 고위험 판단이 핵심인 직업일수록 대체율이 낮게 나타남. 다만 생성형 AI 이후 창작 업무도
// 더 이상 완전한 안전지대가 아니므로, 창의성에 부여하는 보호 효과는 예전보다 작게 반영함.
function automationScore(t: JobTags): number {
  return (
    t.routine * 0.35 +
    t.analytical * 0.3 -
    t.physical * 0.25 -
    t.social * 0.2 -
    t.decision * 0.15 -
    t.creative * 0.05
  );
}

function outlookText(job: Job, level: 'high' | 'mid' | 'low'): string {
  const name = job.name;
  if (level === 'high') {
    return `${name} 업무 중 자료를 찾고 정리·분석하거나 정해진 절차대로 반복되는 부분은, 2036년쯤엔 AI 도구가 먼저 처리하고 있을 가능성이 커요. 국내 연구에서도 정보 탐색·분석 비중이 큰 직업일수록 AI로 대체되는 업무 비율이 높게 나타났어요. 다만 이 일 전체가 사라지기보다, 사람은 AI가 만든 결과를 확인·조율하고 사람 대 사람으로 신뢰를 쌓는 부분에 더 집중하는 쪽으로 역할이 바뀔 가능성이 높아요.`;
  }
  if (level === 'mid') {
    return `${name}은(는) AI 도구가 자료 정리나 시안·초안 작성 같은 일부 업무를 도와주면서, 일하는 속도와 방식이 지금과는 꽤 달라질 가능성이 높아요. 그럼에도 상황에 따라 판단하고 사람과 부딪히며 조율하는 부분, 현장에서만 알 수 있는 감각은 여전히 사람의 몫으로 남을 가능성이 커요.`;
  }
  return `${name}은(는) 사람 사이의 신뢰, 현장에서의 즉각적인 대응, 책임 있는 최종 판단이 핵심이라 2036년에도 사람의 역할이 오히려 더 중요해질 가능성이 커요. 실제로 신체적 숙련 기술이나 대인 신뢰가 핵심인 직업들은 지금까지의 여러 연구에서 공통적으로 AI 대체 위험이 낮은 편으로 분류돼 왔어요. AI는 이 일을 대체하기보다, 준비 과정을 도와주는 보조 도구에 가까운 역할을 하게 될 가능성이 커요.`;
}

// 태그 기반 추천 능력 — WEF(2025)가 2030년까지 중요도가 함께 상승할 것으로 꼽은 사람 중심 역량들을
// 직업 특성에 맞게 연결함.
const SKILL_BY_TAG: Candidate[] = [
  { check: (t) => t.analytical >= 0.55, text: 'AI가 내놓은 결과를 검증하고 판단하는 분석적 사고력', weight: 3 },
  { check: (t) => t.social >= 0.6, text: '공감하며 경청하고 신뢰를 쌓는 커뮤니케이션 능력', weight: 3 },
  { check: (t) => t.creative >= 0.6, text: 'AI가 만든 여러 안 중에서 고유한 관점으로 방향을 고르는 창의적 사고력', weight: 3 },
  { check: (t) => t.physical >= 0.6, text: '현장의 돌발 상황에 대응하는 순발력과 숙련된 감각', weight: 2 },
  { check: (t) => t.decision >= 0.6, text: '애매한 상황에서도 책임 있게 결정하는 판단력', weight: 2 },
  { check: () => true, text: '새로운 AI 도구를 빠르게 익히고 업무에 적용하는 호기심·학습력', weight: 1 },
];

// 가치관 결과와 연결된 추천 능력
const SKILL_BY_VALUE: Record<string, string> = {
  growth: '새로운 도구와 지식을 계속 익히는 학습 민첩성',
  balance: '업무와 삶의 우선순위를 스스로 조율하는 자기관리력',
  collaboration: 'AI가 놓치는 맥락을 팀에 공유하는 협업 커뮤니케이션',
  autonomy: 'AI 도구를 활용해 스스로 판단하고 결정하는 자기주도력',
  meaning: '이 일이 누구에게 어떤 도움이 되는지 설명하는 공감력',
  reward: '내 성과와 기여를 명확한 근거로 드러내는 표현력',
  creativity: '남과 다른 관점을 결과물에 담는 창의적 사고력',
  structure: '기준과 근거를 꼼꼼히 확인하는 분석적 사고력',
};

export function generateAiImpact(job: Job, topValues: AxisResult[]): AiImpactResult {
  const tags = job.tags;
  const aiTasks = pick(AI_CANDIDATES, tags, 3);
  const humanTasks = pick(HUMAN_CANDIDATES, tags, 3);
  const collabTasks = pick(COLLAB_CANDIDATES, tags, 3);

  const score = automationScore(tags);
  const level: 'high' | 'mid' | 'low' = score >= 0.2 ? 'high' : score >= 0.02 ? 'mid' : 'low';
  const outlook = outlookText(job, level);

  const tagSkills = pick(SKILL_BY_TAG, tags, 2);
  const valueSkills = topValues
    .slice(0, 2)
    .map((v) => SKILL_BY_VALUE[v.key])
    .filter(Boolean) as string[];
  const skills = Array.from(new Set([...tagSkills, ...valueSkills])).slice(0, 4);

  return { aiTasks, humanTasks, collabTasks, outlook, skills, automationLevel: level };
}
