import React, { useEffect, useState } from 'react';
import './App.css';
import Kwik from './components/Kwik';
import { CreateKwik } from './components/CreateKwik';
import { isLoggedIn } from './helpers/login-helpers';
import axiosInstance from './axios';
import Layout from './components/Layout';



function App() {

    const [appState, setAppState] = useState({});

    const loadData = () => {
        axiosInstance.get('/')
            .then((res) => {
                console.log(res.data)
                setAppState({ kwiks: res.data });
            }).catch((error) => { console.log(error) });

    }

    useEffect(loadData, [setAppState]);


    return (
        <Layout>
        <div className="App">
            {isLoggedIn() ? <CreateKwik forSubmit={loadData} /> : null}
            <Kwik reLoad={loadData} kwiks={appState.kwiks} />
        </div>
        </Layout>
    );
}

export default App;
