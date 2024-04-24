import { router } from 'expo-router';
import { Text, View, Input, Button, Card, Separator } from 'tamagui';
import { useAuth } from '~/context/AuthContext';
import { Title } from '~/tamagui.config';

const Page = () => {
  const { authState, onLogout } = useAuth();

  const onLogoutPressed = () => {
    onLogout!();
    router.replace('/');
  };

  return (
    <View
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={'100%'}
      width={'100%'}>
      <Title mt={10} animation="quick">
        Profile details:
      </Title>
      <Separator width={'80%'} marginVertical={25} />
      <Card width={'90%'} height={330} p={10}>
        <Text mt={15} mb={8} color={'white'}>
          Name
        </Text>
        <Input value={authState?.user?.username} readOnly />
        <Text mt={15} mb={8} color={'white'}>
          Email
        </Text>
        <Input value={authState?.user?.email} readOnly />
        <Text mt={15} mb={8} color={'white'}>
          Role
        </Text>
        <Input value={authState?.role} readOnly />
      </Card>

      <Button mt={30} width={'90%'} onPress={onLogoutPressed}>
        Logout
      </Button>
    </View>
  );
};

export default Page;
