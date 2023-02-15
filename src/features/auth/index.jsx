import {
  InputGroup,
  Input,
  Button,
  InputRightElement,
  FormControl,
  FormLabel,
  FormHelperText,
  Container,
} from '@chakra-ui/react';
import BeatLoader from 'react-spinners/BeatLoader';

const PasswordInput = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter password" />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const EmailInput = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
};

const Auth = () => {
  return (
    <>
      <Container maxW="400px" style={{ marginLeft: '0' }}>
        <PasswordInput />
        <EmailInput />

        <Button isLoading colorScheme="blue" spinner={<BeatLoader size={8} color="white" />}>
          Click me
        </Button>
      </Container>
    </>
  );
};

export default Auth;
