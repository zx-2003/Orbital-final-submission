import { useEffect, useState } from 'react';

export default function useGoogleMaps() {
    //this hook is to make sure Maps is loaded before we can start using the API
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const checkLoaded = () => {
            if (window.google && window.google.maps) {
                setLoaded(true);
            } else {
                setTimeout(checkLoaded, 100);
            }
        };
        checkLoaded();
    }, []);

    return loaded;

}