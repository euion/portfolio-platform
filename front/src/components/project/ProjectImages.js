import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import ImageViewer from './ImageViewer';

const ProjectImages = ({ imagePaths }) => {
    const backUrl = 'http://localhost:3333';
    const urlList = imagePaths?.map(v => `${backUrl}/${v}`)
    const [open, setOpen] = useState(false);
    const openImageViewer = () => {
        setOpen(true);
    }
    return (
        <>
            {/* 렉걸려서 자동으로 넘어가는 기능 끔 */}
            {/* {open && <ImageViewer />} */}
            {urlList[0] &&
                <Carousel variant='dark' interval={null} >
                    {urlList?.map(v =>
                        <Carousel.Item>
                            <img
                                onClick={openImageViewer}
                                style={{ height: '450px', objectFit: 'contain' }}
                                className="d-block w-100"
                                src={v}
                                alt="Project Pic"
                            />
                        </Carousel.Item>)}
                </Carousel>}

        </>
    );
}

export default ProjectImages;

{/* <Carousel.Caption>
     <h3>Second slide label</h3>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</Carousel.Caption> */}