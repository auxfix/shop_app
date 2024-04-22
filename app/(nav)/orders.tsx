import { Text, View, Card, Paragraph, YStack, Button, ScrollView, ListItem, useTheme, Separator } from 'tamagui';
import { router } from 'expo-router';
import { CartApi } from '~/services/api/cart.api';
import { CartItem, cartDl } from '~/services/data/cart.dl';
import { useQuery } from '@tanstack/react-query';
import { OrderApi } from '~/services/api/orders.api';
import { orderItemsDl } from '~/services/data/order.itm.dl';
import { Order, orderDl } from '~/services/data/orders.dl';
import { Title } from '~/tamagui.config';


const orderApi = new OrderApi(orderDl, orderItemsDl, cartDl);


const USER_ID = 1;

const Page = () => {
	const theme = useTheme()

	const { data, isFetching } = useQuery({
		queryKey: ['orders'],
		queryFn: () => orderApi.getAllOrders(),
	});

	async function toChekout() {
		router.push('/(nav)/checkout');
	}

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
			flex={1}
			flexDirection="column"
			alignItems='center'
		>
			<Title
				mt={10}
				animation="quick">
				Orders
			</Title>
			<Separator width={'80%'} marginVertical={15} />
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
					{data?.map((order: Order) => 
						<ListItem
							onPress={() => router.push({ pathname: '/(nav)/order', params: { id: order.id!}})}
							backgroundColor={theme.blue5}
							key={order.id} 
							title={order.email}
							subTitle={order.firstName + ' ' + order.lastName + ' / Price: ' + order.totalPrice + '$'}
						/>)
					}
				</YStack>
			</ScrollView>
			<Separator width={'80%'} marginVertical={15} />
		</View>
	);
};

export default Page;