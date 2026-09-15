# 나르샤팜(Narsha Pharm) 기업 랜딩페이지 구축 요구사항 (requirements.md)

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | 나르샤팜 기업 홍보 랜딩페이지 |
| 회사 소개 | 전 세계 의약품 원료(API, Active Pharmaceutical Ingredient) 업체와 한국의 제약 기업을 **제품과 신뢰로 연결**하는 기업 |
| 구축 방식 | Claude Code 기반 **바이브 코딩**(Vibe Coding) — 자연어 프롬프트로 페이지 생성·반복 수정 |
| 참고 소스 | 기존 홈페이지 https://narshapharm.co.kr/ (특히 About 페이지 https://narshapharm.co.kr/8-2/) |
| 페이지 성격 | 단일 스크롤 랜딩페이지 (One-Page). 챕터는 앵커 섹션으로 구성 |
| 출력 언어 | 한국어 중심 + 영문 병기(의약품·제약 B2B 특성상 영문 용어 사용) |

> ⚠️ **현재 상태 공지** : About Us 페이지는 실제 존재하나, **Product List 와 Contact 페이지는 아직 미구성**되어 있다. Product List / Contact 챕터는 아래 기준으로 **합리적인 기본 구조를 설계**하고, 보완 필요 항목은 `[TBD]`로 표기한다.

---

## 2. 디자인 방향

### 2.1 모티브
- 목표 톤: **차분하고 모던한** 의약품·제약 기업의 신뢰감 있는 이미지
- 참고 홈페이지의 색감을 픽셀 단위로 분석해 아래 팔레트를 도출함
- 시각 언어: 많은 화이트/라이트 배경 위에 딥 네이비 블루를 주조로, 블루 액센트와 로고의 골드 포인트로 완성
- 분위기: 깨끗함, 정직함, 전지구적 네트워크(Global Sourcing), 의약품 품질 관리의 엄격함

### 2.2 색상 팔레트 (기존 홈페이지 분석 근거 포함)

| 용도 | 색상 | HEX | 추출 근거 |
|---|---|---|---|
| 주요 브랜드 주조색 | 딥 네이비 | `#0B2E5B` | 히어로 창고 이미지·헤라인 네이비 톤 (`#002040`, `#103050` 등) |
| 액센트 블루(CTA·링크·아이콘) | 로열 블루 | `#0E50C0` | "Why Narsha Pharm?" 아이콘 분석 (`#0E50C0`, `#0F51C1`) |
| 강조 블루(보조 액센트) | 비비드 블루 | `#0172FC` | Featured Products 헤드라인 분석 (`#0172FC`) |
| 포인트 골드(작은 강조·구분선 등) | 앰버 골드 | `#E09000` | 로고 투명 영역 제외 픽셀 분석 (`#E09000`, `#E0A000`) |
| 기본 배경 | 화이트 | `#FFFFFF` | 각 섹션 배경 |
| 섹션 배경(얕은 구분) | 라이트 그레이 | `#F0F0F0` | Why / By The Numbers / Featured 섹션 배경 분석 (`#F0F0F0`) |
| 본문 텍스트 | 다크 네이비 그레이 | `#1F2937` | 기존 페이지 헤드라인·본문 톤 |
| 보조 텍스트 | 미디엄 그레이 | `#6B7280` | 소제목·설명 등 보조 텍스트 |

**사용 원칙**
- 페이지 대부분은 화이트/라이트 그레이, 질감은 최소한(사진 + 카드 레이아웃)
- 딥 네이비는 헤더·히어로·섹션 타이틀·푸터에 집중
- 로열 블루는 CTA 버튼·링크·아이콘 등 **상호작용 요소** 한정
- 골드는 "제품과 신뢰로 연결"이라는 브랜드 가치를 나타내는 **소량의 포인트**로만 사용
- 채도 남용 금지 → 차분함 유지

### 2.3 타이포그래피 (신뢰감 있는 폰트)

