
import { ScrollView, YStack,  View, Text, Card, Paragraph } from 'tamagui'
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { Product } from '../../services/data/products.dl';

const Page = () => {
	const {data, isFetching} = useQuery({
		queryKey: ['products'],
		queryFn: ProductsApi.getAll,
	  });

	if(isFetching) return (
		<View>
			<Text>Loading...</Text>
		</View>
	)


	return (
		<View
			flex={1}
			flexDirection="column"
			alignItems='center'
		>
			<Text fontSize={30} color={'blackA'}>Shop the best products:</Text>
			<ScrollView
				width={'100%'}
			>	
            <YStack 
				flex={1}
				flexDirection="column"
				alignItems='center'
				paddingVertical="$4" 
				space
				width={'100%'}
			>
				{data?.map((product: Product) => 
				  <Card
					key={product.id}
					onPress={() => {
						router.push({ pathname: '/(nav)/product', params: { id: product.id}})
					}}
					elevate
					width={300}
					height={260}
					scale={0.9}
					hoverStyle={{ scale: 0.925 }}
					pressStyle={{ scale: 0.975 }}
					animation={'bouncy'}>
					<Card.Header p={0}>
					  <Animated.Image
						source={{ uri: `https://static.wikia.nocookie.net/fruits-information/images/2/2b/Apple.jpg/revision/latest/scale-to-width-down/1000?cb=20180802112257` }}
						alt={product.name}
						style={{ width: 300, height: 140 }}
					  />
					</Card.Header>
					<Card.Footer p={8}>
					  <YStack>
						<Text fontSize={20} color={'lightblue'}>
						  {product.name}
						</Text>
						<Paragraph theme={'alt2'}>
						  {product.description}
						</Paragraph>
						<Paragraph theme={'alt2'}>
						  {'SKU: ' + product.sku}
						</Paragraph>
						<Paragraph theme={'alt2'}>
						  {'Price: ' + product.price}
						</Paragraph>
					  </YStack>
					</Card.Footer>
				  </Card>)}
             </YStack>
			</ScrollView>
		</View>
	);
};

export default Page;

