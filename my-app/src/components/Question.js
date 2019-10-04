import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SmallAvatar = styled.img`
  height: 150px;
  border-radius: 50%;
  margin: 10px;
`;
const StyledQuestion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.blue};
  border-radius: 25px;
  width: 500px;
  margin: 30px;
  padding: 20px;
`;
const StyledLink = styled(Link)`
  text-transform: uppercase;
  margin: 35px auto;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 250px;
  background-color: ${props => props.theme.mainOrange};
  border-radius: 25px;
  user-select: none;
  :focus {
    outline: none;
  }
  text-decoration: none;
  color: ${props => props.theme.black};
  text-align: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 50px;
`;
const InnerQuestion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  background-color: ${props => props.theme.orange};
  border-radius: 25px;
  width: 300px;
  padding: 10px;
`;
const Question = ({ authedUser, question, name, id, questions, avatar }) => {
  return (
    <StyledQuestion>
      <Div>
        <h3>{question.name} asks:</h3>
        <SmallAvatar src={avatar} alt={`Avatar of ${name}`}></SmallAvatar>
      </Div>
      <InnerQuestion>
        <h2>Would you rather</h2>
        <p>...{question.optionOne.text}...</p>
        <StyledLink to={`/answer/${id}`}>View Profile</StyledLink>
      </InnerQuestion>
    </StyledQuestion>
  );
};

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const question = questions[id];
  if (question === undefined) {
    return;
  }
  const user = question ? users[question.author] : null;
  const avatar = user ? user.avatarURL : null;
  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser),
    avatar,
    questions,
    id
  };
}

export default connect(mapStateToProps)(Question);
