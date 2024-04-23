import { Button, Card, Paragraph, View, YStack, Text, Separator } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { CartApi } from '~/services/api/cart.api';

import { cartDl } from '~/services/data/cart.dl';
import {  productDl } from '~/services/data/products.dl';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '~/queryClient';
import { useAuth } from '~/context/AuthContext';
import { productImages } from '~/utils/images.utils';
import Loading from '~/components/Loading';

const cartApi = new CartApi(cartDl);
const productApi = new ProductsApi(productDl);

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { authState } = useAuth();

	const { data, isFetching } = useQuery({
		queryKey: ['products', id],
		queryFn: () => productApi.getDetails(+id),
	});

	if(isFetching) return (
		<Loading />
	)

	async function addToCart() {
			await cartApi.addToCart({
				productName: data?.name,
				userId: authState?.user?.id,
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
			height={'100%'}>
			  <Separator width={'80%'} marginVertical={20} />
			  <Card
				elevate
				width={300}
				height={400}
				scale={0.9}
				borderRadius={10}
				hoverStyle={{ scale: 0.925 }}
				pressStyle={{ scale: 0.975 }}
				animation={'bouncy'}
			  >
				<Card.Header p={0}>
				  <Animated.Image
					source={productImages[data?.img!]}
					alt={data?.name}
					borderRadius={10}
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
					  {'Price: ' + data?.price + '$'}
					</Paragraph>
				  </YStack>
				</Card.Footer>
			  </Card>
			  <Separator width={'80%'} marginVertical={20} />
			  <Button
			  	mt={20}
			  	width={300}
			  	onPress={() => addToCart()}
			  >
					Add to cart
			  </Button>
			  <Button
			  	mt={20}
			  	width={300}
			  	onPress={() => router.push('/(nav)/shop')}
			  >
					Back
			  </Button>
		</View>
	);
};

export default Page;