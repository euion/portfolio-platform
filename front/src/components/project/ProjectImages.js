import Carousel from 'react-bootstrap/Carousel';

const ProjectImages = () => {
    return (
        <>
            {/* 렉걸려서 자동으로 넘어가는 기능 끔 */}
            <Carousel interval={null}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/64246481/186372455-8eb5ac0b-2de0-47eb-89e4-c5a11f3b054f.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>이미지 이름</h3>
                        <p>간단한 이미지 설명</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/64246481/186374174-59209a10-9d7c-4c4d-8e2e-631b34e871c6.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>이미지 이름</h3>
                        <p>간단한 이미지 설명</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </>
    );
}

export default ProjectImages;

{/* <Carousel.Caption>
     <h3>Second slide label</h3>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</Carousel.Caption> */}