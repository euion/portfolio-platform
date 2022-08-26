import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import EduUpdate from "./EduUpdate";

/**  학력정보 한단위로 나타냄 */
function EduItem({ user, onRemove, onUpdate }) {
  const [viewEdit, setViewEdit] = useState(false);
  return (
    <>
      {console.log(user.school)}
      <div>
        <h5>{user.school}</h5>
        <p>
          {user.major}, {user.position}
        </p>
        <Button onClick={() => onRemove(user.id)}>삭제</Button>
        <Button onClick={() => setViewEdit(!viewEdit)}>
          {viewEdit ? "취소" : "수정"}
        </Button>
        {/* viewEdit이 true면 EduUpdate 컴포넌트가 보여짐 */}
        {viewEdit && (
          <EduUpdate key={user.school} user={user} onUpdate={onUpdate} />
        )}
      </div>
    </>
  );
}

/** 유저 학력정보 리스트 출력*/
function EduList({ users, onRemove, onUpdate }) {
  return (
    <>
      {users.map((user) => (
        <EduItem
          user={user}
          key={user.id}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
}

export default EduList;
