import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import styled from "styled-components"

const StyledNewQuestion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`
const Input = styled.input`
  width: 380px;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid rgba(0,0,0,.29);
  overflow: auto;
  :focus{outline: none;} 
`
const Button = styled.button`
  text-transform: uppercase;
  margin: 35px auto;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 400px;
  background-color: ${props => props.theme.mainOrange};
  border-radius:25px;
  user-select: none;
  :focus {outline: none;}
`
class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChange = ( event ) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = ( event ) => {
    event.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    this.setState(() => ({
      toHome: true
    }))
  }
  
  render() {
    const { toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/home'/>
    }
    return (
      <StyledNewQuestion>
        <h1>Create New Question</h1>
        <p>Complete the question:</p>
        <h2>Would you rather...</h2>
        <Form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          placeholder="Enter option one text here"
          value={this.state.optionOneText}
          name="optionOneText"
          maxLength={100}
          onChange={this.handleChange}
        >
        </Input>
        <h3>OR</h3>
        <Input
          type="text"
          placeholder="Enter option two text here"
          value={this.state.optionTwoText}
          name="optionTwoText"
          maxLength={100}
          onChange={this.handleChange}      
        ></Input>
        <Button>Submit</Button>
        </Form>
      </StyledNewQuestion>
    )
  }
}
export default connect()(NewQuestion)
