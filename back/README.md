# 포트폴리오 공유 서비스 백엔드 코드 파일 구조 설명

src 폴더는 크게는 routers, services, middlewares, db 4개 폴더로 구분됩니다.

1.  routers:
    I. request와 response가 처리됩니다. MVP 별로 1개씩, 이미지를 추가하기 위한 라우터를 별도로 두어 총 6개의 router가 존재합니다.
    II. 목록과 기능은 다음과 같습니다.
    a. UserRouter : 회원가입, 로그인, 회원정보 수정, 현재 사용자 정보 요청, 전체 사용자 목록 요청

    b. EducationRouter : 학력 추가, 학력 수정, 학력 삭제, 학력 목록 요청(수정과 삭제의 경우에는 작성자만 가능)

    c. AwardRouter : 수상 이력 추가, 수상 이력 수정, 수상 이력 삭제, 수상 이력 목록 요청(수정과 삭제의 경우에는 작성자만 가능)

    d. ProjectRouter : 프로젝트 추가, 프로젝트 수정, 프로젝트 삭제, 프로젝트 목록 요청(수정과 삭제의 경우에는 작성자만 가능)

    e. CertificateRouter : 자격증 추가, 자격증 수정, 자격증 삭제, 자격증 목록 요청(수정과 삭제의 경우에는 작성자만 가능)

    f. ImageRouter : 이미지 업로드

2.  db:
    I. mongoDB 서버에 데이터를 저장하기 위한 기본적인 형식들이 작성되어 있는 폴더입니다. 2개의 폴더와 1개의 파일이 존재합니다.
    II. 목록과 기능은 다음과 같습니다.
    A. schemas 폴더 : 데이터를 정형화시켜 저장하기 위한 schema의 변수와 타입이 정의되어 있으며 이를 기준으로 모델이 정의되어있습니다.
    a. user, education, award, project, certificate를 각각의 파일을 만들어 지정해주었고 id는 모두 공통적으로 가져가는 부분이기에 types 폴더에 id 변수를 uuid 모듈을 이용해 따로 생성하여 사용했습니다.

    B. models 폴더 : ORM 코드가 작성되어 있는 폴더로 schemas 폴더에서 선언해준 각각의 모델들의 데이터 처리를 위한 폴더입니다.
    a. user, education, award, project, certificate를 각각의 파일에서 클래스를 선언했고 메소드함수들을 만들어 데이터 처리를 하도록 했습니다. - 목록과 기능은 다음과 같습니다.
    i. User : mongoDB에 데이터 생성, email로 데이터 찾기, user_id로 데이터 찾기, 전체 데이터 가져오기, 데이터 수정

            ii. Education : mongoDB에 데이터 생성, education_id로 데이터 찾기, user_id에 해당하는 전체 데이터 가져오기, 데이터 수정, education_id로 데이터 삭제

            iii. Award : mongoDB에 데이터 생성, award_id로 데이터 찾기, user_id에 해당하는 전체 데이터 가져오기, 데이터 수정, award_id로 데이터 삭제

            iv. Project : mongoDB에 데이터 생성, project_id로 데이터 찾기, user_id에 해당하는 전체 데이터 가져오기, 데이터 수정, project_id로 데이터 삭제

            v. Certificate : mongoDB에 데이터 생성, certificate_id로 데이터 찾기, user_id에 해당하는 전체 데이터 가져오기, 데이터 수정, certificate_id로 데이터 삭제

    C. index.js : Mongoose와 mongoDB 서버를 연결하는 코드가 있는 파일입니다.

