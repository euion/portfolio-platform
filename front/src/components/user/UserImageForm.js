import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { backPort } from "../../config";
import { backServer } from "../../config";

const UserImageForm = ({ user, setUser, imagePath, setImagePath }) => {
  const serverUrl = "http://" + window.location.hostname + ":" + backPort + "/";
  //image 관련 함수들
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput]);

  const onChangeImages = async (e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    axios
      .post(serverUrl + "images", imageFormData)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setImagePath(data);
      });
    //똑같은 파일을 올렸을때 onChange가 인식 못하는걸 방지
    e.target.value = "";
  };
  const onRemoveImage = () => {
    setImagePath("");
  };

  return (
    <>
      {/* 이미지 첨부 버튼 */}
      <Button
        variant="outline-primary"
        className="me-2 mt-3 w-100"
        onClick={onClickImageUpload}
      >
        이미지 업로드
      </Button>

      <input
        type="file"
        name="image"
        hidden
        ref={imageInput}
        onChange={onChangeImages}
      />
      {imagePath && (
        <div
          key={user?.imagePath}
          className="me-2"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* {backServer + backPort + '/' + user.imagePath} */}
          <img
            className="mt-2"
            src={`${backServer}${backPort}/${imagePath}`}
            alt="업로드 이미지"
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
          ></img>
          <Button
            className="mt-2 mb-2"
            variant="outline-danger"
            onClick={() => {
              onRemoveImage();
            }}
          >
            삭제
          </Button>
        </div>
      )}
    </>
  );
};

export default UserImageForm;
