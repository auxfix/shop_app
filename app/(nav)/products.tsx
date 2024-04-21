import { Text, View, Card, Paragraph, YStack, Button, ScrollView, ListItem, useTheme } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { CartApi } from '~/services/api/cart.api';
import { Cart } from '~/services/data/cart.dl';
import { useLoading } from '~/hooks/useLoad';
import { Order, OrderApi } from '~/services/api/orders.api';

const USER_ID = 1;

const Page = () => {
	const theme = useTheme()
	//TODO: add real user id

	const [isFetching, doLoad, data] = useLoading(async () => OrderApi.getAllOrders());


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
			<Text fontSize={30} color={'black'}>Your Cart:</Text>
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
							onPress={() => router.navigate({pathname: "/(nav)/editproduct", params: { id: order.id }})}
							backgroundColor={theme.blue7}
							key={order.id} 
							title={order.id}
							subTitle={order.email}
						/>)
					}
				</YStack>
			</ScrollView>
		</View>
	);
};

export default Page;