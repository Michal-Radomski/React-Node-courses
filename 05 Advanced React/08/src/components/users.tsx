import React, { useEffect } from "react";
import styled from "styled-components";

import { fetchUser } from "../api/userApi";

const useFetchUsers = () => {
  const [users, setUsers] = React.useState<ObjectI[]>([]);

  const initFetchUsers = async (): Promise<void> => {
    const response = await fetchUser();
    setUsers(response.data);
  };

  return {
    users,
    initFetchUsers,
  };
};

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 2xl;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ContentContainer = styled.div`
  width: 50%;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.h3`
  font-size: 1rem;
  color: #555555;
`;

const FetchButton = styled.button`
  margin-top: 1rem;
  background-color: #0053b3;
  color: #ffffff;
  padding: 1rem;
`;

function Users(): JSX.Element {
  const { users, initFetchUsers } = useFetchUsers();

  useEffect(() => {
    initFetchUsers();
  }, [initFetchUsers]);

  return (
    <Container>
      <FetchButton onClick={initFetchUsers}>Fetch Users</FetchButton>
      <FlexContainer>
        <ContentContainer>
          {users
            ? users.map((user, index) => (
                <React.Fragment key={index}>
                  <UserName>{user.name as string}</UserName>
                  <UserEmail>{user.email as string}</UserEmail>
                </React.Fragment>
              ))
            : null}
        </ContentContainer>
      </FlexContainer>
    </Container>
  );
}
export default Users;
