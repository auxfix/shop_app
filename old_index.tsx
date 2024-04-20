import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { DataLayer } from '~/services/data/util.dl';

import { YStack, H2, Separator, Theme, Paragraph } from 'tamagui';

import type { ResultSet } from 'expo-sqlite';

function isResultSet(result: any): result is ResultSet {
  return result && typeof result.rows !== 'undefined';
}

export default function Home() {
  const [users, setUsers] = useState<{ [column: string]: any; }[]>([]);
  const [products, setProducts] = useState<{ [column: string]: any; }[]>([]);

  useEffect(() => {
    async function getInitData () {
      const db  = await DataLayer.asyncopenDatabase();
      const users = await db.execAsync([{ sql: 'SELECT * FROM users', args: [] }], true);

      const products = await db.execAsync([{ sql: 'SELECT * FROM products', args: [] }], true);

      console.log("🚀 ~ getInitData ~ users:", users[0])
      if(isResultSet(users[0]) && isResultSet(products[0])){
        console.log("🚀 ~ getInitData ~ users:", users[0].rows)
        setUsers(users[0].rows);
        setProducts(products[0].rows);
      }
    }

    getInitData();
  },[])

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <YStack>
          {users.map(usr => <Paragraph color={'$blue11Dark'} key={usr.id}>{JSON.stringify(usr)}</Paragraph>)}
        </YStack>
        <YStack>
        <YStack>
          {products.map(prd => <Paragraph color={'$blue11Dark'} key={prd.id}>{JSON.stringify(prd)}</Paragraph>)}
        </YStack>
        </YStack>
      </Container>
    </>
  );
}
