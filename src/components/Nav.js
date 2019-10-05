import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authedUser";

import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  :hover {
    background-color: ${props => props.theme.mainOrange};
  }
  list-style-type: none;
  font-size: 16px;
  padding: 14px;
  border-radius: 25px;
  text-decoration: none;
  color: ${props => props.theme.black};
`;
const MainNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;
const SmallAvatar = styled.img`
  height: 50px;
  border-radius: 25px;
  margin: 10px;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Nav = ({ authedUser, userName, avatar, dispatch }) => {
  const handleLogout = event => {
    dispatch(logout(authedUser));
  };

  return (
    <MainNav>
      <StyledNavLink to="/home">Home</StyledNavLink>
      <StyledNavLink to="/add">New Question</StyledNavLink>
      <StyledNavLink to="/leaderboard">Leader Board</StyledNavLink>
      {authedUser !== null && (
        <StyledDiv>
          <div>Hello, {userName} </div>
          <SmallAvatar src={avatar} alt={`Avatar of ${userName}`}></SmallAvatar>
          <StyledNavLink to="/login" onClick={() => handleLogout()}>
            Log out
          </StyledNavLink>
        </StyledDiv>
      )}
    </MainNav>
  );
};

function mapStateToProps({ authedUser, users }) {
  const userName = users[authedUser] ? users[authedUser].name : null;
  const avatar = users[authedUser] ? users[authedUser].avatarURL : null;
  return {
    authedUser,
    userName,
    avatar
  };
}
export default connect(mapStateToProps)(Nav);
