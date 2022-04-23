import React from 'react'
import { Book } from '../types/booksTypes';

type FavouritesContextType = {
    favourites: Book[];
    showOffCanvas: boolean;
    setShowOffCanvas: (showOffCanvas: boolean) => void;
    getBadgeCount: () => number;
    addToFavourites: (book: Book) => void;
    removeFromFavourites: (book: Book) => void;
    clearLocaleStorage: () => void;
}

const FavouritesContext = React.createContext<FavouritesContextType>({
    favourites: [],
    showOffCanvas: false,
    setShowOffCanvas: () => { },
    getBadgeCount: () => 0,
    addToFavourites: () => { },
    removeFromFavourites: () => { },
    clearLocaleStorage: () => { }
});

export function FavouritesProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    const [favourites, setFavourites] = React.useState<Book[]>([]);
    const [showOffCanvas, setShowOffCanvas] = React.useState<boolean>(false);

    const addToFavourites = (book: Book) => {
        setFavourites([...favourites, book]);
    }

    const removeFromFavourites = (book: Book) => {
        setFavourites(favourites.filter(fav => fav.id !== book.id));
    }

    const clearLocaleStorage = () => {
        localStorage.removeItem('favourites');
        setFavourites([]);
    }

    const getBadgeCount = () => {
        return favourites.length;
    }

    React.useEffect(() => {
        const localFavourites = localStorage.getItem('favourites');
        if (localFavourites) {
            setFavourites(JSON.parse(localFavourites));
        }
        else {
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
    }, []);

    return (
        <FavouritesContext.Provider value={{ favourites, showOffCanvas,setShowOffCanvas, getBadgeCount, addToFavourites: addToFavourites, removeFromFavourites: removeFromFavourites, clearLocaleStorage }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export const useFavouritesProvider = () => React.useContext(FavouritesContext);
