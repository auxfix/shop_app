import { Text, View, Card, Paragraph, YStack, Button, ScrollView, ListItem, useTheme, Separator } from 'tamagui';
import { router } from 'expo-router';
import { CartApi } from '~/services/api/cart.api';
import { CartItem, cartDl } from '~/services/data/cart.dl';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';

const cartApi = new CartApi(cartDl);

const Page = () => {
	const theme = useTheme()
	const { authState } = useAuth();

	const { data, isFetching } = useQuery({
		queryKey: ['cart'],
		queryFn: () => cartApi.getCartByUserId(authState?.user?.id!),
	});

	async function toChekout() {
		if(!data || data.length === 0) {
			alert('Please, add product to cart.');
			return;	
		}
 
		router.push('/(nav)/checkout');
	}

	const isBasketEmpty = !data || data?.length === 0; 

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
			<Text pt={10} fontSize={30} color={'black'}>Your Cart:</Text>
			<Separator width={'80%'} marginVertical={15} />
			<ScrollView
				width={'100%'}
				height={'80%'}
				contentContainerStyle={{
						display: 'flex',	
						justifyContent:'center',
						alignItems:'center'
					}}
				>	
				{
					isBasketEmpty ? (
						<Text>
							Please, add some products to the basket...
						</Text>
					): (
						<YStack 
							flexDirection="column"
							alignItems='center'
							paddingVertical="$4" 
							space
						>
							{data?.map((cartItem: CartItem) => 
								<ListItem
									backgroundColor={theme.blue5}
									key={cartItem.id} 
									title={cartItem.productName}
									subTitle={'Price: ' + cartItem.price + '$'}
								/>)
							}
						</YStack>
					) 
				}

			</ScrollView>
			<Separator width={'80%'} marginVertical={15} />
			<Button
				mt={30}
				width={300}
				backgroundColor={theme.blue5}
				onPress={ () => router.push('/(nav)/shop')}
			>
				Back to shoping
			</Button>
			<Button
				my={30}
				width={300}
				backgroundColor={theme.blue5}
				onPress={ () => toChekout()}
			>
				Checkout
			</Button>
		</View>
	);
};

export default Page;