import React from 'react';
import Canvas from './../components/Canvas/Canvas';
import { Card, CardBody } from '@chakra-ui/react';

const Game = () => (
  <div className="game">
    <Card>
      <CardBody>
        <Canvas />
      </CardBody>
    </Card>
  </div>
);

export default Game;
