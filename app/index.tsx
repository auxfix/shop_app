import React from 'react';
import { Redirect, useRootNavigationState } from 'expo-router';

const Page = () => {
	
	return (
		<Redirect href={'/(nav)/'} />
    );
};

export default Page;
