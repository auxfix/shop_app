import { Text, View, Input, Button, Card, useTheme, Paragraph, TextArea } from 'tamagui';
import { router, useLocalSearchParams } from 'expo-router';
import { queryClient } from '~/queryClient';
import { useEffect, useState } from 'react';

import { productDl } from '~/services/data/products.dl';
import { useQuery } from '@tanstack/react-query';
import { ProductsApi } from '~/services/api/products.api';
import Loading from '~/components/Loading';
import { KeyboardAvoidingView } from 'react-native';

const productApi = new ProductsApi(productDl);

function isNumeric(num: string | number | undefined) {
  return !isNaN(num as number);
}

const Page = () => {
  const theme = useTheme();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [isValid, setIsValid] = useState(true);
  const [isValidPrice, setIsValidPrice] = useState(true);
  const [sku, setSku] = useState<string | undefined>('');
  const [name, setName] = useState<string | undefined>('');
  const [price, setPrice] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>('');

  useEffect(() => {
    setIsValid(!!sku && !!name && !!price && !!description && !!isNumeric(price));
    setIsValidPrice(!!isNumeric(price) && +price! > 0);
  }, [name, sku, price, description]);

  const { data, isFetching } = useQuery({
    queryKey: ['editproduct', id],
    queryFn: () => productApi.getDetails(+id),
  });

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setPrice(String(data?.price));
      setSku(data?.sku);
      setDescription(data?.description);
    }
  }, [data]);

  async function save() {
    if (!isValid || !isValidPrice) return;

    const digitalPrice = parseFloat(price!);

    const newProduct = {
      ...data,
      name,
      price: digitalPrice,
      description,
      sku,
    };
    await productApi.update(newProduct);

    await queryClient.invalidateQueries({ queryKey: ['products', 'editproduct'] });

    router.push('/(nav)/products');
  }

  async function navigateBack() {
    await queryClient.invalidateQueries({ queryKey: ['products', 'editproduct'] });

    router.push('/(nav)/products');
  }

  if (isFetching) return <Loading />;

  return (
    <KeyboardAvoidingView>
      <View
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height={'100%'}
        width={'100%'}>
        <Card width={'90%'} height={380} p={10}>
          <Text color={'white'}>Name</Text>
          <Input
            my={5}
            value={name}
            focusStyle={{ borderColor: !name ? theme.red7 : theme.blue7 }}
            borderColor={!name ? theme.red7 : theme.blue7}
            placeholder={`Name`}
            onChangeText={(newText) => setName(newText)}
          />
          <Text color={'white'}>Price</Text>
          <Input
            my={5}
            value={price}
            focusStyle={{ borderColor: !price || !isValidPrice ? theme.red7 : theme.blue7 }}
            borderColor={!price || !isValidPrice ? theme.red7 : theme.blue7}
            placeholder={`Price`}
            onChangeText={(newText) => setPrice(newText)}
          />
          <Text color={'white'}>SKU</Text>
          <Input
            my={5}
            value={sku}
            focusStyle={{ borderColor: !sku ? theme.red7 : theme.blue7 }}
            borderColor={!sku ? theme.red7 : theme.blue7}
            placeholder={`SKU`}
            onChangeText={(newText) => setSku(newText)}
          />
          <Text color={'white'}>Description</Text>
          <TextArea
            my={5}
            value={description}
            scrollEnabled
            h={100}
            focusStyle={{ borderColor: !description ? theme.red7 : theme.blue7 }}
            borderColor={!description ? theme.red7 : theme.blue7}
            placeholder={`Description`}
            onChangeText={(newText) => setDescription(newText)}
          />
        </Card>
        {!isValid && (
          <Paragraph mt={10} color={theme.red7} size={'$4'}>
            Please provide all required data ...
          </Paragraph>
        )}
        {!isValidPrice && (
          <Paragraph mt={4} color={theme.red7} size={'$4'}>
            Please provide a valid price ...
          </Paragraph>
        )}
        <Button
          mt={20}
          width={'90%'}
          backgroundColor={isValid && isValidPrice ? theme.blue7 : theme.red7}
          onPress={async () => await save()}>
          Save
        </Button>
        <Button mt={20} width={'90%'} backgroundColor={theme.blue7} onPress={navigateBack}>
          Cancel
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
