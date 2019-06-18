import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import "./components/navbarAndFooter/Nav.css"
import Navbar from "./components/navbarAndFooter/Nav"
import Footer from "./components/navbarAndFooter/Footer";
import HomePage from "./components/views/HomePage";
import loginPage from "./components/views/LoginPage";
import AdminPage from "./components/views/adminPage";
import registerPage from "./components/views/RegisterPage";
import {IntlProvider, addLocaleData} from 'react-intl';
import enJson from "./language/en.json";
import ruJson from "./language/ru.json";
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';



addLocaleData([...en, ...ru]);
let intlConfig = {
    en: {
        locale: "en",
        messages: enJson,

    },
    ru: {
        locale: "ru",
        messages: ruJson,
    }
};

class App extends Component {
    state = { locale: "ru" };
    render() {
        const intlData = intlConfig[this.state.locale];
        return (
            <IntlProvider {...intlData}>
            <BrowserRouter>
                <div className="main">
                    <Navbar handleLocaleChange={this.handleLocaleChange}/>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={loginPage}/>
                <Route path="/register" component={registerPage}/>
                <Route path="/admin" component={AdminPage}/>
            </BrowserRouter>
            </IntlProvider>



        );
    }

    handleLocaleChange = (lang) => {
        this.setState({ locale: lang });
    }
}

export default App;



