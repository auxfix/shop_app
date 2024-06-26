import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Text,
  View,
  Card,
  Paragraph,
  YStack,
  Button,
  ScrollView,
  ListItem,
  useTheme,
  Separator,
} from 'tamagui';

import Loading from '~/components/Loading';
import { OrderApi } from '~/services/api/orders.api';
import { cartDl } from '~/services/data/cart.dl';
import { OrderItem, orderItemsDl } from '~/services/data/order.itm.dl';
import { orderDl } from '~/services/data/orders.dl';
import { Title } from '~/tamagui.config';

const orderApi = new OrderApi(orderDl, orderItemsDl, cartDl);

const Page = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isFetching } = useQuery({
    queryKey: ['order'],
    queryFn: () => orderApi.getOrderAndOrderItems(+id),
  });

  if (isFetching) return <Loading />;

  return (
    <View flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Card
        elevate
        mt={20}
        width="95%"
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.975 }}
        animation="bouncy"
        backgroundColor={theme.blue5}>
        <Card.Footer p={8}>
          <YStack>
            <Text fontSize={20} color="lightblue">
              {'Id: ' + data?.order.id}
            </Text>
            <Paragraph theme="alt2">{'email: ' + data?.order.email}</Paragraph>
            <Paragraph theme="alt2">{data?.order.firstName + ' ' + data?.order.lastName}</Paragraph>
            <Paragraph theme="alt2">{data?.order.totalPrice}</Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
      <Title mt={15} animation="quick">
        Products:
      </Title>
      <Separator width="80%" marginVertical={15} />
      <ScrollView width="100%" height="80%">
        <YStack flexDirection="column" alignItems="center" paddingVertical="$4" space>
          {data?.orderItems?.map((oi: OrderItem) => (
            <ListItem
              width="95%"
              backgroundColor={theme.blue5}
              key={oi.id}
              title={oi.productName}
            />
          ))}
        </YStack>
      </ScrollView>
      <Separator width="80%" marginTop={25} />
      <Button
        my={30}
        width="90%"
        backgroundColor={theme.blue5}
        onPress={() => router.push('/(nav)/orders')}>
        OK
      </Button>
    </View>
  );
};

export default Page;
