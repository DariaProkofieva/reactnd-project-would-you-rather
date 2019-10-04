import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledResult = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;
const SmallAvatar = styled.img`
  height: 150px;
  border-radius: 50%;
  margin: 10px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 50px;
`;
const Question = styled.div`
  background-color: ${props => props.theme.blue};
  border-radius: 25px;
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 20px;
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PercentageCircle = styled.div`
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
const Percentage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
`;
const H2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainOrange};
  width: 400px;
  border-radius: 25px;
  padding: 10px;
  color: white;
  margin: 10px;
`;
class Results extends Component {
  render() {
    const { optionOne, optionTwo, question, name, avatar } = this.props;
    const allVotes =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const oneUser = Math.round(100 / allVotes);
    const percentageOptionOne = oneUser * optionOneVotes;
    const percentageOptionTwo = oneUser * optionTwoVotes;
    return (
      <StyledResult>
        <Div>
          <h3>Asked by {name}</h3>
          <SmallAvatar src={avatar} alt={`Avatar of ${name}`}></SmallAvatar>
        </Div>
        <TextArea>
          <H2>Results:</H2>
          <Question>
            <h3>Would you rather {optionOne}?</h3>
            <Percentage>
              <PercentageCircle>
                <h2>{percentageOptionOne} %</h2>
              </PercentageCircle>
              <p>
                {optionOneVotes} out of {allVotes} votes
              </p>
            </Percentage>
          </Question>
          <Question>
            <h3>Would you rather {optionTwo}?</h3>
            <Percentage>
              <PercentageCircle>
                <h2>{percentageOptionTwo} %</h2>
              </PercentageCircle>
              <p>
                {optionTwoVotes} out of {allVotes} votes
              </p>
            </Percentage>
          </Question>
        </TextArea>
      </StyledResult>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  if (question === undefined) {
    return;
  }
  const author = question.author;
  const optionOne = question.optionOne.text;
  const optionTwo = question.optionTwo.text;
  const avatar = users[authedUser].avatarURL;
  return {
    optionOne,
    optionTwo,
    question,
    avatar,
    name: author === undefined ? null : users[author].name
  };
}
export default connect(mapStateToProps)(Results);
