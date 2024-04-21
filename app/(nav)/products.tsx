
import { Sun } from '@tamagui/lucide-icons'
import { ScrollView, YStack, ListItem, View, Text, Card, Paragraph } from 'tamagui'
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { Product } from '../../services/data/products.dl';

const Page = () => {
	const { authState, onLogout } = useAuth();

	const {data, isFetching} = useQuery({
		queryKey: ['products'],
		queryFn: ProductsApi.getAll,
	  });

	const onLogoutPressed = () => {
		onLogout!();
	};

	if(isFetching) return (
		<View>
			<Text>Loading...</Text>
		</View>
	)


	return (
		<ScrollView>
			<Text>Shop the best products:</Text>
            <YStack paddingVertical="$4" space >
				{data?.map((product: Product) => 
				  <Card
					elevate
					width={150}
					height={260}
					scale={0.9}
					hoverStyle={{ scale: 0.925 }}
					pressStyle={{ scale: 0.975 }}
					animation={'bouncy'}>
					<Card.Header p={0}>
					  <Animated.Image
						source={{ uri: `https://static.wikia.nocookie.net/fruits-information/images/2/2b/Apple.jpg/revision/latest/scale-to-width-down/1000?cb=20180802112257` }}
						alt={product.name}
						style={{ width: 150, height: 200 }}
					  />
					</Card.Header>
					<Card.Footer p={8}>
					  <YStack>
						<Text fontSize={20} color={'lightblue'}>
						  {product.name}
						</Text>
						<Paragraph theme={'alt2'}>
						  {product.name}
						</Paragraph>
					  </YStack>
					</Card.Footer>
				  </Card>)}
                <ListItem onPress={() => {
                    router.push({ pathname: '/(nav)/editproduct', params: { id: 1}})
                 }} hoverTheme pressTheme icon={Sun} title="product 1" subTitle="Order 1" />
                
            </YStack>
		</ScrollView>
	);
};

export default Page;

