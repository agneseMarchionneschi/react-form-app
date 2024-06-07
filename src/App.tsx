import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Form from "./components/form/form-steps";
import WelcomePage from "./components/pages/welcome-page";
import AppBarComponent from "./components/appbar/appbar";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <AppBarComponent />
                <Router>
                    <Routes>
                        <Route path="/" element={<Form />} />
                        <Route path="/welcome" element={<WelcomePage />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