| 용도 | 폰트 | 비고 |
|---|---|---|
| 본문·UI(전역) | **Pretendard** (웹폰트) | 한국어 가독성과 현대적인 신뢰감. `--fallback: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif` |
| 영문 표기 | Pretendard 기반 + 필요시 `Poppins`/`Inter` | 로고·히어로의 영문 헤드라인 |
| 숫자(지표) | Pretendard Bold / `tabular-nums` | By The Numbers 수치 강조 |

- 헤드라인은 Bold(700) 이상, 본문은 400/500
- 계층: H1(히어로) → H2(챕터 타이틀) → H3(카드 타이틀) → 본문
- 행간은 여유 있게(본문 `line-height: 1.7` 수준)

---

## 3. 페이지 구조 (챕터 구성)

```
┌─────────────────────────────────────────────────┐
│  헤더(고정) : 로고  │ About Us · Product List · Contact │
├─────────────────────────────────────────────────┤
│  HERO (공통 상단)  "Connected Together"               │
├─────────────────────────────────────────────────┤
│  ① About Us                                       │
│   ├─ 회사 소개 (한 줄 + 본문)                        │
│   ├─ 핵심 서비스 3가지                              │
│   ├─ Why Narsha Pharm? (4가지 강점)                │
│   └─ By The Numbers (4개 지표)                     │
├─────────────────────────────────────────────────┤
│  ② Product List                                   │
│   └─ Featured Products (제품 카드 그리드) [TBD 보강] │
├─────────────────────────────────────────────────┤
│  ③ Contact                                       │
│   └─ 연락처 / 문의 폼 / 오시는 길                   │
├─────────────────────────────────────────────────┤
│  FOOTER : 사업자 정보 (Head office / KGSP / Tel·Fax)│
└─────────────────────────────────────────────────┘
```

- 상단 고정 헤더에 챕터 앵커(About Us / Product List / Contact) 배치
- 각 챕터는 `id`(`#about`, `#products`, `#contact`) 지정, 스크롤 시 부드럽게 이동
- 모바일에서는 헤더 메뉴를 햄버거로 전환

---

## 4. 챕터별 상세 콘텐츠

### 4.0 HERO (공통 상단)
기존 홈페이지 히어로의 카피를 그대로 사용:

- 메인 헤드라인 (영문, 줄바꿈 강조):
  - "Today, Big work!"
  - "Tomorrow Big Run!"
  - "Future Big Fly!"
- 서브 타이틀: "Global Sourcing, Connected Together."
- CTA 버튼 2개:
  - `Explore Products` → `#products` 링크
  - `Become a Partner` → `#contact` 링크
- 배경: 기존 사이트의 물류창고 사진 분위기(쿨 블루 톤) 또는 그에 상응하는 차분한 네이비 그라데이션
- 로고는 상단 헤더에 배치

### 4.1 About Us
> 출처: https://narshapharm.co.kr/8-2/ (이미지 기반 페이지에서 추출한 내용)

**① 회사 소개**
- 캐치카피(안):
  - "나르샤팜은 전 세계 의약품 원료(API) 업체와 한국의 제약 기업을 **제품과 신뢰로 연결**하는 전문 파트너입니다."
  - 영문: "Narsha Pharm connects global API suppliers and Korean pharmaceutical companies with products and trust."
- 본문(안): 전 세계 원료 공급망(인도·중국·유럽 등)을 기반으로 한국 제약사에 우수한 품질의 원료의약품을 안정적으로 공급하며, 원료등록(KDMF)과 규제업무까지 아우르는 토탈 서비스를 제공하는 회사 소개 문구
- `[TBD]` 실제 확정 카피는 회사 확인 후 반영

**② 핵심 서비스 3가지** (기존 홈페이지 아이콘 3종)

| 아이콘 | 영문 타이틀 | 한국어 | 설명(안) |
|---|---|---|---|
| 지구본+돋보기 | API Sourcing | 원료의약품 소싱 | 글로벌 네트워크(인도·중국·유럽) 기반의 원료의약품 소싱 |
| 인증문서 | Regulatory Affairs | 규제 업무 | KDMF 등록 및 변경관리 등 규제 지원 |
| 창고 아이콘 | Warehouse Management | 의약품 관리 | KGSP 창고 기반의 안정적인 의약품 보관·관리 |

