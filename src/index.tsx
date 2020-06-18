import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {LevelTitle, GreenButton, RedButton, YellowButton, BlueButton, Resultado} from './header';
import {Container, Row} from 'react-bootstrap';
import './styles/main.scss';

ReactDOM.render(
    <div>    
        <LevelTitle />
        <Container>
            <Row>
                <GreenButton />
                <RedButton />
            </Row>
            <Row>
                <YellowButton />
                <BlueButton />
            </Row>
        </Container>
        <Resultado />
    </div>,
    document.querySelector('#root')
)