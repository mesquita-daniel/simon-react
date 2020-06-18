import * as React from 'react';
import {Col, Button} from 'react-bootstrap';



const LevelTitle = () => {
    return <h1 id='level-title'> Press A key to start </h1>
}


const toca = (cor: string) => {
    return (
        () => {
            const audio = new Audio(`./sounds/${cor}.mp3`);
            audio.play();
        }
    )
}

const GreenButton = () => {
    return (
        <Col>
            <Button id='green' className='btn green' onClick={toca('green')}/>        
        </Col>
        )
}


const RedButton = () => {
    return (
    <Col>
        <Button id='red' className='btn red' onClick={toca('red')}/>    
    </Col>
    )
}


const YellowButton = () => {
    return (
        <Col>
            <Button id='yellow' className='btn yellow' onClick={toca('yellow')}/>
        </Col>
    )
}


const BlueButton = () => {
    return (
        <Col>
            <Button id='blue' className='btn blue' onClick={toca('blue')}/>        
        </Col>
    )
}

const Resultado = () => {
    return <h1 id='resultado'>Resultado aqui</h1>
}

export {LevelTitle, GreenButton, RedButton, YellowButton, BlueButton, Resultado};