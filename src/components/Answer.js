import React, { useState } from "react";
import { handleAddAnswer } from "../actions/shared";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Results from "./Results";

const BigAvatar = styled.img`
  height: 180px;
  border-radius: 50%;
`;
const StyledAnswer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.blue};
  border-radius: 25px;
  width: 400px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
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
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 80px;
`;
const InnerInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 10px 0;
`;
const Radio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: baseline;
`;
const Answer = ({
  authedUser,
  dispatch,
  qid,
  optionOne,
  optionTwo,
  avatar,
  name,
  id,
  question
}) => {
  const [answer, setAnswer] = useState("");

  const handleChange = event => {
    setAnswer(event.target.value);
  };

  const handleSubmitAnswer = event => {
    event.preventDefault();
    dispatch(handleAddAnswer(authedUser, qid, answer));
  };

  if (id === undefined) {
    return <Redirect to="/page404" />;
  }

  return (
    <div>
      {question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser) ? (
        <Results id={id} />
      ) : (
        <StyledAnswer>
          <Div>
            <h2>{name} asks:</h2>
            <BigAvatar src={avatar} alt={`Avatar of ${name}`}></BigAvatar>
          </Div>
          <Input>
            <h1>Would you Rather...</h1>
            <Form onSubmit={handleSubmitAnswer}>
              <Radio>
                <InnerInput>
                  <input
                    type="radio"
                    id="optionOne"
                    name="option"
                    value="optionOne"
                    onChange={handleChange}
                  />
                  <label htmlFor="optionOne">{optionOne}</label>
                </InnerInput>
                <InnerInput>
                  <input
                    type="radio"
                    id="optionTwo"
                    name="option"
                    value="optionTwo"
                    onChange={handleChange}
                  />
                  <label htmlFor="optionOne">{optionTwo}</label>
                </InnerInput>
              </Radio>
              <Button>Submit</Button>
            </Form>
          </Input>
        </StyledAnswer>
      )}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { id } = props.match.params;
  const question = questions[id];
  if (question === undefined) {
    return {};
  }
  const author = question.author;
  const optionOne = question.optionOne.text;
  const optionTwo = question.optionTwo.text;
  const qid = id;
  const avatar = users[authedUser] ? users[authedUser].avatarURL : null;
  return {
    question,
    id,
    author,
    optionOne,
    optionTwo,
    qid,
    authedUser,
    name: author === undefined ? null : users[author].name,
    avatar
  };
};

export default connect(mapStateToProps)(Answer);
