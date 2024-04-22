import { Button, Card, Paragraph, View, YStack, Text, Separator, SizableText } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { ProductsApi } from '~/services/api/products.api';
import { CartApi } from '~/services/api/cart.api';


const Page = () => {
	return (
		<View
			flexDirection="column"
			alignItems='center'
			justifyContent='center'
			height={'100%'}>
			  <SizableText
			  	size={'$10'}
				mb={30}
				color={'fff'}
			  >
				Amazing ! 
			  </SizableText>
			  <Paragraph
			    textAlign='center'
			    size={'$7'}
			  	color={'fff'}
				w={'80%'}
			  >
			  	We will deliver your products in the next 6-8 hours!
			  </Paragraph>
			  <Button
			  	mt={60}
			  	width={300}
			  	onPress={() => router.navigate('/(nav)/shop')}
			  >
					Cool!
			  </Button>
		</View>
	);
};

export default Page;