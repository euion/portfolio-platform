import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable, mode }) {
  // useState 훅을 통해 isEditing 상태를 생성함.

  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
  //   Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  // }, [portfolioOwnerId]);

  useEffect(() => {
    const dummyUser = {
      name: "euno",
      email: "euno@elice.com",
      description: "안녕하세요",
    };
    setUser(dummyUser);
  }, []);

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
          mode={mode}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          mode={mode}
        />
      )}
    </>
  );
}

export default User;
