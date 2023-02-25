import React from 'react';
import Canvas from './../components/Canvas/Canvas';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Button,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import colors from './../consts/colors';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const GameOnline = () => (
  <div className="game-online">
    <Card>
      <CardBody>
        <Text>Онлайн 300 человек</Text>
      </CardBody>
    </Card>
  </div>
);

const GameCoordinates = () => (
  <div className="game-coordinates">
    <Card className="black-gamecard">
      <CardBody>
        <Text id="black-gamecard-value">1000, 3000</Text>
      </CardBody>
    </Card>
  </div>
);

const GameZoom = () => (
  <div className="game-zoom">
    <ButtonGroup size="md" isAttached variant="solid" color="gray">
      <IconButton aria-label="Add to friends" icon={<AiOutlineMinus />} />

      <Button style={{ width: '140px' }}>
        <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 30]}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Button>

      <IconButton aria-label="Add to friends" icon={<AiOutlinePlus />} />
    </ButtonGroup>
  </div>
);

const GameSettings = () => (
  <div className="game-settings">
    <Card>
      <CardBody>
        <Text>
          <div className="colors-block">
            <div className="colors-list">
              {colors.map((color) => (
                <div id={color.hex} data-color={color.hex} style={{ backgroundColor: color.rgb }} />
              ))}
            </div>
          </div>
        </Text>
      </CardBody>
    </Card>
  </div>
);

const Game = () => (
  <div className="game">
    <GameSettings />
    <GameOnline />
    <GameCoordinates />
    <GameZoom />
    <Canvas />
  </div>
);

export default Game;