**③ Why Narsha Pharm? (4가지 강점)** — 섹션 타이틀: "Why Narsha Pharm?"

1. **Global Network** — 인도, 중국, 유럽 등 원료의약품 글로벌 네트워크 보유
2. **Quality Assurance** — 국제적으로 검증된 제조소와의 협력 (WHO-GMP 등)
3. **Regulatory Affairs** — KDMF 등록 및 변경관리 등 체계적인 원료의약품 전주기 관리
4. **Reliable Supply** — 안정적인 재고 운용으로 신속한 공급 지원

**④ By The Numbers** — 섹션 타이틀: "By The Numbers"

| 지표 | 수치 |
|---|---|
| Global Partners | 30+ |
| KDMF Registration | 60+ |
| Countries | 4+ |
| Years Experience | 10+ |

### 4.2 Product List
> **현재: 아직 구성되지 않음** — 기존 홈페이지에 'Featured Products' 섹션이 있어 이를 기본 골격으로 사용

- 섹션 타이틀: "Featured Products"
- 소제목: "High-quality APIs sourced from trusted global manufacturers"
- 제품 카드 그리드 (6종, 현재 확보된 목록):

| 제품명 | 카테고리 |
|---|---|
| Nizatidine | 소화기계 (H2 길항제) |
| L-Carnitine | 영양제/대사 |
| Ascorbic acid | 비타민 (비타민 C) |
| Upadacitinib | 면역/염증 (JAK 억제제) |
| Vonoprazan Fumarate | 소화기계 (P-CAB) |
| Bempedoic acid | 심혈관 (콜레스테롤) |

- 각 카드는 약병 아이콘(라이센스 이미지 또는 SVG) + 제품명 표기
- `[TBD]` 실제 전체 제품 목록·제품 상세(CAS No., 규격, 원산지 등)는 회사 제공 후 확장 — 이 경우 카드에 표시할 필드를 아래 "제품 카드 확장 규격" 참고

**제품 카드 확장 규격(추후)**: 제품명 / INN / CAS No. / 제조사 / 원산지 / 규격(USP·EP 등) / 등록상태(KDMF 여부) / 문의 CTA

### 4.3 Contact
> **현재: 아직 구성되지 않음** — 아래 기본 구조를 제안

- 섹션 타이틀: "Contact"
- 구성 요소:
  1. **소개 문구(안)**: "궁금하신 점이나 문의하실 내용이 있으시면 아래로 연락해 주세요."
  2. **연락처 카드**:
     - Tel. +82.31.792.8151
     - Fax. +82.31.792.8152
     - 이메일 `[TBD]` (회사 확인 필요)
  3. **문의 폼**(UI 구현 가능, 제출 백엔드는 미정 — 폼 전송은 메일 링크(`mailto:`) 폴백이 안전):
     - 이름 / 회사명 / 이메일 / 연락처 / 문의 유형(제품 문의·파트너십·기타) / 메시지
  4. **오시는 길(주소)** — 아래 "사업자 정보"와 동일한 Head office 주소 표기
- `[TBD]` 정식 연락용 이메일 주소 확보 필요

---

## 5. FOOTER (사업자 정보)

제공된 정보를 그대로 정확히 표기(오타·누락 금지):

```
Head office : No.406,407, 4F, 83, Misagangbyeon-daero 54beon-gil, Hanam-si, Gyeonggi-do, 12919 Korea
본사: 12919 경기도 하남시 미사강변대로54번길 83, 4층 406,407호(풍산동, 워너비프라자)

KGSP Warehouse : 225-3, Daram-ro 36beon-gil, Docheok-myeon, Gwangju-si Gyeonggi-do, 12809 Korea
KGSP 물류센터: 12809 경기도 광주시 도척면 다람로 36번길 225-3

Tel. +82.31.792.8151
Fax. +82.31.792.8152
```

- 영문 주소와 한글 주소를 병기하여 보기 좋게 구성 (본사 / KGSP 물류센터를 두 개 열 또는 블록으로 나눠 제시)
- 하단에 © 나르샤팜 카피라이트 등 `[TBD]` 표기

