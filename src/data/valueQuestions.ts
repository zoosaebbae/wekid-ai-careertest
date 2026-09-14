import { AxisId } from './valueAxes';

export interface ValueQuestion {
  id: string;
  axis: AxisId;
  prompt: string;
  optionA: string; // axis.poleA 방향
  optionB: string; // axis.poleB 방향
}

export const VALUE_QUESTIONS: ValueQuestion[] = [
  {
    id: 'q1',
    axis: 'stability',
    prompt: '내일 출근/등교 후, 어떤 하루가 더 끌려?',
    optionA: '어제와 크게 다르지 않은, 익숙하고 편안한 하루',
    optionB: '어제와는 다른 새로운 일이 생기는 하루',
  },
  {
    id: 'q2',
    axis: 'stability',
    prompt: '회사(또는 조직)를 고른다면?',
    optionA: '오래 자리 잡은, 안정적인 곳',
    optionB: '이제 막 성장 중인, 변화가 빠른 곳',
  },
  {
    id: 'q3',
    axis: 'autonomy',
    prompt: '중요한 결정을 내려야 할 때, 나는?',
    optionA: '동료들과 함께 의논해서 결정하고 싶다',
    optionB: '내 판단으로 빠르게 결정하고 싶다',
  },
  {
    id: 'q4',
    axis: 'autonomy',
    prompt: '일할 때 더 편한 환경은?',
    optionA: '팀원들과 계속 소통하며 진행하는 환경',
    optionB: '나 혼자 집중해서 진행하는 환경',
  },
  {
    id: 'q5',
    axis: 'growth',
    prompt: '퇴근(하교) 후 시간이 조금 생긴다면?',
    optionA: '업무나 전공과 관련된 공부를 조금 더 한다',
    optionB: '일과 완전히 분리된 개인 시간을 보낸다',
  },
  {
    id: 'q6',
    axis: 'growth',
    prompt: '더 마음이 가는 제안은?',
    optionA: '배울 게 많지만 야근이 잦은 자리',
    optionB: '배울 건 적지만 칼퇴가 보장되는 자리',
  },
  {
    id: 'q7',
    axis: 'meaning',
    prompt: '두 제안 중 하나만 고른다면?',
    optionA: '연봉은 높지만 의미는 크게 못 느끼는 일',
    optionB: '연봉은 낮지만 의미 있다고 느끼는 일',
  },
  {
    id: 'q8',
    axis: 'meaning',
    prompt: '일을 마치고 뿌듯한 순간은?',
    optionA: '목표한 성과와 보상을 확실히 얻었을 때',
    optionB: '누군가에게 실질적으로 도움이 되었을 때',
  },
  {
    id: 'q9',
    axis: 'creativity',
    prompt: '더 재미있게 느껴지는 업무는?',
    optionA: '내 아이디어로 새로운 걸 만들어보는 업무',
    optionB: '정해진 기준대로 꼼꼼하게 처리하는 업무',
  },
  {
    id: 'q10',
    axis: 'creativity',
    prompt: '평가받는다면 어느 쪽이 더 편해?',
    optionA: '얼마나 새롭고 창의적인 결과물인지로 평가받기',
    optionB: '얼마나 정확하고 기준에 맞는지로 평가받기',
  },
];
