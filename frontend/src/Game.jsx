import React, { useState } from 'react';
import Canvas from './components/Canvas';
import { Card, CardBody, Text } from '@chakra-ui/react';
import colors from './consts/colors';
import UserConnect from './socket/connect';
import { useToast } from '@chakra-ui/react';

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
                    className={choosedColor === color.hex ? 'choosed' : ''}
                  >
                    <div
                      style={{
                        backgroundColor: color.rgb,
                      }}
                    />
                  </div>
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
  const [choosedColor, setColor] = useState(colors[0].hex);
  const toast = useToast();

  return (
    <div className="game">
      <GameSettings choosedColor={choosedColor} onChangeColor={setColor} />
      <GameOnline />
      <GameCoordinates />
      <Canvas choosedColor={choosedColor} toast={toast} />
    </div>
  );
};

export default Game;
