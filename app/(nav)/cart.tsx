import { Text, View, Card, Paragraph, YStack, Button, ScrollView, ListItem, useTheme } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { useQuery } from '@tanstack/react-query';
import { CartApi } from '~/services/api/cart.api';
import { Cart } from '~/services/data/cart.dl';

const USER_ID = 1;

const Page = () => {
	const theme = useTheme()
	//TODO: add real user id
	const {data, isFetching} = useQuery({
		queryKey: ['cart'],
		queryFn: () => CartApi.getCartByUserId(USER_ID),
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
					{data?.map((cartItem: Cart) => 
						<ListItem
							backgroundColor={theme.blue7}
							key={cartItem.id} 
							title={cartItem.productName}
							subTitle={'Price: ' + cartItem.price}
						/>)
					}
				</YStack>
			</ScrollView>
			<Button
				my={30}
				width={300}
				backgroundColor={theme.blue7}
				onPress={ () => toChekout()}
			>
				Checkout
			</Button>
		</View>
	);
};

export default Page;