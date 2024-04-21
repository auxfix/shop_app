import { Text, View, Input, Button, Card, useTheme, Paragraph } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import { CartApi } from '~/services/api/cart.api';
import { OrderApi } from '~/services/api/orders.api';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '~/queryClient';
import { useEffect, useState } from 'react';
import { useLoading } from '~/hooks/useLoad';

import { CartItem, cartDl } from '~/services/data/cart.dl';
import { orderItemsDl } from '~/services/data/order.itm.dl';
import { orderDl } from '~/services/data/orders.dl';

const cartApi = new CartApi(cartDl);
const orderApi = new OrderApi(orderDl, orderItemsDl, cartDl);

const USER_ID = 1;

const Page = () => {
	//TODO: prepopulate from USER
	const theme = useTheme();
	const [isValid, setIsValid] = useState(true);
	const [name, setName] = useState('user 1 name');
	const [secondName, setSecondName] = useState('user 1 name');
	const [email, setEmailName] = useState('mail@mail.com');
	const [price, setPrice] = useState<number>(0);

	useEffect(() => {
		setIsValid(!!name && !!secondName && !!email)
	}, [name, secondName, email]);

	const { data, isFetching } = useQuery({
		queryKey: ['cart'],
		queryFn: () => cartApi.getCartByUserId(USER_ID),
	});

	useEffect(() => {
		setPrice(data?.reduce((acc, cart) => (+cart.price!) + acc, 0)!)
	}, [data]);

	async function checkout() {
		console.log('1')
		// TODO: Add valid user id
		await orderApi.addOrder({
			email: email,
			firstName: name,
			lastName: secondName,
			totalPrice: price,
			userId: USER_ID,
		})

		queryClient.invalidateQueries({ queryKey: ['cart', 'orders'] });

		router.push('/(nav)/confirm');
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
				height={200}
			  	p={10}
			  >
				<Input my={5} value={name}  placeholder={`Firts Name`} onChangeText={newText => setName(newText)}/>
				<Input my={5} value={secondName}  placeholder={`Last Name`} onChangeText={newText => setSecondName(newText)}/>
				<Input my={5} value={email}  placeholder={`Email`} onChangeText={newText => setEmailName(newText)}/>
				<Paragraph size={'$4'}>{'PRICE: ' + price}</Paragraph>
			  </Card>
			  {!isValid && <Paragraph color={theme.red7} size={'$4'}>Please provide all required data..</Paragraph>}
			  <Button
			  	mt={20}
			  	width={300}
				backgroundColor={isValid ? theme.blue7 : theme.red7}
			  	onPress={() => checkout()}
			  >
				Cehckout
			  </Button>
		</View>
	);
};

export default Page;