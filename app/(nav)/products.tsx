import { Text, View, YStack,  ScrollView, ListItem, useTheme, Separator } from 'tamagui';
import { router } from 'expo-router';
import { ProductsApi } from '~/services/api/products.api';
import { Product, productDl } from '~/services/data/products.dl';
import { useQuery } from '@tanstack/react-query';
import { Title } from '~/tamagui.config';
import Loading from '~/components/Loading';


const productApi = new ProductsApi(productDl);

const Page = () => {
	const theme = useTheme()

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
				Products:
			</Title>
			<Separator width={'80%'} marginVertical={15} />
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
							backgroundColor={theme.blue5}
							key={pr.id} 
							title={pr.name}
							subTitle={'Price: ' + pr.price + '$'}
						/>)
					  )
					}
				</YStack>
			</ScrollView>
			<Separator width={'80%'} marginVertical={25} />
		</View>
	);
};

export default Page;