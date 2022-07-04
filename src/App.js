import { Nav } from './Components/Navigation/Navigation.js';
import { BrowserRouter, Route } from 'react-router-dom';
import { Homepage } from './Components/Homepage.js';
import { UserContext, UserContextProvider } from './Context/user-ctx.js';
import { MessageContext } from './Context/message-ctx.js';
import { useState } from 'react';
import { ItemListPage } from './Components/Item/Viewing/ItemListPage';
import { PostItemPage } from './Components/Item/Editing/PostItemPage';
import { LoginPage } from './Components/User/LoginPage.js';
import { InboxPage } from './Components/Message/InboxPage.js'
import { PostMessagePage } from './Components/Message/PostMessagePage.js';
import { UserDetailsPage } from './Components/User/UserDetailsPage.js';
import { SignupPage } from './Components/User/SignupPage.js';
import { FavoritesPage } from './Components/Favorites/FavoritesPage.js'
import { ItemDetailsPage } from './Components/Item/Viewing/ItemDetailsPage';
import { Footer } from './Components/Footer.js';
import { EditItemPage } from './Components/Item/Editing/EditItemPage.js';


function App() {

    const [ unreadCount, setUnreadCount ] = useState(0);

    return (
        <BrowserRouter>
                <UserContextProvider>
                    <MessageContext.Provider value={{unreadCount, setUnreadCount}}>
                        <Nav/>
                        <Route path='/inbox' exact component={InboxPage} />
                    </MessageContext.Provider>

                    <Route path='/' exact component={Homepage} />
                    <Route path='/items' exact component={ItemListPage} />
                    <Route path='/postitem' exact component={PostItemPage} />
                    <Route path='/postmessage/:username' exact component={PostMessagePage} />
                    <Route path='/users/:userId' exact component={UserDetailsPage} />
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/signup' exact component={SignupPage} />
                    <Route path='/favorites' exact component={FavoritesPage} />
                    <Route path='/items/:itemId' exact component={ItemDetailsPage} />
                    <Route path='/edititem/:itemId' exact component={EditItemPage} />
                </UserContextProvider>
                <Footer />
        </BrowserRouter>
    );
}

export default App;
