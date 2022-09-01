import is from "@sindresorhus/is";
import { Router } from "express";
import { certificateService } from "../services/certificateService";
import { Certificate } from "../db";

const certificateRouter = Router();

certificateRouter.post(
  "/certificate",
  async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { title, description, when_date} = req.body;

    const user_id = req.currentUserId;

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
  } catch (error) {
    next(error);
  }
});

// 특정 user의 모든 자격증내역 get
certificateRouter.get(
  "/users/:user_id/certificates",
  async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const usercertificates = await certificateService.getCertificates({ user_id });
    
    if (usercertificates.errorMessage) {
      throw new Error(usercertificates.errorMessage);
    }
    res.status(200).json(usercertificates);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put(
  "/certificates/:id",
  async (req, res, next) => {
  try {
    const certificate_id = req.params.id;

    const certificate = await Certificate.findByCertificateId({ certificate_id });

    if (certificate.user_id !== req.currentUserId) {
      throw new Error("권한이 없습니다.");
    }

    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;

    const toUpdate = { title, description, when_date };

    const updatedCertificate = await certificateService.setCertificate({
      certificate_id,
      toUpdate,
    });

    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.delete(
  "/certificates/:id",
  async (req, res, next) => {
  try {
    const certificate_id = req.params.id;
    const certificate = await Certificate.findByCertificateId({ certificate_id });

    if (certificate.user_id !== req.currentUserId) {
      throw new Error("권한이 없습니다.");
    }

    await certificateService.deleteCertificate({ certificate_id });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export { certificateRouter };
