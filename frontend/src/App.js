import React, { useEffect, useState } from 'react';
import './App.css';
import Kwik from './components/Kwik';
import { KwikLoading } from './components/KwikLoading';
import { CreateKwik } from './components/CreateKwik';
import { isLoggedIn } from './helpers/login-helpers';
import axiosInstance from './axios';



function App() {




    const [appState, setAppState] = useState({
        loading: false,
        kwiks: null,
    });

    const loadData = () => {
        setAppState({ loading: true });
        axiosInstance.get('/')
            .then((res) => {
                console.log(res.data)
                setAppState({ loading: false, kwiks: res.data });
            }).catch((error) => { console.log(error) });

    }

    useEffect(loadData, [setAppState]);



    return (
        <div className="App">
            {isLoggedIn() ? <CreateKwik forSubmit={loadData} /> : null}
            {appState.loading ? <KwikLoading /> : <Kwik reLoad={loadData} kwiks={appState.kwiks} />}
        </div>
    );
}

export default App;
