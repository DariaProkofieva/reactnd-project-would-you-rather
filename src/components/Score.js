import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledScore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  background-color: ${props => props.theme.orange};
  border-radius: 25px;
  width: 500px;
  margin: 30px;
  padding: 20px;
`;
const SmallAvatar = styled.img`
  height: 150px;
  border-radius: 50%;
  margin: 10px;
`;
const Text = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  justify-content: center;
  margin: 0;
`;
const InnerText = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;
const Questions = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
`;
const QuestionsNumber = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  padding-left: 25px;
`;
const ScoreText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ScoreCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.mainOrange};
  font-weight: bold;
  color: white;
`;
const Score = ({
  user,
  answeredQuestions,
  createdQuestions,
  score,
  avatar
}) => {
  return (
    <StyledScore>
      <SmallAvatar src={avatar} alt={`Avatar of ${user.name}`}></SmallAvatar>
      <Text>
        <h3>{user.name}</h3>
        <InnerText>
          <Questions>
            <p>Answered questions: </p>
            <p>Created questions: </p>
          </Questions>
          <QuestionsNumber>
            <p>{answeredQuestions}</p>
            <p>{createdQuestions}</p>
          </QuestionsNumber>
        </InnerText>
      </Text>
      <ScoreText>
        <h3>Score</h3>
        <ScoreCircle>
          <h1>{score}</h1>
        </ScoreCircle>
      </ScoreText>
    </StyledScore>
  );
};

function mapStateToProps({ questions, authedUser, users }, { id }) {
  const user = users[id];
  if (user === undefined) {
    return {};
  }
  const answeredQuestions = Object.keys(user.answers).length;
  const createdQuestions = Object.keys(user.questions).length;
  const score = createdQuestions + answeredQuestions;
  const avatar = user.avatarURL;
  return {
    user,
    answeredQuestions,
    createdQuestions,
    score,
    avatar
  };
}

export default connect(mapStateToProps)(Score);
