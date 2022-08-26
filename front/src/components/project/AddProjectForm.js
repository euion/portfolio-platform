import { useState } from 'react';

import InputForm from './InputForm';

const AddProjectForm = ({ setAddToggle, projects, setProjects }) => {
    // input 받기위한 state
    const [project, setProject] = useState(
        {
            name: '',
            skill: '',
            text: '',
            link: '',
        }
    );

    const addProject = async (e) => {
        e.preventDefault();

        //서버에 프로젝트 데이터 추가 요청
        const resOk = true;
        /* 
        요청 응답을 받고 성공일때 
        아래에서 userState 업데이트 할것이기 때문에
        await 사용해야 한다.
        axios.put('/uesr/project/', 데이터 객체)
        아마 이런식으로 서버에 요청
        */

        //추가 요청 응답이 성공이라면
        //dispatch로 프로젝트를 추가하도록 userState를 업데이트 합니다.
        if (resOk) {
            setProjects(
                [project, ...projects]
            );
        }
    }

    return (
        <div style={{ textAlign: 'start' }}>
            <h4 className='mt-3 mb-4'>프로젝트 추가</h4>
            <InputForm
                project={project}
                setProject={setProject}
                submitHandler={addProject}
                setVisibleToggle={setAddToggle} />
        </div>
    );
}

export default AddProjectForm;