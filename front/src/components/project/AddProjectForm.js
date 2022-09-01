import { useState } from 'react';

import InputForm from './InputForm';

import * as API from '../../api';


const AddProjectForm = ({ setEditToggle, setAddToggle, projects, setProjects }) => {
    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }
    // input 받기위한 state
    const [project, setProject] = useState(
        {
            title: '',
            skill: '',
            description: '',
            link: '',
            start: new Date(),
            end: new Date(),

            imagePath: [],
        }
    );

    const addProject = async (e) => {
        e.preventDefault();

        //서버에 프로젝트 데이터 추가 요청
        const res = await API.post('project', {
            title: project.title,
            description: project.description,
            from_date: dateToString(project.start),
            to_date: dateToString(project.end),
            skill: project.skill,
            link: project.link,
            imagePath: project.imagePath, //배열 값
        })

        //통신 성공 후 상태 관리
        if (res) {
            setProjects(
                [res.data, ...projects]
            );
            setEditToggle(false)
        }
    }

    return (
        <div style={{ textAlign: 'start' }}>
            <h4 className='mt-3 mb-4'>프로젝트 추가</h4>
            <InputForm
                project={project}
                setProject={setProject}
                submitHandler={addProject}
                setVisibleToggle={setAddToggle}
            />

        </div>
    );
}

export default AddProjectForm;