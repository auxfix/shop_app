
import { ScrollView, YStack,  View, Text, Card, Paragraph, Separator, useTheme, Spinner } from 'tamagui'
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { Product, productDl } from '~/services/data/products.dl';
import { useQuery } from '@tanstack/react-query';
import { Title } from '~/tamagui.config';
import { productImages } from '~/utils/images.utils';
import Loading from '~/components/Loading';

const productApi = new ProductsApi(productDl);

const Page = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['products'],
		queryFn: () => productApi.getAll(),
	});

	if(isFetching) return (
		<Loading />
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
				Buy the best products:
			</Title>
			<Separator width={'80%'} marginVertical={15} />
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
						router.push({ pathname: '/(nav)/product', params: { id: product.id! }})
					}}
					elevate
					width={300}
					height={300}
					scale={0.9}
					borderRadius={10}
					hoverStyle={{ scale: 0.925 }}
					pressStyle={{ scale: 0.975 }}
					animation={'bouncy'}>
					<Card.Header p={0}>
					  <Animated.Image
					    borderRadius={10}
						source={productImages[product.img!]}
						alt={product.name}
						style={{ width: 300, height: 180 }}
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
						  {'Price: ' + product.price + '$'}
						</Paragraph>
					  </YStack>
					</Card.Footer>
				  </Card>)}
             </YStack>
			</ScrollView>
			<Separator width={'80%'} marginVertical={15} />
		</View>
	);
};

export default Page;

