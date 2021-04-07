import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Layout/Header";


function App() {
    return (
        <div className="wrapper">
            <Header />
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
