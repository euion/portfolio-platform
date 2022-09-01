# 포트폴리오 공유 서비스 프론트엔드 코드

## 실행 방법

## react-srcipts start 실행

> yarn은 사실 npm 패키지입니다. yarn부터 설치합니다.
> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다.  
> 즉, 라이브러리 설치 커맨드입니다.  
> yarn 입력 시 자동으로, package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

```bash
npm install --global yarn
yarn
yarn start
```

## 파일 구조 설명

1. **src 폴더**

- Header.js: 네비게이션 바
- Porfolio.js: 메인 화면을 구성하는, 5개 MVP를 모두 포함하는 컴포넌트
- award 폴더: 포트폴리오 중 수상이력 관련 컴포넌트들
- certificate 폴더: 포트폴리오 중 자격증 관련 컴포넌트들
- education 폴더: 포트폴리오 중 학력 관련 컴포넌트들
- project 폴더: 포트폴리오 중 프로젝트 관련 컴포넌트들
- user 폴더: 포트폴리오 중 사용자 관련 컴포넌트들
- api.js : axios 커스텀 api 제작
- App.js : 라우터를 이용해 url에 따라 보여질 컴포넌트를 결정
- reducer.js: 로그인, 로그아웃 사태 관리

2. **src/component 폴더**

- 프론트엔드 파트의 핵심 부분인 코드들이 작성됩니다.
- component 폴더안에 MVP 폴더(award, acertificate, education, project)를 생성한 후 필요한 컴포넌트를 생성하여 각각의 MVP 컴포넌트를 완성하였습니다.
- 작성된 코드의 상태관리는 useState Hooks를 이용하였으며, CSS 라이브러리는 React Bootstrap을 이용하였습니다. 서버통신의 경우 스켈레톤 코드에 작성되어있던 API르 이용해 axios를 그대로 사용하였습니다.

  ```
  front
  ㄴnode_modules/
  ㄴpublic/
  ㄴsrc
  	ㄴcomponents
  		ㄴ award/
  		ㄴ certificate/
  		ㄴ education/
  		ㄴ project/
  		ㄴ user/
  		ㄴ Header.js
  		ㄴ Portfolio.js
  	ㄴapi.js
  	ㄴApp.js
  	ㄴindex.js
  	ㄴreducer.js
  ㄴpackage.json
  ㄴREADME.md
  ```

### 필수 기능 구현

##### award MVP

![스크린샷_2022-09-01_14.38.03](/uploads/82dcf2208f89d0df52686d816fbf9052/스크린샷_2022-09-01_14.38.03.png)

Award, AwardAdd, AwardEdit 컴포넌트로 구성되어있습니다.

- Award : 모든 수상이력을 나타내는 컴포넌트입니다.
- AwardAdd : 수상 이력 추가를 위한 컴포넌트입니다.
- AwardEdit : 수상 이력 편집을 위한 컴포넌트입니다.

##### certificate MVP

![스크린샷_2022-09-01_14.38.37](/uploads/2dcb30771f472e1960a8f1c05d069558/스크린샷_2022-09-01_14.38.37.png)

Certificate.js, CertificateAddForm.js, CertificateCard, CertificateEditForm, Certificates 컴포넌트로 구성되어 있습니다 .

- Certificate.js : isEditing State에 따라 다른 컴포넌트를 나타내도록 도와주는 컴포넌트입니다.
- CertificateAddForm.js : 자격증 추가를 위한 컴포넌트입니다.
- CertificateCard : 자격증 하나를 나타내는 컴포넌트입니다.
- CertificateEditForm : 자격증 편집을 위한 컴포넌트입니다.
- Certificates : 모든 자격증을 나타내는 컴포넌트입니다.

##### education MVP

![스크린샷_2022-09-01_14.37.15](/uploads/ed8248ca4e2a4704b39df556fd2e13c7/스크린샷_2022-09-01_14.37.15.png)

EduApp, EduInputForm, EduList, EduUpdate 컴포넌트로 구성되어있습니다.

- EduApp : 모든 학력을 나타내는 컴포넌트입니다.
- EduInputForm : 학력 추가를 위한 컴포넌트입니다.
- EduList : 학력 정보 하나를 나타내는 컴포넌트입니다.
- EduUpdate : 학력 편집을 위한 컴포넌트입니다.

##### project MVP

![스크린샷_2022-09-01_14.36.12](/uploads/64793cbe4913366b1e4923cd54e2bd65/스크린샷_2022-09-01_14.36.12.png)

AddProjectForm, EditProjectForm, InputForm, Project, ProjectImages 컴포넌트로 구성되어 있습니다.

- AddProjectForm : 프로젝트 추가를 위한 컴포넌트입니다.
- EditProjectForm : 프로젝트 편집을 위한 컴포넌트입니다.
- InputForm : 추가 및 편집에 사용할 입력 모듈 컴포넌트입니다.
- Project : 전체적인 프로젝트를 나타내는 컴포넌트 입니다.
- ProjectImages : 프로젝트 이미지를 나타내는 컴포넌트입니다.

### 프론트엔드 추가 구현 기능

- 유저 프로필 이미지 변경
  > front-end : FormDate  
  > back-end : Multer, Express.static 미들웨어
  >
  > 위 요소를 이용하여 유저 프로필 이미지 변경 기능을 구현하였습니다.
- 프로젝트 이미지 입력 및 변경
  > front-end : FormDate  
  > back-end : Multer, Express.static 미들웨어
  >
  > 위 요소를 이용하여 프로젝트 이미지 추가 및 변경 기능을 구현하였습니다.
- 다크모드
  > 우상단에 위치한 다크모드 버튼 클릭시 페이지가 전체적으로 어둡게 변화합니다.
- TOP 버튼
  > 우하단에 위치한 버튼 TOP 버튼 클릭시 페이지의 최상단으로 이동합니다.

### 주의사항

- 이미지 처리
  > 이미지는 백엔드 서버의 로컬에 저장됩니다. 이미지르 나타내는 컴포넌트에서 백엔드 url 설정에 유의해야 합니다.
- config.js
  > api.js 내부 사용되는 백엔드 포트 및 이미지 처리를 위한 백엔드 서버 변수를 통합관리하기 위한 파일입니다.  
  > 이미지 나타낼때 사용되는 링크를 개인 테스트시 로컬호스트로 VM서버 구동 테스트시 VM주소로 변경해야 합니다.
  >
  > backPort : 백엔드 포트  
  > backServer : 로컬호스트 or 엘리스 12팀 VM 주소
