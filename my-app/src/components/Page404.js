import React from "react";
import styled from "styled-components";

const StylePage404 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.orange};
  border-radius: 25px;
  height: 150px;
`;

const Page404 = () => <StylePage404>404 page not found</StylePage404>;

export default Page404;
