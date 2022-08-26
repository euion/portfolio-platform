import { useState } from 'react';

import InputForm from './InputForm';

const EditProjectForm = ({ index, name, text, skill, link, projects, setProjects, setEditToggle }) => {
    //여기서 state 선언하고 하위 input form에서 수정하도록 
    const [project, setProject] = useState(
        {
            index,
            name,
            text,
            skill,
            link,
        }
    );

    const editProject = (e) => {
        e.preventDefault();
        //서버요청

        const resOk = true;
        /* 
        요청 응답을 받고 성공일때 
        아래에서 userState 업데이트 할것이기 때문에
        await 사용해야 한다.
        axios.put('/uesr/project/', 데이터 객체)
        아마 이런식으로 서버에 요청
        */

        //정상 응답이면 리듀서로 상태관리
        if (resOk) {
            const tempProjects = [...projects]
            tempProjects[index] = { ...project };

            setProjects(tempProjects);
            setEditToggle(false)
        }
    }

    return (
        <div style={{ textAlign: 'start' }}>
            <div className="dropdown-divider"></div>
            <h4 className='mt-3 mb-4'>프로젝트 수정</h4>
            <InputForm
                project={project}
                setProject={setProject}
                submitHandler={editProject}
                setVisibleToggle={setEditToggle} />
        </div>
    );
}

export default EditProjectForm;