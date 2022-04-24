import React from 'react'
import { Book } from '../types/booksTypes';

type FavouritesContextType = {
    favourites: Book[];
    showOffCanvas: boolean;
    setShowOffCanvas: (showOffCanvas: boolean) => void;
    getBadgeCount: () => number;
    addToFavourites: (book: Book) => void;
    checkToFavorite: (book: Book) => boolean;
    removeFromFavourites: (book: Book) => void;
    clearLocaleStorage: () => void;
}

const FavouritesContext = React.createContext<FavouritesContextType>({
    favourites: [],
    showOffCanvas: false,
    setShowOffCanvas: () => { },
    getBadgeCount: () => 0,
    addToFavourites: () => { },
    checkToFavorite: () => false,
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
        if (checkToFavorite(book)) {
            removeFromFavourites(book);
            return;
        }
        setFavourites([...favourites, book]);
    }

    const removeFromFavourites = (book: Book) => {
        setFavourites(favourites.filter(fav => fav.id !== book.id));
    }

    const checkToFavorite = (book: Book) => {
        return favourites.some(fav => fav.id === book.id);
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
        console.log("localFavourites22", localFavourites    )

        if (localFavourites) {
            const parsedFavorites: Book[] = JSON.parse(localFavourites);
            console.log("parsed favourites", parsedFavorites    )
            setFavourites(parsedFavorites);
            
        }
        else {
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
    }, []);

    React.useEffect(() => {
        if (favourites.length > 0) {
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
        console.log('favourites changed', favourites);

    }, [favourites]);

    return (
        <FavouritesContext.Provider value={{ favourites, showOffCanvas, setShowOffCanvas, getBadgeCount, addToFavourites, removeFromFavourites, checkToFavorite, clearLocaleStorage }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export const useFavouritesProvider = () => React.useContext(FavouritesContext);
