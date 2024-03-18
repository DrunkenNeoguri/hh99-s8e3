# GitHub ReadMe

---

# 항해 99 8기 3조 실전 프로젝트 - MIMIC!

![mimic.png](https://raw.githubusercontent.com/hanghae99-s8realweek-E3/frontend/main/public/images/ogimage.png)

---

### 📖 프로젝트 소개

> **매일 반복되는 하루,  지겹지는 않으신가요?**
>
> 미믹(MIMIC)이란, ‘흉내쟁이’ 또는 ‘따라쟁이’라는 의미를 가진 단어입니다.
> 
> 요즘 뜨는 MBTI에서 영감을 얻어서 나와 다른 성향을 가진 사람들의 일상을 살아보면 어떨까?
> 또, 나의 일상이 다른 사람들의 일상이 된다면 어떨까? 라는 취지로 제작된,
> 타인과 나의 일상을 체험해보도록 하는 조금 특이한 SNS입니다.

**[😀 당신의 하루, 그리고 나의 하루. MIMIC 이동하기 (현재 서비스 종료) →](https://todaysmimic.today)**

**[🌐 GitHub BackEnd Repository](https://github.com/hanghae99-s8realweek-E3/backend)**

---

### 🗓️ 프로젝트 운영 기간

- 개발 기간: 2022년 8월 26일 ~ 2022년 10월 7일
- 운영 기간: 2022년 9월 27일 ~ 2022년 10월 7일
- 런칭: 2022년 9월 27일 (Ver.1.0.0)
- 추가 업데이트: 2022년 10월 3일 (Ver.1.1.0)

---

## 🔣 핵심 기능

- 많은 사람들의 일상을 구경할 수 있는 피드 목록
- MBTI나 도전 완료 여부, 순서 등 피드를 원하는 대로 볼 수 있는 정렬 기능
- 타인의 도전을 진행하거나, 내가 도전을 제안할 수 있는 미믹 페이지
- 사이트 내 활동량에 따라 모습이 변화하는 등급 기능
- 간단한 유형 검사를 통해 나는 어떤 MBTI 타입인지를 판단하고, 공유하 수 있는 심리 검사 기능
- 시각 장애인도 이용할 수 있도록 개선한 접근성 강화

---

### 🏗️ 기술 스택 및 아키쳐

- **React**
- **Redux / Toolkit, thunk**
- **Axios**
- **AWS (S3, CloudFront, IAM, Route 53, Certificate**
- FontAwesome
- styled-components
- swiper
- react-calendar

(이미지)

---

## 💿 주요 기술 및 의사 결정

| 담당 분야 | 사용 기술 | 의사 결정 이유 |
| --- | --- | --- |
| FrontEnd | Redux | - 다른 상태 라이브러리와 비교할 때, 서버 관련 라이브러리를 설치할 필요 없이 thunk라는 미들웨어를 통해서 서버에서 받아온 데이터를 전역 관리 라이브러리 속에 저장해 관리할 수 있다는 점에서 해당 라이브러리를 선택했습니다. |
|  | Axios | - 하나의 인스턴스 내에서 원활환 데이터 통신 관리를 주고 받을 수 있다는 점, fetch API를 작성할 때 입력할 사항을 줄일 수 있다는 점에서 해당 라이브러리를 선택했습니다. |
|  | styled-components | - 가장 익숙했던 라이브러리라는 점도 있지만, 그만큼 React에서 가장 중요한 ‘Component’를 레고 블록처럼 가져다 쓰듯이 재활용하는 방법을 고려하면 해당 라이브러리가 가장 적합하다고 판단했습니다. |
|  | Amazon S3, CloudFront, Route 53 | - Vercel을 이용한 배포는 자동으로 인증서 처리나 도메인 발급 등을 해준다는 점에서 좋다고 생각하지만, CloudFront의 장점인 cdn(컨텐츠 전송 네트워크)를 활용한다면 어느 지역을 이용하더라도 저희의 웹 컨텐츠에 접근하기 쉬울 것이라 생각해서 사용했습니다. |
| BackEnd | Nginx | nginx는 이벤트 루프 방식을 사용하여 비동기 처리를 하며, 리버스 프록시로 사용 가능하다는 장점이 있습니다. nginx를 리버스 프록시로 was 앞단에 둠으로써 DB와 연결된 was 서버와 직접적인 통신을 하지 않아 보안을 강화할 수 있습니다. 또한 리버스 프록시를 이용하여 로드밸런싱 처리를 할 수 있어 서버 부하를 방지할 수 있을 뿐만 아니라, 하나의 서버가 멈추더라도 다른 서버가 서비스를 유지할 수 있으므로 싱글 스레드인 node.js의 단점을 보완할 수 있어 사용하였습니다. |
|  | redis | 사이트에 접속 할경우의 방문자의 IP를 저장하여(중복되지 않게) 하루의 방문자를 카운터를 해야하는데, 접속할때 마다 사용자 정보를 mysql DB에 매번 업데이트하기에는 요청이 많이 생긴다고 판단하였고 그러하여 redis를 보조 DB로 사용하여 위 점을 개선하였습니다. |
|  | multer, s3, Lambda | S3 엑세스키 유출 방지를 위해 백엔드에서 이미지 파일을 처리했습니다. 우선 multipart/form-data를 읽기 위해서 multer 라이브러리를 사용했고, 서버의 부담을 줄이기 위해 aws s3에 업로드하여 관리하였습니다. 또한 이미지 크기 제한 때문에 사용자가 이미지 업로드에 어려움을 겪는 일을 줄이기 위해 제한은 느슨하게 하는 대신 이미지 리사이징을 하였고, aws Lambda를 이용하여 리사이징 작업을 서버와 분리하였습니다.  |
|  | Jenkins | 로드 밸런싱 적용으로 인해 2개의 서버가 존재하게 되었는데, 서버에 수정 사항 반영시 각 각 직접 배포를 하는 상황이 자원 낭비라고 판단을 하였고 이를 해결하기 위한 인프라 구축을 하기로 함 |
| 공통 | JIRA Software, GitHub Project | 6주 동안 원활한 작업 관리를 진행하기 위해 1주일마다 스프린트화하여 진행 상황을 체크할 수 있는 JIRA Software를 통해 작업 사항들을 관리했습니다. 런칭 전후로 생겨난 이슈는 바로바로 Github에 이슈를 등록하고 관리할 수 있도록 GitHub Project를 통해 버그 트래킹을 진행했습니다. |
|  | Sentry | 배포 이후, 유저들이 이용 중 발생한 에러 이슈들을 프론트엔드에서도 모니터링을 할 수 있고, 백엔드에서는 사이트 내에서 발생하는 오류 빈도를 수집하고 분석할 수 있다는 점에서 유용하다고 판단하여 Sentry를 사용했습니다. |

---

### 👥 팀 멤버

| 직책 | 이름 | 분야 | Github URL |
| --- | --- | --- | --- |
| 리더 | 신도윤 | FrontEnd (React) | https://github.com/DrunkenNeoguri |
| 부리더 | 장지유 | BackEnd (Node.js) | https://github.com/jangjiyu |
| 팀원 | 김대연 | FrontEnd (React) | https://github.com/rlaedous |
| 팀원 | 서우혁 | BackEnd (Node.js) | https://github.com/WHS95 |
| 팀원 | 이호진 | FrontEnd (React) | https://github.com/hojncode |

---

### 📂 파일 구조

  ```jsx
  src
  ├─ app
  │  ├─ modules
  │  │  ├─ accountsSlice.jsx
  │  │  ├─ ...
  │  └─ store.js
  ├─ App.css
  ├─ App.js
  ├─ App.test.js
  ├─ components
  │  ├─ common
  │  │  ├─ ChallengeCard.jsx
  │  │  ├─ ...
  │  ├─ features
  │  │  ├─ activity
  │  │  │  └─ ActivityContainer.jsx
  │  │  ├─ changePW
  │  │  ├─ error
  │  │  ├─ ...
  │  └─ interface
  │     └─ styledCommon.jsx
  ├─ images
  │  ├─ background1.png
  │  ├─ ...
  ├─ index.css
  ├─ index.js
  ├─ layout
  │  └─ layout.jsx
  ├─ logo.svg
  ├─ pages
  │  ├─ activity.jsx
  │  ├─ changePW.jsx
  │  ├─ errorPage.jsx
  │  ├─ ...
  ├─ router
  │  └─ router.jsx
  └─ utils
     ├─ commonFunc.jsx
     ├─ cookie.jsx
     ├─ ...
  ```

❗ **폴더별 설명**

📂 **Pages**

- 사이트의 각 화면을 구성하고 있는 웹페이지들을 관리하는 폴더입니다.

📂 **Pages**

- 컴포넌트가 아니지만, 웹페이지 내에서 공용적으로 쓰일 수 있는 요소들을 관리하는 폴더입니다.

📂 **Router**

- 페이지 간의 경로(path)를 관리하기 위한 router 파일이 배치된 폴더입니다.

📂 **Layout**

- 페이지의 뼈대가 되는 layout 파일이 배치된 폴더입니다.

📂 **images**

- public 폴더에서 관리되기 어려운 이미지 파일들을 저장한 폴더입니다.

📂 **components**

- 각 페이지의 화면을 구성하는 컴포넌트들을 관리하기 위한 폴더입니다.
  - common: 화면에 공통적으로 쓰이는 기능적인 UI(헤더, 풋터 등) 컴포넌트들을 관리합니다.
  - featrues: 각 페이지별 화면에서만 쓰이게 되는 기능적인 컴포넌트들을 관리합니다.
    - 해당 컴포넌트들은 연관될 사항을 찾기 쉽도록 각 페이지의 이름을 딴 폴더에서 관리하도록 했습니다.
  - interface: 화면에 공통적으로 쓰이는 UI로서만 쓰이는 컴포넌트들을 관리합니다.

📂 **app**

- React 외의 핵심 라이브러리를 관리하는 폴더입니다.
  Redux와 관련한 사항들이 해당 폴더에서 관리되고 있습니다.
- store.js: Redux의 전역 상태 관리를 담당하는 store가 담겨 있습니다.
- modules: Redux에서 쓰이는 Slice들을 관리하기 위한 폴더입니다.
