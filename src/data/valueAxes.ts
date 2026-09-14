export type AxisId = 'stability' | 'autonomy' | 'growth' | 'meaning' | 'creativity';

export interface ValueAxis {
  id: AxisId;
  poleA: { key: string; label: string; emoji: string; desc: string };
  poleB: { key: string; label: string; emoji: string; desc: string };
}

export const VALUE_AXES: ValueAxis[] = [
  {
    id: 'stability',
    poleA: { key: 'stability', label: '안정감', emoji: '🛡️', desc: '예측 가능하고 흔들림 없는 하루' },
    poleB: { key: 'challenge', label: '도전감', emoji: '🚀', desc: '변화가 많고 새로운 일이 계속 생기는 하루' },
  },
  {
    id: 'autonomy',
    poleA: { key: 'collaboration', label: '협업', emoji: '🤝', desc: '함께 의논하고 맞춰가며 일하는 방식' },
    poleB: { key: 'autonomy', label: '자율', emoji: '🧭', desc: '혼자 판단하고 내 방식대로 진행하는 방식' },
  },
  {
    id: 'growth',
    poleA: { key: 'growth', label: '성장', emoji: '📈', desc: '계속 배우고 실력을 늘려가는 것' },
    poleB: { key: 'balance', label: '균형', emoji: '⚖️', desc: '일과 나머지 삶의 균형을 지키는 것' },
  },
  {
    id: 'meaning',
    poleA: { key: 'reward', label: '보상', emoji: '💰', desc: '노력한 만큼 확실한 대가가 돌아오는 것' },
    poleB: { key: 'meaning', label: '의미', emoji: '🌍', desc: '누군가에게 도움이 되고 있다는 감각' },
  },
  {
    id: 'creativity',
    poleA: { key: 'creativity', label: '창의성', emoji: '🎨', desc: '내 생각과 표현을 자유롭게 담는 것' },
    poleB: { key: 'structure', label: '체계성', emoji: '🧩', desc: '정해진 기준으로 정확하게 처리하는 것' },
  },
];
