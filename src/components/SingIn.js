import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: ${props => props.theme.mainBlue};
`;
const BigAvatar = styled.img`
  height: 150px;
  border-radius: 25px;
  margin: 10px;
`;
const Button = styled.button`
  text-transform: uppercase;
  margin: 35px auto;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 400px;
  background-color: ${props => props.theme.mainOrange};
  border-radius: 25px;
  user-select: none;
  :focus {
    outline: none;
  }
`;
const StyledSingIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  user-select: none;
  :focus {
    outline: none;
  }
`;
const StyledFormButton = styled.select`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.29);
  cursor: pointer;
  background: #fff;
  font-size: 16px;
  width: 400px;
  border-radius: 25px;
  overflow: auto;
  :focus {
    outline: none;
  }
`;
const SingIn = ({ users, authedUser, dispatch }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = event => {
    setSelectedUser(event.target.value);
  };

  const handleSubmitUser = event => {
    event.preventDefault();
    dispatch(setAuthedUser(selectedUser));
  };

  return (
    <StyledSingIn>
      <h1>Welcome to the Would you Rather App!</h1>
      <h2>Please sing in to continue</h2>
      <BigAvatar
        src="https://sun9-30.userapi.com/c851232/v851232949/1c5381/uABhMbHAaCQ.jpg"
        alt="Avatar icon"
      ></BigAvatar>
      <StyledH1>Sing in</StyledH1>
      <StyledForm onSubmit={handleSubmitUser}>
        <StyledFormButton onChange={handleChange}>
          <option>Select User</option>
          {Object.keys(users).map(user => (
            <option key={users[user].id} value={users[user].id}>
              {users[user].name}
            </option>
          ))}
        </StyledFormButton>
        <Button>Sing in</Button>
        {authedUser !== null ? <Redirect to="/home" /> : null}
      </StyledForm>
    </StyledSingIn>
  );
};

function mapStateToProps({ users, authedUser }) {
  if (authedUser === undefined) {
    return;
  }
  return {
    users,
    authedUser
  };
}
export default connect(mapStateToProps)(SingIn);