3.  services:
    I. models 폴더에서 정의한 ORM 코드와 router를 이어주는 백엔드 로직 코드가 있습니다. 클래스를 선언해 메소드함수들을 만들어주었습니다. MVP 별로 1개씩, 총 5개 파일이 있게 됩니다.
    II. 목록과 기능은 다음과 같습니다.(router 측 - models 측)
    a. UserService : - mongoDB에 해당 email이 없다면 데이터 생성 (회원가입 - email로 데이터 찾기,데이터 생성) - 로그인 시 토큰 발행 (로그인 - email로 데이터 찾기) - 전체 목록 가져오기 (전체 사용자 목록 요청 - 전체 데이터 가져오기) - user_id로 데이터 가져와서 수정하기 (회원정보 수정 - user_id로 데이터 찾기, 데이터 수정) - 유저 정보 찾기 (현재 사용자 정보 요청 - user_id로 데이터 찾기)

    b. EducationService : - 데이터 생성 (학력 추가 - 데이터 생성) - user_id로 전체 목록 가져오기 (학력 목록 요청 - user_id에 해당하는 전체 데이터 가져오기) - education_id로 데이터 가져와서 수정하기 (학력 수정 - education_id로 데이터 찾기, 데이터 수정) - 데이터 삭제 (학력 삭제 - education_id로 데이터 삭제)

    c. AwardService : - 데이터 생성 (학력 추가 - 데이터 생성) - user_id로 전체 목록 가져오기 (학력 목록 요청 - user_id에 해당하는 전체 데이터 가져오기) - award_id로 데이터 가져와서 수정하기 (학력 수정 - award_id로 데이터 찾기, 데이터 수정) - 데이터 삭제 (학력 삭제 - award_id로 데이터 삭제)

    d. ProjectService : - 데이터 생성 (학력 추가 - 데이터 생성) - user_id로 전체 목록 가져오기 (학력 목록 요청 - user_id에 해당하는 전체 데이터 가져오기) - project_id로 데이터 가져와서 수정하기 (학력 수정 - project_id로 데이터 찾기, 데이터 수정) - 데이터 삭제 (학력 삭제 - project_id로 데이터 삭제)

    e. CertificateService : - 데이터 생성 (학력 추가 - 데이터 생성) - user_id로 전체 목록 가져오기 (학력 목록 요청 - user_id에 해당하는 전체 데이터 가져오기) - certificate_id로 데이터 가져와서 수정하기 (학력 수정 - certificate_id로 데이터 찾기, 데이터 수정) - 데이터 삭제 (학력 삭제 - certificate_id로 데이터 삭제)

4.  middlewares:
    I. 에러처리를 위한 middleware와 로그인 여부를 확인하는 middleware로 이루어져 있습니다.
    a. 에러처리의 목록은 다음과 같습니다. - 데이터 생성 시 필요한 데이터를 모두 입력하지 않은 경우 - 데이터 생성 시 데이터를 입력하지 않은 경우 - 데이터 수정 시 입력한 id로 데이터를 찾을 수 없는 경우 - 데이터 수정 시 작성자가 아닌 경우 - 데이터 수정 시 작성자가 아닌 경우 - 로그인이 필요한 상황에서 token이 없는 경우 - 로그인이 필요한 상황에서 token이 정상적인 token이 아닌 경우 - 이외의 데이터를 찾아야하는 모든 상황에서 입력한 정보로 데이터를 찾을 수 없는 경우

    b. 로그인 여부를 확인하는 middleware는 token의 유무를 확인하는 부분과 정상적인 token인지 확인하는 부분으로 구성되어 있습니다. - token의 유무를 확인 : 로그인 시 생성된 토큰이 프론트엔드 측에 response로 넘어가 hearders에 저장되어 요청 시 request로 넘어오는데 이 요청에서 토큰을 분리해 유무를 확인합니다. - 정상적인 token인지 확인 : 위에서 넘겨 얻은 token을 미리 설정된 secret key로 디코딩해 user_id를 추출해내고 이를 req에 저장해 router로 넘겨줍니다. 디코딩 과정에서 오류가 난다면 정상적인 token이 아니므로 에러처리 middleware로 넘어가며 삭제, 수정의 권한은 필요한 부분의 router 내부에서 확인합니다.

## 사용 모듈

- jsonwebtoken : JSON Web Token의 생성 및 검증을 위한 모듈
- mongoose : MongoDB를 사용하기 위한 모듈
- uuid : 중복되지 않는 고유한 식별자를 생성하기 위한 모듈
- @sindresorhus/is : 타입을 체크하기 위한 모듈
- bcrypt : 비밀번호를 해쉬화하기 위한 모듈
- cors : 웹서버 접근 권한을 부여하기 위한 모듈
- express : 웹서버 기능을 구현하기 위한 모듈
- multer : 파일을 업로드하기 위한 모듈
- fs : 파일 시스템 조작 가능한 모듈
- path : 경로를 다루기 위한 모듈
