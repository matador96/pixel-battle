import React, { useState } from 'react';
import Canvas from './components/Canvas';
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
import colors from './consts/colors';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import UserConnect from './socket/connect';

const GameOnline = () => (
  <div className="game-online">
    <Card>
      <CardBody>
        <Text>
          Онлайн <UserConnect /> человек
        </Text>
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

// const GameZoom = () => (
//   <div className="game-zoom">
//     <ButtonGroup size="md" isAttached variant="solid" color="gray">
//       <IconButton aria-label="Add to friends" icon={<AiOutlineMinus />} />

//       <Button style={{ width: '140px' }}>
//         <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 30]}>
//           <RangeSliderTrack>
//             <RangeSliderFilledTrack />
//           </RangeSliderTrack>
//           <RangeSliderThumb index={1} />
//         </RangeSlider>
//       </Button>

//       <IconButton aria-label="Add to friends" icon={<AiOutlinePlus />} />
//     </ButtonGroup>
//   </div>
// );

const GameSettings = (props) => {
  const { choosedColor, onChangeColor } = props;
  return (
    <div className="game-settings">
      <Card>
        <CardBody>
          <Text>
            <div className="colors-block">
              <div className="colors-list">
                {colors.map((color) => (
                  <div
                    onClick={() => onChangeColor(color.hex)}
                    id={color.hex}
                    data-color={color.hex}
                    style={{
                      backgroundColor: color.rgb,
                      opacity: choosedColor === color.hex ? 0.2 : 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </Text>
        </CardBody>
      </Card>
    </div>
  );
};

const Game = () => {
  const [choosedColor, setColor] = useState('#5CBF0D');

  return (
    <div className="game">
      <GameSettings choosedColor={choosedColor} onChangeColor={setColor} />
      <GameOnline />
      <GameCoordinates />
      <Canvas choosedColor={choosedColor} />
    </div>
  );
};

export default Game;