---

## 6. 로고

- 로고 파일: https://narshapharm.co.kr/wp-content/uploads/2026/04/narsha-pharm-transparent-300x118.png
- 사용 위치: 헤더 좌측 + 모바일 헤더 + 푸터 상단(선택)
- 투명 PNG이므로 라이트 배경(헤더·푸터가 딥 네이비면 로고가 어두운 색인 만큼 **배경색에 따른 반전/대비 확인 필수** — 로고 주 톤이 짙은 네이비/블랙 + 골드이므로 헤더·푸터는 라이트하게 유지하거나 로고에 여백 패딩을 준다)
- 클릭 시 페이지 최상단(`#top`)으로 이동

---

## 7. 반응형 · 기술 요구사항

- 데스크톱(≥1024px) / 태블릿(768–1023px) / 모바일(<768px) 3단계 반응형
- 그리드: 서비스 3개 → 모바일 1열, Why 4개 → 2×2, 제품 6개 → 3×2 → 모바일 1~2열, 지표 4개 → 2×2
- 성능: 이미지 `loading="lazy"`(히어로 제외), 폰트는 `font-display: swap`
- SEO: `<title>`, `<meta description>`, `og:` 태그, 언어 속성(`ko`) 설정
- 접근성: 명암비(본문 대비 4.5:1), 시맨틱 태그(`header`, `main`, `section`, `footer`), 버튼·링크 키보드 포커스
- 기술 스택(제안): 단일 `index.html` (인라인 CSS/JS 권장 — 배포 편의) 또는 정적 생성(HTML+CSS+JS). Claude Code로 파일을 반복 편집하는 구조에 맞춰 **하나의 HTML 파일 + 스타일 파일** 단순 구조 권장
- 문의 폼 백엔드 미정 → 폼은 UI만 구현하고 `mailto:` 폴백 (`[TBD]` 이메일)

---

## 8. 구현 순서 (바이브 코딩 체크리스트)

1. **골격**: 단일 HTML + CSS 구조, 헤더(로고+내비) → HERO → 세 챕터 → 푸터 배치
2. **디자인 토큰**: §2의 팔레트/폰트를 CSS 변수(`:root`)로 정의
3. **About Us**: §4.1 콘텐츠 구현 (소개/서비스/Why/지표)
4. **Product List**: §4.2 Featured Products 그리드 (6개 제품)
5. **Contact**: §4.3 연락처 카드 + 문의 폼(UI) 배치
6. **Footer**: §5 사업자 정보를 정확히 타이핑해 표기
7. **반응형**: 브레이크포인트별 레이아웃 점검
8. **검수**: 각 챕터 앵커 이동, 모바일 햄버거, 버튼 링크, 로고 대비, 폰트 렌더 확인
9. **`[TBD]` 항목 정리**: 회사로부터 확정 카피·제품 목록·이메일 수령 후 반영

---

## 9. 참고 자료

- 기존 홈페이지 본문: https://narshapharm.co.kr/
- About Us: https://narshapharm.co.kr/8-2/
- Product List: 미구성 (https://narshapharm.co.kr/8-2/ 내 Featured Products 섹션 참고)
- Contact: 미구성 (https://narshapharm.co.kr/contact/ 는 존재하나 미구성 상태)
- 로고: https://narshapharm.co.kr/wp-content/uploads/2026/04/narsha-pharm-transparent-300x118.png

---

## 10. 확정 필요 항목 요약 (`[TBD]` 일람)

| 항목 | 설명 |
|---|---|
| About 소개 문구 확정 | 위 카피는 추출 기반의 초안 |
| 전체 제품 목록 | Featured 6종 이외 추가 제품, 제품 상세 필드 |
| Contact 이메일 주소 | Tel/Fax는 확정, 이메일 미확인 |
| 문의 폼 처리 방식 | mailto 폴백 vs 별도 백엔드 |
| 푸터 카피라이트 연도/문구 | 예: © Narsha Pharm. All rights reserved. |
