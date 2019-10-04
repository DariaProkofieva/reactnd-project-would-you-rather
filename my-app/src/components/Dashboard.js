import React, { Component, useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 250px;
  background-color: ${props =>
    props.displayUnansweredQuestions
      ? props.theme.mainOrange
      : props.theme.blue};
  border-radius: 25px;
  user-select: none;
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${props => props.theme.mainOrange};
  }
  margin-right: 10px;
`;
const SecondButton = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 250px;
  background-color: ${props =>
    props.displayUnansweredQuestions
      ? props.theme.blue
      : props.theme.mainOrange};
  border-radius: 25px;
  user-select: none;
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${props => props.theme.mainOrange};
  }
  margin-left: 10px;
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const Ul = styled.ul`
  padding: 0;
`;

const Dashboard = ({
  userUnansweredQuestions,
  userAnsweredQuestions,
  authedUser,
  users,
  questionsIds
}) => {
  const [displayUnansweredQuestions, setDisplayUnansweredQuestions] = useState(
    true
  );

  const displayUnansweredQuestionsFunc = e => {
    setDisplayUnansweredQuestions(true);
  };
  const displayAnsweredQuestionsFunc = e => {
    setDisplayUnansweredQuestions(false);
  };
  let display;
  if (displayUnansweredQuestions) {
    display = (
      <Ul>
        {userUnansweredQuestions.map(key => (
          <li key={key}>
            <Question id={key} />
          </li>
        ))}
      </Ul>
    );
  } else {
    display = (
      <Ul>
        {userAnsweredQuestions.map(key => (
          <li key={key}>
            <Question id={key} />
          </li>
        ))}
      </Ul>
    );
  }
  return (
    <StyledDashboard>
      <Buttons>
        <Button
          displayUnansweredQuestions={displayUnansweredQuestions}
          onClick={displayUnansweredQuestionsFunc}
        >
          Unanswered Questions
        </Button>
        <SecondButton
          displayUnansweredQuestions={displayUnansweredQuestions}
          onClick={displayAnsweredQuestionsFunc}
        >
          Answered Questions
        </SecondButton>
      </Buttons>
      <Display>{display}</Display>
    </StyledDashboard>
  );
};

function mapStateToProps({ questions, authedUser, users }) {
  const userQuestions = users[authedUser].answers;
  const userAnsweredQuestions = Object.keys(userQuestions);
  const userUnansweredQuestions = Object.keys(questions).filter(
    key => !userAnsweredQuestions.includes(key)
  );
  return {
    userUnansweredQuestions,
    userAnsweredQuestions,
    authedUser,
    users,
    userUnansweredQuestions: !userUnansweredQuestions
      ? []
      : userUnansweredQuestions.sort(
          (a, b) => questions[b].timestamp - questions[a].timestamp
        ),
    userAnsweredQuestions: !userAnsweredQuestions
      ? []
      : userAnsweredQuestions.sort(
          (a, b) => questions[b].timestamp - questions[a].timestamp
        )
  };
}

export default connect(mapStateToProps)(Dashboard);
