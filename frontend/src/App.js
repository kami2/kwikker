import React, {useEffect, useState} from 'react';
import './App.css';
import Kwik from './components/Kwik';
import KwikLoadingComponent from './components/KwikLoading';


function App() {
        const KwikLoading = KwikLoadingComponent(Kwik);
        const [appState, setAppState] = useState({
            loading: false,
            kwiks: null,
        });

        useEffect(() => {
                setAppState({ loading: true });
                const apiUrl = 'api/';
                fetch(apiUrl)
                .then((data) => data.json())
                .then((kwiks) => {
                    setAppState({ loading: false, kwiks : kwiks });
                });
        }, [setAppState]);

        return (
            <div className="App">
              <h1>Latest Kwiks</h1>
              <KwikLoading isLoading={appState.loading} kwiks={appState.kwiks} />
            </div>
        );
}

export default App;
