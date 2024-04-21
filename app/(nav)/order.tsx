import { Text, View, Card, Paragraph, YStack, Button, ScrollView, ListItem, useTheme } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { CartApi } from '~/services/api/cart.api';

import {  productDl } from '~/services/data/products.dl';
import {  cartDl } from '~/services/data/cart.dl';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '~/queryClient';
import { OrderApi } from '~/services/api/orders.api';
import { orderDl } from '~/services/data/orders.dl';
import { OrderItem, orderItemsDl } from '~/services/data/order.itm.dl';

const orderApi = new OrderApi(orderDl, orderItemsDl, cartDl);

const Page = () => {
	const theme = useTheme();
	const { id } = useLocalSearchParams<{ id: string }>();

	const { data, isFetching } = useQuery({
		queryKey: ['order'],
		queryFn: () => orderApi.getOrderAndOrderItems(+id),
	});

	if(isFetching) return (
		<View
			flex={1}
			flexDirection="column"
			alignItems='center'
		>
			<Text>Loading...</Text>
		</View>
	)

	return (
		<View
			flexDirection="column"
			alignItems='center'
			justifyContent='center'
			height={'100%'}
		> 
			  <Card
				elevate
				width={'95%'}
				scale={0.9}
				hoverStyle={{ scale: 0.925 }}
				pressStyle={{ scale: 0.975 }}
				animation={'bouncy'}
			>
				<Card.Footer p={8}>
				  <YStack>
					<Text fontSize={20} color={'lightblue'}>
					  {'Id: ' + data?.order.id}
					</Text>
					<Paragraph theme={'alt2'}>
					  {'email: ' + data?.order.email}
					</Paragraph>
					<Paragraph theme={'alt2'}>
					  {data?.order.firstName + ' ' + data?.order.lastName}
					</Paragraph>
					<Paragraph theme={'alt2'}>
					  {data?.order.totalPrice}
					</Paragraph>
				  </YStack>
				</Card.Footer>
			  </Card>
			  <ScrollView
				width={'100%'}
				height={'80%'}
			>	
				<YStack 
					flexDirection="column"
					alignItems='center'
					paddingVertical="$4" 
					space
				>
					{data?.orderItems?.map((oi: OrderItem) => 
						<ListItem
							backgroundColor={theme.blue7}
							key={oi.id} 
							title={oi.productName}
						/>)
					}
				</YStack>
			</ScrollView>
		</View>
	);
};

export default Page;