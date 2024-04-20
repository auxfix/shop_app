import {  StyleSheet, Text, View } from 'react-native';
import { Sun } from '@tamagui/lucide-icons'
import { useAuth } from '../../context/AuthContext';
import { ListItem, YStack } from 'tamagui';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
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
		<View style={styles.container}>
			<Text style={styles.title}>Loading...</Text>
		</View>
	)


	return (
		<View style={styles.container}>
			<Text style={styles.title}>Shop</Text>
            <YStack paddingVertical="$4" space >
				{data?.map((product: Product) => <ListItem onPress={() => {router.push({ pathname: '/(nav)/editproduct', params: { id: 2}})}} hoverTheme pressTheme icon={Sun} title={product.name} key={product.id}/>)}
                <ListItem onPress={() => {
                    router.push({ pathname: '/(nav)/product', params: { id: 1}})
                 }} hoverTheme pressTheme icon={Sun} title="product 1" subTitle="Order 1" />
                <ListItem onPress={() => {router.push({ pathname: '/(nav)/product', params: { id: 2}})}} hoverTheme pressTheme icon={Sun} title="product 2" subTitle="order 2" />
                <ListItem onPress={() => {router.push({ pathname: '/(nav)/product', params: { id: 3}})}} hoverTheme pressTheme icon={Sun} title="product 3" subTitle="order 3" />
            </YStack>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	separator: {
		height: 1,
		marginVertical: 30,
		width: '80%'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	}
});
