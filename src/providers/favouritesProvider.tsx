import React from 'react'
import { Book } from '../types/booksTypes';

type FavouritesContextType = {
    favourites: Book[];
    showOffCanvas: boolean;
    addFavourite: (book: Book) => void;
    removeFavourite: (book: Book) => void;
    clearLocaleStorage: () => void;
}

const FavouritesContext = React.createContext<FavouritesContextType>({
    favourites: [],
    showOffCanvas: false,
    addFavourite: () => { },
    removeFavourite: () => { },
    clearLocaleStorage: () => { }
});

export function FavouritesProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    const [favourites, setFavourites] = React.useState<Book[]>([]);
    const [showOffCanvas, setShowOffCanvas] = React.useState<boolean>(false);

    const addFavourite = (book: Book) => {
        setFavourites([...favourites, book]);
    }

    const removeFavourite = (book: Book) => {
        setFavourites(favourites.filter(fav => fav.id !== book.id));
    }

    const clearLocaleStorage = () => {
        localStorage.removeItem('favourites');
        setFavourites([]);
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
        <FavouritesContext.Provider value={{ favourites, showOffCanvas, addFavourite, removeFavourite, clearLocaleStorage }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export const useFavouritesProvider = () => React.useContext(FavouritesContext);
