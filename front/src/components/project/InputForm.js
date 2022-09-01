import { useRef, useCallback, forwardRef, useContext } from "react";
import axios from "axios";
import { modeContext } from "../../App";

//bootstrap component
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import DatePicker from "react-datepicker";

import { Card } from "react-bootstrap";
import { backPort } from "../../config";
import { backServer } from "../../config";

const InputForm = ({ project, setProject, submitHandler, setVisibleToggle }) => {
  const mode = useContext(modeContext);

  const serverUrl = "http://" + window.location.hostname + ":" + backPort + "/";

  const CustomDatepickerInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      variant="outline-primary"
      className="example-custom-input w-100"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  ));
  //input handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const tempProject = { ...project };
    tempProject[name] = value;
    setProject({
      ...tempProject,
    });
  };

  //image 관련 함수들
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput]);

  const onChangeImages = async (e) => {
    //선택한 이미지를 폼데이터 형식으로 만든다
    const imageFormData = new FormData();
    //[].forEach.call ? : e.target.files가 배열과 유사하게 생겼으나 배열이 아니다. 따라서 [].forEach.call를 통해 배열 메소드를 이용가능하다.
    [].forEach.call(e.target.files, (f) => {
      //imageFormData의 값추가 - key값 : 'image' , value : input 태그로 입력한 파일
      imageFormData.append("image", f);
    });
    //파일을 입력해 생성한 FormData를 서버에 올리도록 요청
    axios
      .post(serverUrl + "images", imageFormData)
      .then((res) => res.data)
      .then((data) => {
        const temp = [...project?.imagePath, data];
        setProject({ ...project, imagePath: temp });
      });
    //똑같은 파일을 올렸을때 onChange가 인식 못하는걸 방지
    e.target.value = "";
  };
  const onRemoveImage = (index) => {
    //index, filter 메소드 이용
    setProject({
      ...project,
      imagePath: [...project.imagePath.filter((v, i) => index !== i)],
    });
  };
  const onRemoveImageAll = () => {
    setProject({ ...project, imagePath: [] });
  };

  return (
    <>
      <Form
        onSubmit={(e) => {
          submitHandler(e);
          setVisibleToggle(false);
        }}
      >
        <span>프로젝트 기간</span>
        <Card
          body
          className="mt-2 mb-3"
          style={{ display: "flex" }}
          bg={mode.toLowerCase()}
          text={mode.toLowerCase() === "light" ? "dark" : "white"}
        >
          <div style={{ display: "flex" }}>
            <DatePicker
              customInput={<CustomDatepickerInput />}
              showPopperArrow={false}
              fixedHeight
              type="date"
              shouldCloseOnSelect={true}
              selected={project.start}
              onChange={(start) => {
                setProject({ ...project, start });
              }}
            />
            <span
              className="w-25"
              style={{
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              ～
            </span>
            <DatePicker
              customInput={<CustomDatepickerInput />}
              showPopperArrow={false}
              fixedHeight
              type="date"
              shouldCloseOnSelect={true}
              selected={project.end}
              onChange={(end) => {
                setProject({ ...project, end });
              }}
            />
          </div>
        </Card>

        <Form.Group className="mb-3" controlId="projectNameInput">
          <Form.Label>프로젝트 이름</Form.Label>
          <Form.Control
            required
            name="title"
            onChange={changeHandler}
            value={project.title}
            type="text"
            placeholder="프로젝트 이름"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="projectSkillInput">
          <Form.Label>사용 기술</Form.Label>
          <Form.Control
            name="skill"
            onChange={changeHandler}
            value={project.skill}
            type="text"
            placeholder="사용 기술"
          />
          <Form.Text className="text-muted">
            프로젝트에서 사용한 기술을 스페이스바로 구분하여 입력해주세요 :)
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="projectTextInput">
          <Form.Label>프로젝트 설명</Form.Label>
          <Form.Control
            required
            name="description"
            onChange={changeHandler}
            value={project.description}
            as="textarea"
            rows={3}
            placeholder="프로젝트 설명"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="projectLInkInput">
          <Form.Label>프로젝트 링크</Form.Label>
          <Form.Control
            // required
            name="link"
            onChange={changeHandler}
            value={project.link}
            type="link"
            placeholder="https://"
          />
        </Form.Group>

        {/* 업로드된 이미지 미리보기 */}
        {project.imagePath?.length > 0 ? <div className="dropdown-divider"></div> : null}
        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            alignItems: "flex-end",
          }}
        >
          {project.imagePath?.map((v, i) => (
            <div
              key={v}
              className="me-2"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* {serverUrl} */}
              <img
                className="mt-2"
                src={`${backServer}${backPort}/${v}`}
                alt="업로드 이미지"
                style={{ width: "180px", height: "200px", objectFit: "cover" }}
              ></img>
              <Button
                className="mt-2 mb-2"
                variant="outline-danger"
                onClick={() => {
                  onRemoveImage(i);
                }}
              >
                삭제
              </Button>
            </div>
          ))}
        </div>
        {project.imagePath?.length > 0 ? <div className="dropdown-divider"></div> : null}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {/* 이미지 첨부 버튼 */}
            <input
              type="file"
              name="image"
              hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
            <Button className="me-2" onClick={onClickImageUpload}>
              이미지 업로드
            </Button>
            {project.imagePath?.length > 0 ? (
              <Button variant="danger" onClick={onRemoveImageAll}>
                모든 이미지 삭제
              </Button>
            ) : null}
          </div>

          <div>
            <Button
              disabled={!(project.title && project.description)}
              variant="primary"
              className="me-2"
              type="submit">
              확인
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                setVisibleToggle(false);
              }}
            >
              취소
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default InputForm;
