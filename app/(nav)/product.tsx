import { Button, Card, Paragraph, View, YStack, useTheme, Text } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { CartApi } from '~/services/api/cart.api';

import { cartDl } from '~/services/data/cart.dl';
import {  productDl } from '~/services/data/products.dl';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '~/queryClient';



const cartApi = new CartApi(cartDl);
const productApi = new ProductsApi(productDl);

const USER_ID = 1;


const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const theme = useTheme()
	//TODO: add real user id

	const { data, isFetching } = useQuery({
		queryKey: ['products', id],
		queryFn: () => productApi.getDetails(+id),
	});

	if(isFetching) return (
		<View
			flex={1}
			flexDirection="column"
			alignItems='center'
			width={'100%'}
			height={'100%'}
		>
			<Text>Loading...</Text>
		</View>
	)

	async function addToCart(id: number) {
			await cartApi.addToCart({
				productName: data?.name,
				userId: 1,
				productId: data?.id,
				price: data?.price
			})
	
			queryClient.invalidateQueries({ queryKey: ['cart'] });
	
			router.push('/(nav)/cart');
	}

	return (
		<View
			flexDirection="column"
			alignItems='center'
			justifyContent='center'
			height={'100%'}
		> 
			  <Card
				elevate
				width={300}
				height={400}
				scale={0.9}
				hoverStyle={{ scale: 0.925 }}
				pressStyle={{ scale: 0.975 }}
				animation={'bouncy'}>
				<Card.Header p={0}>
				  <Animated.Image
					source={{ uri: `https://static.wikia.nocookie.net/fruits-information/images/2/2b/Apple.jpg/revision/latest/scale-to-width-down/1000?cb=20180802112257` }}
					alt={data?.name}
					style={{ width: 300, height: 270 }}
				  />
				</Card.Header>
				<Card.Footer p={8}>
				  <YStack>
					<Text fontSize={20} color={'lightblue'}>
					  {data?.name}
					</Text>
					<Paragraph theme={'alt2'}>
					  {data?.description}
					</Paragraph>
					<Paragraph theme={'alt2'}>
					  {'SKU: ' + data?.sku}
					</Paragraph>
					<Paragraph theme={'alt2'}>
					  {'Price: ' + data?.price}
					</Paragraph>
				  </YStack>
				</Card.Footer>
			  </Card>
			  <Button
			  	mt={20}
			  	width={300}
			  	onPress={() => addToCart(+id)}
			  >
					Add to cart
			  </Button>
		</View>
	);
};

export default Page;