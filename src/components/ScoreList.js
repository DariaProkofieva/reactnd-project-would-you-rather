import React from "react";
import { connect } from "react-redux";
import Score from "./Score";
import styled from "styled-components";

const StyledScoreList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;
const ScoreList = ({ usersIdsSorted, id }) => {
  return (
    <StyledScoreList>
      {usersIdsSorted.map(id => (
        <li key={id}>
          <Score id={id} />
        </li>
      ))}
    </StyledScoreList>
  );
};

function mapStateToProps({ users }) {
  return {
    usersIdsSorted: Object.keys(users).sort(
      (userKeyA, userKeyB) =>
        Object.keys(users[userKeyB].answers).length +
        users[userKeyB].questions.length -
        Object.keys(users[userKeyA].answers).length -
        users[userKeyA].questions.length
    )
  };
}

export default connect(mapStateToProps)(ScoreList);
