import Carousel from "react-bootstrap/Carousel";
import { backPort } from "../../config";
import { backServer } from "../../config";

const ProjectImages = ({ imagePath }) => {
  const serverUrl = backServer + backPort + "/";
  const urlList = imagePath?.map((v) => `${serverUrl}${v}`);

  return (
    <>
      {urlList[0] && (
        <Carousel variant="dark" interval={null}>
          {" "}
          {/* 렉걸려서 자동으로 이미지 넘어가는 기능 끔 */}
          {urlList?.map((v, i) => (
            <Carousel.Item key={v + "url" + i}>
              <img
                style={{ height: "450px", objectFit: "contain" }}
                className="d-block w-100"
                src={v}
                alt="프로젝트 이미지"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProjectImages;
