import React, {useEffect, useState} from 'react';
import './App.css';
import Kwik from './components/Kwik';
import { KwikLoading } from './components/KwikLoading';
import { CreateKwik } from './components/CreateKwik';


function App() {
        const [appState, setAppState] = useState({
            loading: false,
            kwiks: null,
        });

        useEffect(() => {
                setAppState({ loading: true });
                const apiUrl = 'api/';
                fetch(apiUrl)
                .then((data) => {if (!data.ok) {
                    throw new Error('Network response was not OK')}
                    return data.json()})
                .then((kwiks) => {
                    console.log(kwiks)
                    setAppState({ loading: false, kwiks : kwiks });
                }).catch((error) => {console.log(error)});

        }, [setAppState]);

        return (
            <div className="App">
                <CreateKwik />
                <h1>Latest Kwiks</h1>
                {appState.loading?<KwikLoading />:<Kwik kwiks={appState.kwiks} />}
            </div>
        );
}

export default App;
