import { Text, View, Input, Button, Card, useTheme, Paragraph, TextArea } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import { queryClient } from '~/queryClient';
import { useEffect, useState } from 'react';

import { productDl } from '~/services/data/products.dl';
import { useQuery } from '@tanstack/react-query';
import { ProductsApi } from '~/services/api/products.api';

const productApi = new ProductsApi(productDl);

const Page = () => {
	const theme = useTheme();

	const { id } = useLocalSearchParams<{ id: string }>();

	const [isValid, setIsValid] = useState(true);
	const [sku, setSku] = useState<string | undefined>('');
	const [name, setName] = useState<string | undefined>('');
	const [price, setPrice] = useState<string | undefined>('');
	const [description, setDescription] = useState<string | undefined>('');

	useEffect(() => {
		setIsValid(!!sku && !!name && !!price && !!description);
	}, [name, sku, price, description]);

	const { data, isFetching } = useQuery({
		queryKey: ['editproduct', id],
		queryFn: () => productApi.getDetails(+id),
	});

	useEffect(() => {
		if(data) {
			setName(data?.name);
			setPrice(String(data?.price));
			setSku(data?.sku);
			setDescription(data?.description);
		}
	}, [data]);

	async function save() {

		if(!isValid) return;

		const digitalPrice = +price!;
		
		const newProduct =  {
			...data,
			name,
			price: digitalPrice,
			description,
			sku,
		}
		await productApi.update(newProduct);

		queryClient.invalidateQueries({ queryKey: ['products', 'editproduct'] });

		router.push('/(nav)/products');
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
			flexDirection="column"
			alignItems='center'
			justifyContent='center'
			height={'100%'}
			width={'100%'}
		> 
			  <Card
			  	width={'90%'}
				height={400}
			  	p={10}
			  >
				<Text color={'white'}>Name</Text>
				<Input my={5} value={name}  placeholder={`Name`} onChangeText={newText => setName(newText)}/>
				<Text color={'white'}>Price</Text>
				<Input my={5} value={price}  placeholder={`Price`} onChangeText={newText => setPrice(newText)}/>
				<Text color={'white'}>SKU</Text>
				<Input my={5} value={sku}  placeholder={`SKU`} onChangeText={newText => setSku(newText)}/>
				<Text color={'white'}>Description</Text>
				<TextArea my={5} value={description}  placeholder={`Description`} onChangeText={newText => setDescription(newText)} />
			  </Card>
			  {!isValid && <Paragraph color={theme.red7} size={'$4'}>Please provide all required data...</Paragraph>}
			  <Button
			  	mt={20}
			  	width={'90%'}
				backgroundColor={isValid ? theme.blue7 : theme.red7}
			  	onPress={async () => await save()}
			  >
				Save
			  </Button>
		</View>
	);
};

export default Page;