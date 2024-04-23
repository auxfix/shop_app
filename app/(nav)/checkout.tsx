import { View, Input, Button, Card, useTheme, Paragraph, Separator } from 'tamagui';
import { router } from 'expo-router';
import { CartApi } from '~/services/api/cart.api';
import { OrderApi } from '~/services/api/orders.api';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '~/queryClient';
import { useEffect, useState } from 'react';

import { cartDl } from '~/services/data/cart.dl';
import { orderItemsDl } from '~/services/data/order.itm.dl';
import { orderDl } from '~/services/data/orders.dl';
import { useAuth } from '~/context/AuthContext';
import { Title } from '~/tamagui.config';
import { validateEmail} from '~/utils/email.validator';
import Loading from '~/components/Loading';


const cartApi = new CartApi(cartDl);
const orderApi = new OrderApi(orderDl, orderItemsDl, cartDl);

const Page = () => {
	const theme = useTheme();

	const [isValid, setIsValid] = useState(true);
	const [name, setName] = useState('');
	const [secondName, setSecondName] = useState('');
	const [email, setEmail] = useState('');
	const [price, setPrice] = useState<number>(0);
	const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

	const { authState } = useAuth();

	useEffect(() => {
		setIsValid(!!name && 
			!!secondName && 
			!!email &&
			!!validateEmail(email)
		);
		setIsValidEmail(!!validateEmail(email));
	}, [name, secondName, email]);

	useEffect(() => {
		setName(authState?.user?.name!);
		setSecondName(authState?.user?.secondName!);
		setEmail(authState?.user?.email!);
	},[])

	const { data, isFetching } = useQuery({
		queryKey: ['cart'],
		queryFn: () => cartApi.getCartByUserId(authState?.user?.id!),
	});

	useEffect(() => {
		setPrice(data?.reduce((acc, cart) => (+cart.price!) + acc, 0)!)
	}, [data]);

	async function checkout() {
		if(!isValid) return; 
		await orderApi.addOrder({
			email: email,
			firstName: name,
			lastName: secondName,
			totalPrice: price,
			userId: authState?.user?.id!,
		})

		await queryClient.invalidateQueries({ queryKey: ['cart', 'orders'] });

		router.push('/(nav)/confirm');
	}

	if(isFetching) return (
		<Loading />
	)

	return (
		<View
			flexDirection="column"
			alignItems='center'
			justifyContent='center'
			height={'100%'}
			width={'100%'}
		> 
			  <Title mb={20}>Checkout:</Title>
			  <Card
			  	width={'90%'}
				height={280}
			  	p={10}
			  >
				<Input
					focusStyle={{borderColor: !name ? theme.red7 : theme.blue7}} 
					borderColor={!name ? theme.red7 : theme.blue7}  
					my={5} 
					value={name}  
					placeholder={`Firts Name`} 
					onChangeText={newText => setName(newText)}
				/>
				<Input
					focusStyle={{borderColor: !secondName ? theme.red7 : theme.blue7}} 
					borderColor={!secondName ? theme.red7 : theme.blue7} 
					my={5} 
					value={secondName}  
					placeholder={`Last Name`} 
					onChangeText={newText => setSecondName(newText)}
				/>
				<Input
					focusStyle={{borderColor: (!email || !isValidEmail) ? theme.red7 : theme.blue7}} 
					borderColor={(!email || !isValidEmail) ? theme.red7 : theme.blue7}
					my={5} 
					value={email}  
					placeholder={`Email`} 
					onChangeText={newText => setEmail(newText)}
				/>
				<Separator width={'50%'} marginVertical={15} />
				<Paragraph mt={10} size={'$4'}>{'PRICE: ' + price + '$'}</Paragraph>
			  </Card>
			  {!isValid && <Paragraph mt={15} color={theme.red7} size={'$4'}>Please provide all required data...</Paragraph>}
			  {!isValidEmail && <Paragraph mt={5} color={theme.red7} size={'$4'}>Please provide  a valid email...</Paragraph>}
			  <Button
			  	mt={20}
			  	width={'88%'}
				backgroundColor={isValid ? theme.blue5 : theme.red7}
			  	onPress={async () => await checkout()}
			  >
				Checkout
			  </Button>
			  <Button
			  	mt={20}
			  	width={'88%'}
				backgroundColor={theme.blue5}
			  	onPress={async () => router.push('/(nav)/shop')}
			  >
				Cancel
			  </Button>
		</View>
	);
};

export default Page;