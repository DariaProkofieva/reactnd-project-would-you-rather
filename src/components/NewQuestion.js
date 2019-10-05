import React from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const StyledNewQuestion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 380px;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.29);
  overflow: auto;
  :focus {
    outline: none;
  }
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

function NewQuestion({ dispatch }) {
  const [toHome, setToHome] = useState(false);
  const [state, setState] = React.useState({
    optionOneText: "",
    optionTwoText: ""
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(handleAddQuestion(state.optionOneText, state.optionTwoText));
    setToHome(() => true);
  };

  if (toHome === true) {
    return <Redirect to="/home" />;
  }

  return (
    <StyledNewQuestion>
      <h1>Create New Question</h1>
      <p>Complete the question:</p>
      <h2>Would you rather...</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter option one text here"
          value={state.optionOneText}
          name="optionOneText"
          maxLength={100}
          onChange={handleChange}
        ></Input>
        <h3>OR</h3>
        <Input
          type="text"
          placeholder="Enter option two text here"
          value={state.optionTwoText}
          name="optionTwoText"
          maxLength={100}
          onChange={handleChange}
        ></Input>
        <Button>Submit</Button>
      </Form>
    </StyledNewQuestion>
  );
}

export default connect()(NewQuestion);
