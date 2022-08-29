import { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import * as API from '../../api';

//bootstrap
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';



//context
import { UserStateContext } from '../../App.js';
import { DispatchContext } from "../../App";

//component
import AddProjectForm from './AddProjectForm';
import EditProjectForm from './EditProjectForm';
import ProjectImages from './ProjectImages';




const Project = ({ portfolioOwnerId, isEditable }) => {
    //state
    const [addToggle, setAddToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [projects, setProjects] = useState([
        {
            name: '',
            text: '',
            skill: '',
            link: null,
        }
    ]);

    // get요청으로 dummy파일에서 불러온 값들을 이용하면 각자의 dummy파일 형식이 달라서 
    // 브랜치 머지할때 컴포넌트 에러 발생할수 있기때문에 일단 그냥 여기서 더미데이터 넣었습니다.
    useEffect(() => {
        // API.get('dummy.json').then(v => console.log(v));
        // axios.get('dummy.json').then(v => setProjects(v.data.projects));
        setProjects([
            {
                "name": "더미 프로젝트 2",
                "text": "더미 프로젝트 2의 설명 내용 입니다...",
                "skill": "JS React.JS Mongo.DB Bootstrap",
                "link": null
            },
            {
                "name": "더미 프로젝트 1",
                "text": "더미 프로젝트 1의 설명 내용 입니다...",
                "skill": "TS React.JS Mongo.DB AntDesign",
                "link": null
            }
        ]);
    }, []);

    const deleteProjectHandleer = (name, index) => {
        const ans = window.confirm(`[${name}] 프로젝트를 지우시겠습니까?`);
        if (ans) {
            console.log('delete ditpatch, index', index);

            //filter는 비파괴형 메소드;;
            const tempProjects = [...projects].filter((v, i) => i !== index);
            setProjects(tempProjects);
        }
    }

    return (
        <Card className='p-3 border'>
            <Card.Body>
                {!addToggle &&
                    <>
                        <h2>🧑🏻‍💻 프로젝트</h2>
                        <div className="dropdown-divider"></div>
                        <Accordion className='mt-3' defaultActiveKey={0}>
                            {projects?.map((v, i) =>
                                <Accordion.Item eventKey={i} key={'item' + v.name + v.text}>
                                    <Accordion.Header onClick={() => { setEditToggle(false) }}>
                                        <h5 style={{ fontWeight: '600' }}>{v.name}</h5>
                                        {v.link && <a style={{ textDecoration: 'none' }}
                                            className='ms-2'
                                            href={v.link}
                                            target='_blank'
                                            rel="noreferrer">🔗</a>}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {/* 이미지 처리 구현되면 활성화 */}
                                        {/* <h5 className='mt-4 mb-3'>프로젝트 이미지</h5> */}
                                        {/* <ProjectImages /> */}
                                        {/* <h5 className='mt-5 mb-3'>프로젝트 설명</h5> */}
                                        <div className='mt-3'>{v.text.split('\n').map(v => <>{v}<br></br></>)}</div>
                                        <div className='mt-3 mb-3'>
                                            {
                                                // 메소드를 사용하는 객체가 존하는지 확인!
                                                // v.skill이 없을때 split 메소드 사용시 에러발생, 반드시 존재하는지 확인부터!!
                                                v?.skill?.split(' ').map(v => <Badge className='me-1' pill bg="primary">{v}</Badge>)}
                                        </div>
                                        <div className='mt-3' style={{ textAlign: 'center' }}>
                                            {!editToggle ?
                                                <div className='mt-5 mb-5'>
                                                    <Button
                                                        onClick={() => { setEditToggle(true) }}
                                                        variant="outline-warning">수정</Button>
                                                    <Button
                                                        className='ms-3'
                                                        onClick={() => { deleteProjectHandleer(v.name, i) }}
                                                        variant="outline-danger">삭제</Button>
                                                </div>
                                                : <EditProjectForm
                                                    index={i}
                                                    name={v.name}
                                                    text={v.text}
                                                    skill={v.skill}
                                                    link={v.link}
                                                    projects={projects}
                                                    setProjects={setProjects}
                                                    setEditToggle={(boolean) => { setEditToggle(boolean) }} />}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>
                        <div className='mt-3 mb-3' style={{ textAlign: 'center' }}>
                            <Button className='mt-3' onClick={() => { setAddToggle(true) }}>+</Button>
                        </div>
                    </>
                }
                {addToggle && <AddProjectForm
                    projects={projects}
                    setProjects={setProjects}
                    setAddToggle={e => { setAddToggle(e) }}
                />}
            </Card.Body>
        </Card >
    );
}

export default Project;