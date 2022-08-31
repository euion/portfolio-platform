import { Router } from "express";

const imageRouter = Router();


//이미지 첨부 테스트
const multer = require('multer');
const fs = require('fs');//파일 시스템 조작 가능한 모듈
const path = require('path'); //path는 노드에서 기능하는 기능


//upload폴더가 존재하는지 확인후 없으면 생성
try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('upload folder do not exist')
  fs.mkdirSync('uploads');
}
//multer를 이용해서 이미지 업로드, multer({속성값 객체})
const upload = multer({
  //업로드한 이미지를 어디에 저장할지 - 로컬디스크
  storage: multer.diskStorage({
    //저장위치 결정 함수
    destination(req, file, done) {
      done(null, 'uploads');
    },
    //파일명 결정 함수
    filename(req, file, done) {
      //파일 확장자 추출
      const ext = path.extname(file.originalname);
      //path에서 파일명 추출
      const basename = path.basename(file.originalname, ext);
      //파일명 + 시간 + 확장자 
      done(null, basename + '_' + new Date().getTime() + ext);
    }
  }),
  limits: {
    fileSize: 20 * 1024 * 1024 //20MB, MB=2^10*바이트, KM=2^3*바이트
  },
})
imageRouter.get('/images', async (req, res, next) => {
  res.json('test');
});
//multer를 이용해 받은 key값이 'image'인 FormData를 images 경로에 업로드 한다.
imageRouter.post('/images', upload.single('image'), async (req, res, next) => {
  res.json(req.file.filename);
});

export { imageRouter };
