import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Text, View, YStack, ScrollView, ListItem, useTheme, Separator } from 'tamagui';

import Loading from '~/components/Loading';
import { OrderApi } from '~/services/api/orders.api';
import { cartDl } from '~/services/data/cart.dl';
import { orderItemsDl } from '~/services/data/order.itm.dl';
import { Order, orderDl } from '~/services/data/orders.dl';
import { Title } from '~/tamagui.config';

const orderApi = new OrderApi(orderDl, orderItemsDl, cartDl);

const Page = () => {
  const theme = useTheme();

  const { data, isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.getAllOrders(),
  });

  if (isFetching) return <Loading />;

  const isOrderListEmpty = !data || data?.length === 0;

  return (
    <View flex={1} flexDirection="column" alignItems="center">
      <Title mt={10} animation="quick">
        Orders
      </Title>
      <Separator width="80%" marginVertical={15} />
      <ScrollView
        width="100%"
        height="80%"
        contentContainerStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isOrderListEmpty ? (
          <Text>No orders so far...</Text>
        ) : (
          <YStack flexDirection="column" alignItems="center" paddingVertical="$4" space>
            {data?.map((order: Order) => (
              <ListItem
                onPress={() => router.push({ pathname: '/(nav)/order', params: { id: order.id! } })}
                backgroundColor={theme.blue5}
                key={order.id}
                title={order.email}
                subTitle={
                  order.firstName + ' ' + order.lastName + ' / Price: ' + order.totalPrice + '$'
                }
              />
            ))}
          </YStack>
        )}
      </ScrollView>
      <Separator width="80%" marginVertical={15} />
    </View>
  );
};

export default Page;
