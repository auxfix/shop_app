import { useEffect, useState } from "react";

export function useLoading<T>(loadHandler: () => Promise<T|undefined>): [
    boolean, () => void, T|undefined 
] {
    const [data, setData] = useState<T | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(false);
    function doLoad() {
        setIsLoading(true);
        loadHandler().then((result) => { setData(result); setIsLoading(false); });
    }

    useEffect(() => {
        doLoad();
	},[])

    return [isLoading, doLoad, data];
}