import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Container, Row } from "react-bootstrap";
import {
  LevelTitle,
  GameButton,
  CurrentScore,
  LastScore,
  BestScore,
} from "./regular-components";
import { NewGameObserver, DrawnOrderSignalizer } from "./logical-components";
import { Color } from "./types-def";
import { store } from "./app-reducer";
import "./styles/main.scss";

ReactDOM.render(
  <Provider store={store}>
    <NewGameObserver />
    <DrawnOrderSignalizer />
    <LevelTitle />
    <Container>
      <Row>
        <GameButton color={Color.green} />
        <GameButton color={Color.red} />
      </Row>
      <Row>
        <GameButton color={Color.yellow} />
        <GameButton color={Color.blue} />
      </Row>
    </Container>
    <CurrentScore />
    <LastScore />
    <BestScore />
  </Provider>,
  document.querySelector("#root")
);
