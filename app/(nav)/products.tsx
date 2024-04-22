import { Text, View, YStack,  ScrollView, ListItem, useTheme } from 'tamagui';
import { router } from 'expo-router';
import { ProductsApi } from '~/services/api/products.api';
import { Product, productDl } from '~/services/data/products.dl';
import { useQuery } from '@tanstack/react-query';


const productApi = new ProductsApi(productDl);

const Page = () => {
	const theme = useTheme()

	const { data, isFetching } = useQuery({
		queryKey: ['products'],
		queryFn: () => productApi.getAll(),
	});


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
			<Text fontSize={30} color={'black'}>Products: </Text>
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
					{data?.map((pr: Product) => 
						(<ListItem
							onPress={() => router.navigate({pathname: "/(nav)/editproduct", params: { id: pr.id }})}
							backgroundColor={theme.blue7}
							key={pr.id} 
							title={pr.name}
							subTitle={'Price: ' + pr.price + '$'}
						/>)
					  )
					}
				</YStack>
			</ScrollView>
		</View>
	);
};

export default Page;