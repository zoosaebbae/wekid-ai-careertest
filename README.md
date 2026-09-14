# WE:KID | 직업 가치관 × AI 미래직업 테스트

10개의 질문으로 나의 직업 가치관(우선순위)을 확인하고, 선택한 직업이 AI가 발전한 2036년에
어떻게 달라질지 — AI가 맡게 될 업무 / 사람이 더 중요해지는 업무 / AI와 함께하게 될 업무로 나눠
보여주는 참여형 웹 테스트입니다. 회원가입 없이 2~3분 안에 끝낼 수 있어요.

WE:KID × 고양시자원봉사센터 행사 참여형 진로 탐색 콘텐츠로 기획되었습니다.

## 서비스 흐름

```
STEP 1  직업 선택       현재/희망/관심 직업 중 기준 선택 → 검색으로 직업 고르기 (또는 "아직 모르겠어요")
STEP 2  가치관 테스트    이분 선택형 10문항, 선택 즉시 자동으로 다음 문항 이동
STEP 3  결과 분석/결과   가치 우선순위 + AI/사람/협업 업무 분류 + 2036년 전망 + 키울 능력
        결과 이미지 저장, 처음부터 다시하기
```

## 기술 스택

- React 18 + TypeScript + Vite
- html2canvas — 결과 카드를 PNG 이미지로 저장
- 별도 서버/DB 없음 (완전한 정적 사이트, 응답은 저장되지 않고 브라우저 안에서만 계산됩니다)
- 결과 이미지 저장은 모바일 공유 시트(Web Share API)를 우선 시도하고, 지원하지 않는 환경에서는
  다운로드 링크로 대체합니다.

## 폴더 구조

```
src/
├─ data/
│  ├─ valueAxes.ts       # 5개 가치관 축(안정↔도전, 협업↔자율, 성장↔균형, 보상↔의미, 창의↔체계)
│  ├─ valueQuestions.ts  # 축마다 2문항씩, 총 10문항
│  └─ jobs.ts            # 직업 카탈로그 (110여개, 박람회 대상 폭넓은 직업군) — 태그 기반
├─ lib/
│  ├─ scoring.ts         # 10문항 응답 → 가치 우선순위 계산
│  └─ aiImpactEngine.ts  # 직업 태그 + 가치 우선순위 → AI/사람/협업 업무·전망·능력 생성
│                         #  (한국고용정보원 2025 / WEF Future of Jobs Report 2025 패턴을 반영)
├─ pages/
│  ├─ StartScreen.tsx
│  ├─ JobSelectScreen.tsx
│  ├─ QuizScreen.tsx
│  ├─ AnalyzingScreen.tsx
│  └─ ResultScreen.tsx
├─ styles/               # 화면별 CSS (디자인 토큰은 global.css)
└─ App.tsx               # 단계 전환(상태 기계) 및 데이터 연결
```

## 실행 방법

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # dist/ 에 정적 파일 생성 (tsc 검사 포함)
npm run preview    # 빌드 결과 미리보기
```

## 직업 데이터 수정/추가하기

`src/data/jobs.ts`의 `JOBS` 배열에 아래 형식으로 추가하면 끝입니다. 별도의 문장을 직접 쓰지
않아도 `aiImpactEngine.ts`가 태그를 보고 자동으로 AI/사람/협업 업무, 2036년 전망, 추천 능력을
만들어냅니다.

```ts
{
  id: 'new-job',
  name: '직업 이름',
  category: '분류',
  tags: {
    routine: 0.5,     // 반복·정형화 정도 (0~1)
    physical: 0.3,    // 신체·현장 활동 정도
    social: 0.6,      // 대인·정서 상호작용 정도
    creative: 0.4,    // 창의·표현 정도
    analytical: 0.5,  // 데이터·논리 분석 정도
    decision: 0.5,    // 고위험 판단·책임 정도
  },
},
```

특정 직업에 더 정교한 설명을 붙이고 싶다면 `aiImpactEngine.ts`의 `AI_CANDIDATES` /
`HUMAN_CANDIDATES` / `COLLAB_CANDIDATES` / `SKILL_BY_TAG` 배열에 `check` 조건과 함께 문장을
추가하면, 조건을 만족하는 모든 직업에 자동으로 반영됩니다.

## 가치관 질문 수정하기

`src/data/valueQuestions.ts`에서 문항 문구를, `src/data/valueAxes.ts`에서 축 이름·설명을
관리합니다. 각 축은 반드시 2문항씩 짝을 이뤄야 `scoring.ts`의 강도 계산이 정확하게 동작합니다.

## 배포 (Netlify)

1. 이 폴더를 GitHub 저장소로 올립니다.
2. Netlify에서 "Add new site → Import an existing project"로 저장소를 연결합니다.
3. Build command: `npm run build`, Publish directory: `dist`
4. 별도 환경 변수는 필요 없습니다.

## 주의사항

이 테스트는 특정 직업의 소멸·대체 확률이나 고용 가능성을 단정하지 않는 참여형 참고자료입니다.
결과는 재미와 대화의 출발점으로 활용해주세요.
