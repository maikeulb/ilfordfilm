import React from 'react';

import styled from 'styled-components';
import { Button } from 'antd';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
`;

const ButtonContainer = styled.div`
    display: block;
    font: inherit;
    padding: 5px;
    margin: 0 5px;
    width: 40px;
    cursor: pointer;
`;

const LabelContainer = styled.div`
    padding: 10px;
    font-weight: bold;
    width: 80px;
    text-align: start;
`;

const control = (props) => (
    <Container>
        <LabelContainer>
          {props.label}
        </LabelContainer>
        <ButtonContainer>
            <Button shape="circle" icon="minus" 
            onClick={props.removed} 
            disabled={props.disabled}/>
        </ButtonContainer>
        <ButtonContainer>
            <Button shape="circle" icon="plus" 
            onClick={props.added}/>
        </ButtonContainer>
    </Container>
);

export default control;
