import { View, Spinner } from 'tamagui';

export default function Loading() {
  return (
    <View
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%">
      <Spinner size="large" color="$blue8" />
    </View>
  );
}
