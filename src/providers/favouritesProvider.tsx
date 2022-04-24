import React from 'react';
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
};

const FavouritesContext = React.createContext<FavouritesContextType>({
  favourites: [],
  showOffCanvas: false,
  setShowOffCanvas: () => { },
  getBadgeCount: () => 0,
  addToFavourites: () => { },
  checkToFavorite: () => false,
  removeFromFavourites: () => { },
  clearLocaleStorage: () => { },
});

export function FavouritesProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [favourites, setFavourites] = React.useState<Book[]>([]);
  const [showOffCanvas, setShowOffCanvas] = React.useState<boolean>(false);

  const removeFromFavourites = (book: Book) => {
    setFavourites(favourites.filter((fav) => fav.id !== book.id));
  };

  const checkToFavorite = (book: Book) => favourites.some((fav) => fav.id === book.id);

  const clearLocaleStorage = () => {
    localStorage.removeItem('favourites');
    setFavourites([]);
  };

  const getBadgeCount = () => favourites.length;

  const addToFavourites = (book: Book) => {
    if (checkToFavorite(book)) {
      removeFromFavourites(book);
      return;
    }
    setFavourites([...favourites, book]);
  };

  React.useEffect(() => {
    const localFavourites = localStorage.getItem('favourites');
    if (localFavourites) {
      const parsedFavorites: Book[] = JSON.parse(localFavourites);
      setFavourites(parsedFavorites);
    } else {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, []);

  React.useEffect(() => {
    if (favourites.length > 0) {
      localStorage.setItem('favourites', JSON.stringify(favourites));
      console.log('favourites changed', favourites);
    }
  }, [favourites]);

  const favouritesProviderValue = React.useMemo(() => ({
    favourites,
    showOffCanvas,
    setShowOffCanvas,
    getBadgeCount,
    addToFavourites,
    checkToFavorite,
    removeFromFavourites,
    clearLocaleStorage,
  }), [favourites, showOffCanvas]);

  return (
    <FavouritesContext.Provider value={favouritesProviderValue}>
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavouritesProvider = () => React.useContext(FavouritesContext);
