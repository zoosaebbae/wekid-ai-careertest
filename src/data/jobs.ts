export interface JobTags {
  routine: number; // 반복·정형화 정도
  physical: number; // 신체·현장 활동 정도
  social: number; // 대인·정서 상호작용 정도
  creative: number; // 창의·표현 정도
  analytical: number; // 데이터·논리 분석 정도
  decision: number; // 고위험 판단·책임 정도
}

export interface Job {
  id: string;
  name: string;
  category: string;
  aliases?: string[];
  tags: JobTags;
}

export const JOBS: Job[] = [
  { id: 'teacher', name: '초중고 교사', category: '교육', tags: { routine: 0.3, physical: 0.2, social: 0.9, creative: 0.5, analytical: 0.3, decision: 0.6 } },
  { id: 'professor', name: '대학교수/연구원', category: '교육', tags: { routine: 0.2, physical: 0.1, social: 0.5, creative: 0.7, analytical: 0.9, decision: 0.7 } },
  { id: 'kinder-teacher', name: '유치원/보육교사', category: '교육', tags: { routine: 0.5, physical: 0.5, social: 0.9, creative: 0.5, analytical: 0.2, decision: 0.5 } },
  { id: 'nurse', name: '간호사', category: '의료', tags: { routine: 0.5, physical: 0.7, social: 0.9, creative: 0.2, analytical: 0.5, decision: 0.7 } },
  { id: 'doctor', name: '의사', category: '의료', tags: { routine: 0.3, physical: 0.4, social: 0.7, creative: 0.3, analytical: 0.9, decision: 0.95 } },
  { id: 'pharmacist', name: '약사', category: '의료', tags: { routine: 0.6, physical: 0.3, social: 0.6, creative: 0.2, analytical: 0.8, decision: 0.6 } },
  { id: 'physical-therapist', name: '물리치료사', category: '의료', tags: { routine: 0.5, physical: 0.8, social: 0.8, creative: 0.3, analytical: 0.5, decision: 0.5 } },
  { id: 'vet', name: '수의사', category: '의료', tags: { routine: 0.4, physical: 0.6, social: 0.7, creative: 0.3, analytical: 0.8, decision: 0.8 } },
  { id: 'counselor', name: '상담심리사', category: '상담/복지', tags: { routine: 0.2, physical: 0.1, social: 0.95, creative: 0.4, analytical: 0.5, decision: 0.6 } },
  { id: 'social-worker', name: '사회복지사', category: '상담/복지', tags: { routine: 0.4, physical: 0.3, social: 0.95, creative: 0.3, analytical: 0.4, decision: 0.6 } },
  { id: 'developer', name: '소프트웨어 개발자', category: 'IT/개발', tags: { routine: 0.3, physical: 0.1, social: 0.3, creative: 0.7, analytical: 0.9, decision: 0.6 } },
  { id: 'data-analyst', name: '데이터 분석가', category: 'IT/개발', tags: { routine: 0.4, physical: 0.1, social: 0.3, creative: 0.4, analytical: 0.95, decision: 0.6 } },
  { id: 'game-planner', name: '게임 기획자', category: 'IT/개발', tags: { routine: 0.3, physical: 0.1, social: 0.5, creative: 0.9, analytical: 0.5, decision: 0.5 } },
  { id: 'ux-designer', name: 'UX/UI 디자이너', category: '디자인', tags: { routine: 0.2, physical: 0.1, social: 0.5, creative: 0.9, analytical: 0.4, decision: 0.5 } },
  { id: 'graphic-designer', name: '그래픽 디자이너', category: '디자인', tags: { routine: 0.3, physical: 0.1, social: 0.3, creative: 0.95, analytical: 0.2, decision: 0.4 } },
  { id: 'architect', name: '건축가', category: '디자인', tags: { routine: 0.3, physical: 0.2, social: 0.5, creative: 0.8, analytical: 0.6, decision: 0.7 } },
  { id: 'accountant', name: '회계사', category: '금융/사무', tags: { routine: 0.7, physical: 0.1, social: 0.3, creative: 0.1, analytical: 0.9, decision: 0.6 } },
  { id: 'bank-teller', name: '은행원', category: '금융/사무', tags: { routine: 0.7, physical: 0.2, social: 0.8, creative: 0.2, analytical: 0.5, decision: 0.4 } },
  { id: 'financial-analyst', name: '금융/투자 분석가', category: '금융/사무', tags: { routine: 0.4, physical: 0.1, social: 0.4, creative: 0.3, analytical: 0.95, decision: 0.8 } },
  { id: 'lawyer', name: '변호사', category: '법률', tags: { routine: 0.3, physical: 0.1, social: 0.6, creative: 0.3, analytical: 0.85, decision: 0.85 } },
  { id: 'civil-servant', name: '공무원(행정)', category: '금융/사무', tags: { routine: 0.8, physical: 0.1, social: 0.5, creative: 0.2, analytical: 0.5, decision: 0.5 } },
  { id: 'hr', name: '인사(HR) 담당자', category: '금융/사무', tags: { routine: 0.5, physical: 0.1, social: 0.8, creative: 0.3, analytical: 0.4, decision: 0.5 } },
  { id: 'police', name: '경찰관', category: '공공안전', tags: { routine: 0.4, physical: 0.7, social: 0.8, creative: 0.2, analytical: 0.5, decision: 0.8 } },
  { id: 'firefighter', name: '소방관', category: '공공안전', tags: { routine: 0.3, physical: 0.95, social: 0.7, creative: 0.2, analytical: 0.3, decision: 0.8 } },
  { id: 'soldier', name: '직업군인', category: '공공안전', tags: { routine: 0.5, physical: 0.9, social: 0.6, creative: 0.2, analytical: 0.4, decision: 0.7 } },
  { id: 'pilot', name: '파일럿', category: '운송', tags: { routine: 0.6, physical: 0.3, social: 0.4, creative: 0.2, analytical: 0.6, decision: 0.9 } },
  { id: 'flight-attendant', name: '승무원', category: '운송', tags: { routine: 0.5, physical: 0.5, social: 0.9, creative: 0.2, analytical: 0.2, decision: 0.5 } },
  { id: 'driver', name: '택시/버스 기사', category: '운송', tags: { routine: 0.7, physical: 0.5, social: 0.5, creative: 0.1, analytical: 0.2, decision: 0.4 } },
  { id: 'logistics', name: '물류/배송기사', category: '운송', tags: { routine: 0.7, physical: 0.8, social: 0.4, creative: 0.1, analytical: 0.2, decision: 0.3 } },
  { id: 'air-controller', name: '항공관제사', category: '운송', tags: { routine: 0.5, physical: 0.1, social: 0.5, creative: 0.1, analytical: 0.8, decision: 0.95 } },
  { id: 'sales', name: '영업직', category: '마케팅/영업', tags: { routine: 0.3, physical: 0.3, social: 0.95, creative: 0.4, analytical: 0.3, decision: 0.5 } },
  { id: 'marketer', name: '마케터', category: '마케팅/영업', tags: { routine: 0.3, physical: 0.1, social: 0.6, creative: 0.8, analytical: 0.6, decision: 0.5 } },
  { id: 'translator', name: '통번역가', category: '마케팅/영업', tags: { routine: 0.5, physical: 0.1, social: 0.4, creative: 0.5, analytical: 0.5, decision: 0.4 } },
  { id: 'chef', name: '요리사(셰프)', category: '요식업', tags: { routine: 0.4, physical: 0.8, social: 0.5, creative: 0.8, analytical: 0.2, decision: 0.5 } },
  { id: 'barista', name: '바리스타', category: '요식업', tags: { routine: 0.6, physical: 0.5, social: 0.7, creative: 0.5, analytical: 0.1, decision: 0.3 } },
  { id: 'hairdresser', name: '미용사(헤어디자이너)', category: '뷰티', tags: { routine: 0.4, physical: 0.6, social: 0.8, creative: 0.8, analytical: 0.2, decision: 0.4 } },
  { id: 'farmer', name: '농업인/축산업', category: '1차산업', tags: { routine: 0.5, physical: 0.9, social: 0.3, creative: 0.3, analytical: 0.3, decision: 0.5 } },
  { id: 'factory-worker', name: '제조업 생산직', category: '제조/생산', tags: { routine: 0.8, physical: 0.8, social: 0.3, creative: 0.1, analytical: 0.2, decision: 0.3 } },
  { id: 'construction', name: '건설 현장 기술자', category: '제조/생산', tags: { routine: 0.5, physical: 0.9, social: 0.4, creative: 0.3, analytical: 0.4, decision: 0.6 } },
  { id: 'engineer', name: '전기/기계 엔지니어', category: '제조/생산', tags: { routine: 0.4, physical: 0.5, social: 0.3, creative: 0.5, analytical: 0.8, decision: 0.6 } },
  { id: 'automation-engineer', name: '공장 자동화 엔지니어', category: '제조/생산', tags: { routine: 0.4, physical: 0.4, social: 0.3, creative: 0.5, analytical: 0.8, decision: 0.6 } },
  { id: 'editor', name: '영상 편집자/콘텐츠 제작자', category: '콘텐츠', tags: { routine: 0.3, physical: 0.2, social: 0.5, creative: 0.9, analytical: 0.3, decision: 0.4 } },
  { id: 'youtuber', name: '유튜버/인플루언서', category: '콘텐츠', tags: { routine: 0.2, physical: 0.2, social: 0.8, creative: 0.95, analytical: 0.3, decision: 0.5 } },
  { id: 'writer', name: '작가/소설가', category: '콘텐츠', tags: { routine: 0.1, physical: 0.1, social: 0.2, creative: 0.95, analytical: 0.3, decision: 0.4 } },
  { id: 'musician', name: '음악가/뮤지션', category: '콘텐츠', tags: { routine: 0.2, physical: 0.3, social: 0.5, creative: 0.95, analytical: 0.2, decision: 0.4 } },
  { id: 'athlete', name: '운동선수', category: '스포츠', tags: { routine: 0.5, physical: 0.95, social: 0.5, creative: 0.3, analytical: 0.3, decision: 0.6 } },
  { id: 'pro-gamer', name: '프로게이머', category: '스포츠', tags: { routine: 0.4, physical: 0.3, social: 0.4, creative: 0.5, analytical: 0.5, decision: 0.6 } },

  // 교육/상담 추가
  { id: 'special-ed-teacher', name: '특수교사', category: '교육', tags: { routine: 0.3, physical: 0.4, social: 0.95, creative: 0.5, analytical: 0.3, decision: 0.6 } },
  { id: 'librarian', name: '사서', category: '교육', tags: { routine: 0.6, physical: 0.2, social: 0.5, creative: 0.2, analytical: 0.5, decision: 0.3 } },
  { id: 'career-coach', name: '진로상담교사/취업컨설턴트', category: '상담/복지', tags: { routine: 0.3, physical: 0.1, social: 0.9, creative: 0.3, analytical: 0.4, decision: 0.5 } },
  { id: 'care-worker', name: '요양보호사', category: '상담/복지', tags: { routine: 0.5, physical: 0.7, social: 0.9, creative: 0.1, analytical: 0.1, decision: 0.4 } },
  { id: 'art-therapist', name: '미술/음악 치료사', category: '상담/복지', tags: { routine: 0.2, physical: 0.2, social: 0.9, creative: 0.7, analytical: 0.3, decision: 0.5 } },

  // 의료 추가
  { id: 'dentist', name: '치과의사', category: '의료', tags: { routine: 0.4, physical: 0.6, social: 0.6, creative: 0.2, analytical: 0.7, decision: 0.8 } },
  { id: 'dental-hygienist', name: '치위생사', category: '의료', tags: { routine: 0.6, physical: 0.6, social: 0.7, creative: 0.1, analytical: 0.3, decision: 0.4 } },
  { id: 'radiologic-tech', name: '방사선사/임상병리사', category: '의료', tags: { routine: 0.7, physical: 0.4, social: 0.4, creative: 0.1, analytical: 0.6, decision: 0.5 } },
  { id: 'paramedic', name: '응급구조사', category: '의료', tags: { routine: 0.3, physical: 0.8, social: 0.7, creative: 0.1, analytical: 0.4, decision: 0.85 } },

  // IT 추가
  { id: 'ai-engineer', name: 'AI/머신러닝 엔지니어', category: 'IT/개발', tags: { routine: 0.3, physical: 0.1, social: 0.3, creative: 0.6, analytical: 0.95, decision: 0.6 } },
  { id: 'security-engineer', name: '정보보안 전문가', category: 'IT/개발', tags: { routine: 0.4, physical: 0.1, social: 0.3, creative: 0.4, analytical: 0.9, decision: 0.7 } },
  { id: 'cloud-engineer', name: '클라우드/인프라 엔지니어', category: 'IT/개발', tags: { routine: 0.5, physical: 0.1, social: 0.3, creative: 0.3, analytical: 0.85, decision: 0.55 } },

  // 디자인/콘텐츠 추가
  { id: 'fashion-designer', name: '패션디자이너', category: '디자인', tags: { routine: 0.3, physical: 0.3, social: 0.4, creative: 0.95, analytical: 0.2, decision: 0.4 } },
  { id: 'interior-designer', name: '인테리어 디자이너', category: '디자인', tags: { routine: 0.3, physical: 0.3, social: 0.6, creative: 0.85, analytical: 0.4, decision: 0.5 } },
  { id: 'photographer', name: '사진작가', category: '콘텐츠', tags: { routine: 0.2, physical: 0.4, social: 0.5, creative: 0.9, analytical: 0.2, decision: 0.4 } },
  { id: 'broadcast-writer', name: '방송작가', category: '콘텐츠', tags: { routine: 0.3, physical: 0.1, social: 0.4, creative: 0.9, analytical: 0.3, decision: 0.4 } },
  { id: 'pd-director', name: 'PD/영화감독', category: '콘텐츠', tags: { routine: 0.2, physical: 0.3, social: 0.7, creative: 0.9, analytical: 0.3, decision: 0.7 } },
  { id: 'actor', name: '배우/모델', category: '콘텐츠', tags: { routine: 0.2, physical: 0.5, social: 0.6, creative: 0.9, analytical: 0.1, decision: 0.4 } },
  { id: 'voice-actor', name: '성우/아나운서', category: '콘텐츠', tags: { routine: 0.3, physical: 0.2, social: 0.5, creative: 0.8, analytical: 0.2, decision: 0.4 } },
  { id: 'journalist', name: '기자', category: '콘텐츠', tags: { routine: 0.3, physical: 0.3, social: 0.8, creative: 0.6, analytical: 0.6, decision: 0.6 } },
  { id: 'curator', name: '큐레이터/학예사', category: '콘텐츠', tags: { routine: 0.3, physical: 0.2, social: 0.5, creative: 0.7, analytical: 0.5, decision: 0.4 } },
  { id: 'sound-engineer', name: '음향/조명 감독', category: '콘텐츠', tags: { routine: 0.3, physical: 0.5, social: 0.4, creative: 0.7, analytical: 0.4, decision: 0.5 } },

  // 금융/법률/행정 추가
  { id: 'tax-accountant', name: '세무사', category: '금융/사무', tags: { routine: 0.7, physical: 0.1, social: 0.4, creative: 0.1, analytical: 0.85, decision: 0.6 } },
  { id: 'appraiser', name: '감정평가사', category: '금융/사무', tags: { routine: 0.5, physical: 0.3, social: 0.4, creative: 0.2, analytical: 0.8, decision: 0.65 } },
  { id: 'labor-attorney', name: '노무사/관세사', category: '법률', tags: { routine: 0.5, physical: 0.1, social: 0.5, creative: 0.2, analytical: 0.8, decision: 0.6 } },
  { id: 'judge', name: '판사/검사', category: '법률', tags: { routine: 0.3, physical: 0.1, social: 0.5, creative: 0.2, analytical: 0.9, decision: 0.95 } },
  { id: 'realtor', name: '공인중개사', category: '금융/사무', tags: { routine: 0.5, physical: 0.3, social: 0.85, creative: 0.2, analytical: 0.4, decision: 0.5 } },
  { id: 'insurance-agent', name: '보험설계사', category: '금융/사무', tags: { routine: 0.4, physical: 0.1, social: 0.9, creative: 0.2, analytical: 0.4, decision: 0.4 } },
  { id: 'diplomat', name: '외교관/공공행정가', category: '금융/사무', tags: { routine: 0.4, physical: 0.1, social: 0.8, creative: 0.3, analytical: 0.6, decision: 0.75 } },
  { id: 'corrections-officer', name: '교정직/세관 공무원', category: '공공안전', tags: { routine: 0.6, physical: 0.5, social: 0.6, creative: 0.1, analytical: 0.3, decision: 0.6 } },
  { id: 'postal-worker', name: '우체국 집배원', category: '운송', tags: { routine: 0.7, physical: 0.7, social: 0.5, creative: 0.1, analytical: 0.1, decision: 0.3 } },
  { id: 'security-guard', name: '경호원/보안요원', category: '공공안전', tags: { routine: 0.5, physical: 0.7, social: 0.5, creative: 0.1, analytical: 0.2, decision: 0.6 } },

  // 공학/제조/기술 추가
  { id: 'auto-mechanic', name: '자동차 정비사', category: '기술/정비', tags: { routine: 0.5, physical: 0.8, social: 0.4, creative: 0.2, analytical: 0.4, decision: 0.55 } },
  { id: 'electrician', name: '전기기사', category: '기술/정비', tags: { routine: 0.5, physical: 0.8, social: 0.3, creative: 0.2, analytical: 0.4, decision: 0.6 } },
  { id: 'plumber', name: '배관공', category: '기술/정비', tags: { routine: 0.4, physical: 0.85, social: 0.3, creative: 0.2, analytical: 0.3, decision: 0.5 } },
  { id: 'welder', name: '용접공', category: '기술/정비', tags: { routine: 0.5, physical: 0.9, social: 0.2, creative: 0.2, analytical: 0.2, decision: 0.4 } },
  { id: 'carpenter', name: '목수/가구제작자', category: '기술/정비', tags: { routine: 0.4, physical: 0.85, social: 0.3, creative: 0.6, analytical: 0.2, decision: 0.4 } },
  { id: 'boiler-tech', name: '보일러 설치·정비원', category: '기술/정비', tags: { routine: 0.4, physical: 0.9, social: 0.3, creative: 0.1, analytical: 0.3, decision: 0.5 } },
  { id: 'shipbuilder', name: '선박 조립원/기관사', category: '기술/정비', tags: { routine: 0.5, physical: 0.9, social: 0.3, creative: 0.2, analytical: 0.3, decision: 0.5 } },
  { id: 'aircraft-mechanic', name: '항공정비사', category: '기술/정비', tags: { routine: 0.5, physical: 0.8, social: 0.3, creative: 0.2, analytical: 0.5, decision: 0.65 } },
  { id: 'robotics-engineer', name: '로봇공학자', category: '제조/생산', tags: { routine: 0.3, physical: 0.4, social: 0.3, creative: 0.6, analytical: 0.85, decision: 0.6 } },
  { id: 'semiconductor-engineer', name: '반도체 공정기술자', category: '제조/생산', tags: { routine: 0.5, physical: 0.4, social: 0.3, creative: 0.3, analytical: 0.8, decision: 0.55 } },
  { id: 'renewable-engineer', name: '신재생에너지 기술자', category: '제조/생산', tags: { routine: 0.4, physical: 0.5, social: 0.3, creative: 0.4, analytical: 0.7, decision: 0.55 } },
  { id: 'environmental-engineer', name: '환경공학 기술자', category: '제조/생산', tags: { routine: 0.4, physical: 0.4, social: 0.4, creative: 0.3, analytical: 0.75, decision: 0.55 } },

  // 1차 산업/현장직 추가
  { id: 'fisherman', name: '어업 종사자', category: '1차산업', tags: { routine: 0.5, physical: 0.9, social: 0.3, creative: 0.2, analytical: 0.2, decision: 0.5 } },
  { id: 'forester', name: '임업 종사자', category: '1차산업', tags: { routine: 0.5, physical: 0.85, social: 0.3, creative: 0.2, analytical: 0.2, decision: 0.4 } },
  { id: 'florist', name: '플로리스트/조경사', category: '1차산업', tags: { routine: 0.4, physical: 0.6, social: 0.5, creative: 0.8, analytical: 0.2, decision: 0.3 } },

  // 뷰티/요식업 추가
  { id: 'makeup-artist', name: '메이크업 아티스트', category: '뷰티', tags: { routine: 0.4, physical: 0.5, social: 0.8, creative: 0.85, analytical: 0.1, decision: 0.3 } },
  { id: 'nail-artist', name: '네일 아티스트', category: '뷰티', tags: { routine: 0.5, physical: 0.6, social: 0.7, creative: 0.7, analytical: 0.1, decision: 0.2 } },
  { id: 'baker', name: '제빵사/파티시에', category: '요식업', tags: { routine: 0.6, physical: 0.7, social: 0.4, creative: 0.6, analytical: 0.2, decision: 0.3 } },
  { id: 'cook', name: '조리사(한식/양식)', category: '요식업', tags: { routine: 0.6, physical: 0.75, social: 0.4, creative: 0.4, analytical: 0.1, decision: 0.3 } },

  // 운송/현장 서비스 추가
  { id: 'train-driver', name: '철도/지하철 기관사', category: '운송', tags: { routine: 0.7, physical: 0.2, social: 0.2, creative: 0.1, analytical: 0.3, decision: 0.7 } },
  { id: 'ship-captain', name: '도선사/선장', category: '운송', tags: { routine: 0.4, physical: 0.5, social: 0.4, creative: 0.1, analytical: 0.5, decision: 0.85 } },
  { id: 'delivery-rider', name: '배달라이더', category: '운송', tags: { routine: 0.6, physical: 0.7, social: 0.4, creative: 0.1, analytical: 0.1, decision: 0.3 } },

  // 반려동물/기타 서비스
  { id: 'pet-groomer', name: '반려동물 미용사', category: '서비스', tags: { routine: 0.5, physical: 0.6, social: 0.6, creative: 0.5, analytical: 0.1, decision: 0.3 } },
  { id: 'animal-trainer', name: '동물조련사', category: '서비스', tags: { routine: 0.4, physical: 0.7, social: 0.5, creative: 0.4, analytical: 0.2, decision: 0.4 } },
  { id: 'funeral-director', name: '장례지도사', category: '서비스', tags: { routine: 0.4, physical: 0.4, social: 0.85, creative: 0.2, analytical: 0.2, decision: 0.5 } },
  { id: 'call-center', name: '고객상담원(콜센터)', category: '서비스', tags: { routine: 0.7, physical: 0.1, social: 0.8, creative: 0.1, analytical: 0.2, decision: 0.3 } },
  { id: 'flight-dispatcher', name: '여행/항공 예약 상담원', category: '서비스', tags: { routine: 0.6, physical: 0.1, social: 0.7, creative: 0.2, analytical: 0.3, decision: 0.3 } },

  // 스포츠/기타
  { id: 'sports-trainer', name: '스포츠 트레이너', category: '스포츠', tags: { routine: 0.4, physical: 0.8, social: 0.7, creative: 0.3, analytical: 0.3, decision: 0.5 } },
  { id: 'yoga-instructor', name: '요가/필라테스 강사', category: '스포츠', tags: { routine: 0.4, physical: 0.8, social: 0.7, creative: 0.4, analytical: 0.1, decision: 0.3 } },
  { id: 'esports-coach', name: 'e스포츠 감독/코치', category: '스포츠', tags: { routine: 0.3, physical: 0.2, social: 0.6, creative: 0.4, analytical: 0.6, decision: 0.6 } },
  { id: 'religious-worker', name: '성직자/종교인', category: '서비스', tags: { routine: 0.3, physical: 0.2, social: 0.9, creative: 0.4, analytical: 0.3, decision: 0.6 } },
];

export const CATEGORIES = Array.from(new Set(JOBS.map((j) => j.category)));

function averageTags(): JobTags {
  const sum = JOBS.reduce(
    (acc, j) => ({
      routine: acc.routine + j.tags.routine,
      physical: acc.physical + j.tags.physical,
      social: acc.social + j.tags.social,
      creative: acc.creative + j.tags.creative,
      analytical: acc.analytical + j.tags.analytical,
      decision: acc.decision + j.tags.decision,
    }),
    { routine: 0, physical: 0, social: 0, creative: 0, analytical: 0, decision: 0 },
  );
  const n = JOBS.length;
  return {
    routine: sum.routine / n,
    physical: sum.physical / n,
    social: sum.social / n,
    creative: sum.creative / n,
    analytical: sum.analytical / n,
    decision: sum.decision / n,
  };
}

export const UNKNOWN_JOB: Job = {
  id: 'unknown',
  name: '아직 정하지 않은 나의 미래 직업',
  category: '탐색 중',
  tags: averageTags(),
};
