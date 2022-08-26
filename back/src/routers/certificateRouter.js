import is from "@sindresorhus/is";
import { Router } from "express";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

certificateRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const user_id = req.currentUserId     
    
    
    const title = req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date;

    // 위 데이터를 자격증 db에 추가하기
    const newCertificate = await certificateService.addCertificate({
      user_id,
      title,
      description,
      when_date,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
    // res.redirect(`/certificatelist/${user_id}`)
  } catch (error) {
    next(error);
  }
});

certificateRouter.get(
  "/certificatelist/:id",
  async function (req, res, next) {
    try {
      console.log(req.currentUserId)
      // 전체 자격증 목록을 얻음
      const user_id = req.params.id
      const certificates = await certificateService.getCertificates({ user_id });
      res.status(200).send(certificates);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.put(
  "/certificates/:id",
  async function (req, res, next) {
    try {

      const certificate_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = { title, description, when_date };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCertificate = await certificateService.setCertificate({ certificate_id, toUpdate });
      
      // if (updatedCertificate.errorMessage) {
      //   throw new Error(updatedCertificate.errorMessage);
      // }
      
      res.status(200).json(updatedCertificate);
      // res.redirect(`/certificatelist/${user_id}`)
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.get(
  "/certificates/:id",
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentCertificateInfo = await certificateService.getCertificateInfo({ user_id });

      if (currentCertificateInfo.errorMessage) {
        throw new Error(currentCertificateInfo.errorMessage);
      }

      res.status(200).send(currentCertificateInfo);
    } catch (error) {
      next(error);
    }
  }
);


//req.body에 자격증 id를 받아 자격증을 삭제
certificateRouter.delete(
  "/certificate/:id/delete",
  async function (req, res, next) {
    try {
      const certificate_id = req.params.id

      await certificateService.deleteCertificate({ certificate_id })

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
)

export { certificateRouter };
