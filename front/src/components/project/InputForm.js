import { useState } from 'react';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const InputForm = ({ project, setProject, submitHandler, setVisibleToggle }) => {

    //input handler
    const changeHandler = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        const tempProject = { ...project }

        tempProject[name] = value;
        setProject(tempProject);
    }

    return (
        <>
            <Form onSubmit={(e) => {
                submitHandler(e);
                setVisibleToggle(false);
            }}>
                <Form.Group className="mb-3" controlId="projectNameInput">
                    <Form.Label>프로젝트 이름</Form.Label>
                    <Form.Control
                        required
                        name='name'
                        onChange={changeHandler}
                        value={project.name}
                        type="text"
                        placeholder="Project Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectSkillInput">
                    <Form.Label>사용 기술</Form.Label>
                    <Form.Control
                        required
                        name='skill'
                        onChange={changeHandler}
                        value={project.skill}
                        type="text"
                        placeholder="Project Skill" />
                    <Form.Text className="text-muted">
                        프로젝트에서 사용한 기술을 스페이스바로 구분하여 입력해주세요 :)
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectTextInput">
                    <Form.Label>프로젝트 설명</Form.Label>
                    <Form.Control
                        required
                        name='text'
                        onChange={changeHandler}
                        value={project.text}
                        as="textarea"
                        rows={3}
                        placeholder="Project description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectLInkInput">
                    <Form.Label>프로젝트 링크</Form.Label>
                    <Form.Control
                        // required
                        name='link'
                        onChange={changeHandler}
                        value={project.link}
                        type="link"
                        placeholder="https://" />
                </Form.Group>

                <div style={{ textAlign: 'center' }}>
                    <Button variant="primary" className='me-3' type="submit">확인</Button>
                    <Button variant="outline-primary" onClick={() => { setVisibleToggle(false) }}>취소</Button>
                </div>
            </Form>
        </>
    );
}

export default InputForm;