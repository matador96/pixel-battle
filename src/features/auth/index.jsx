import {
  InputGroup,
  Input,
  Button,
  InputRightElement,
  FormControl,
  FormLabel,
  FormHelperText,
  Container,
  InputLeftAddon,
  Stack,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  Card,
  CardBody,
} from '@chakra-ui/react';
import BeatLoader from 'react-spinners/BeatLoader';

const LoginInputs = () => {
  return (
    <>
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Login</FormLabel>
          <Input type="name" variant="filled" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" variant="filled" />
        </FormControl>
      </Stack>
    </>
  );
};

const RegistrationInputs = () => {
  return (
    <>
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Login</FormLabel>
          <Input type="name" variant="filled" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" variant="filled" />
        </FormControl>
      </Stack>
    </>
  );
};

const Auth = () => {
  return (
    <>
      <Container maxW="400px" style={{ marginLeft: '0', paddingLeft: 0 }}>
        <Card>
          <CardBody>
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab>Login</Tab>
                <Tab>Registration</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <LoginInputs />
                  <Button
                    mt={4}
                    isLoading
                    colorScheme="blue"
                    spinner={<BeatLoader size={8} color="white" />}
                  >
                    Login
                  </Button>
                </TabPanel>
                <TabPanel>
                  <RegistrationInputs />

                  <Button
                    mt={4}
                    isLoading
                    colorScheme="green"
                    spinner={<BeatLoader size={8} color="white" />}
                  >
                    Registration
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Auth;
