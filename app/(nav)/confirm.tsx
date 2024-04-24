import { Button, Paragraph, View, SizableText } from 'tamagui';
import { router } from 'expo-router';
import { queryClient } from '~/queryClient';

const Page = () => {
  async function backToShopping() {
    await queryClient.invalidateQueries({ queryKey: ['cart'] });
    router.navigate('/(nav)/shop');
  }

  return (
    <View flexDirection="column" alignItems="center" justifyContent="center" height={'100%'}>
      <SizableText size={'$10'} mb={30} color={'fff'}>
        Amazing!
      </SizableText>
      <Paragraph textAlign="center" size={'$7'} color={'fff'} w={'80%'}>
        We will deliver your products in the next 6-8 hours!
      </Paragraph>
      <Button mt={60} width={300} onPress={backToShopping}>
        Cool!
      </Button>
    </View>
  );
};

export default Page;
