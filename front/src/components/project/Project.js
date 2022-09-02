import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";
import * as API from "../../api";
import "./Project.css";
//bootstrap
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";

//context
import { UserStateContext } from "../../App.js";
import { DispatchContext } from "../../App";
import { modeContext } from "../../App";

//component
import AddProjectForm from "./AddProjectForm";
import EditProjectForm from "./EditProjectForm";
import ProjectImages from "./ProjectImages";

const Project = ({ portfolioOwnerId, isEditable }) => {
  const mode = useContext(modeContext);
  //state
  const [addToggle, setAddToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [projects, setProjects] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // get요청으로 dummy파일에서 불러온 값들을 이용하면 각자의 dummy파일 형식이 달라서
  // 브랜치 머지할때 컴포넌트 에러 발생할수 있기때문에 일단 그냥 여기서 더미데이터 넣었습니다.
  useEffect(() => {
    API.get(`users/${portfolioOwnerId}/projects`).then((v) =>
      setProjects(v.data.reverse())
    );
    setIsLoading(false);
  }, [portfolioOwnerId]);

  const deleteProjectHandleer = async (title, id) => {
    const ans = window.confirm(`[${title}] 프로젝트를 지우시겠습니까?`);
    if (ans) {
      const res = await API.delete(`projects/${id}`);
      if (res.status === 204) {
        //filter는 비파괴형 메소드;;
        const tempProjects = [...projects].filter((v) => v.id !== id);
        setProjects(tempProjects);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1> 로딩중... 😎 </h1>
        </div>
      )}
      {!isLoading && (
        <Card
          className="p-3 mt-3"
          bg={mode.toLowerCase()}
          text={mode.toLowerCase() === "light" ? "dark" : "white"}
        >
          {!addToggle && (
            <div className={mode}>
              <h3>🧑🏻‍💻 프로젝트</h3>
              <Accordion className="mt-3" defaultActiveKey={0}>
                {projects?.map((v, i) => {
                  return (
                    <Accordion.Item eventKey={i} key={v.id + "accor" + i}>
                      <Accordion.Header
                        onClick={() => {
                          setEditToggle(false);
                        }}
                      >
                        <div>
                          <div style={{ display: "flex" }}>
                            <h5 style={{ fontWeight: "600" }}>{v.title}</h5>
                            {v?.link && (
                              <a
                                style={{ textDecoration: "none" }}
                                className="ms-2"
                                href={
                                  v.link.slice(0, 8) === "https://"
                                    ? v.link
                                    : "https://" + v.link
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                🔗
                              </a>
                            )}
                          </div>
                          <span style={{ color: "grey" }}>
                            [{v?.from_date.slice(2, 10)} ~{" "}
                            {v?.to_date.slice(2, 10)}]
                          </span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        {v.imagePath && (
                          <ProjectImages imagePath={v?.imagePath} />
                        )}
                        <div className="mt-3">
                          {v?.description?.split("\n").map((v, i) => (
                            <React.Fragment key={v.id + "br" + i}>
                              {v}
                              <br />
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="mt-3 mb-3">
                          {v?.skill?.split(" ").map((v, i) => (
                            <Badge
                              className="me-1"
                              pill
                              bg="primary"
                              key={v.id + "skill" + i}
                            >
                              {v}
                            </Badge>
                          ))}
                        </div>
                        {isEditable && (
                          <div className="mt-3" style={{ textAlign: "center" }}>
                            {!editToggle ? (
                              <div className="mt-5 mb-5">
                                <Button
                                  onClick={() => {
                                    setEditToggle(true);
                                  }}
                                  variant="outline-warning"
                                >
                                  수정
                                </Button>
                                <Button
                                  className="ms-3"
                                  onClick={() => {
                                    deleteProjectHandleer(v.title, v.id);
                                  }}
                                  variant="outline-danger"
                                >
                                  삭제
                                </Button>
                              </div>
                            ) : (
                              <EditProjectForm
                                index={i}
                                projects={projects}
                                setProjects={setProjects}
                                setEditToggle={(boolean) => {
                                  setEditToggle(boolean);
                                }}
                              />
                            )}
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
              {isEditable && (
                <div className="mt-3 mb-3" style={{ textAlign: "center" }}>
                  <Button
                    className="mt-3"
                    onClick={() => {
                      setAddToggle(true);
                    }}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          )}
          {addToggle && (
            <AddProjectForm
              projects={projects}
              setProjects={setProjects}
              setAddToggle={(e) => {
                setEditToggle(false);
                setAddToggle(e);
              }}
              setEditToggle={(boolean) => {
                setEditToggle(boolean);
              }}
            />
          )}
        </Card>
      )}
    </>
  );
};

export default Project;
