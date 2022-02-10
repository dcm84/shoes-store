import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner/Banner";
import AboutPage from "./components/StaticPages/AboutPage";
import ContactsPage from "./components/StaticPages/ContactsPage";
import Page404 from "./components/StaticPages/Page404";
import Hits from "./components/Catalog/Hits";
import Categories from "./components/Catalog/Categories";
import Items from "./components/Catalog/Items";
import Search from "./components/Catalog/Search";
import Item from "./components/Catalog/Item";
import Cart from "./components/Catalog/Cart";

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path="/" element={
                <>
                  <Hits />
                  <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    <Categories />
                    <Items />
                  </section>
                </>
              } />
              <Route path="/catalog.html" element={
                <section className="catalog">
                  <h2 className="text-center">Каталог</h2>
                  <Search />
                  <Categories />
                  <Items />
                </section>
              } />
              <Route path="/catalog/:id" element={
                  <Item />
              } />
              <Route path="/cart.html" element={
                  <Cart />
              } />
              <Route path="/about.html" element={<AboutPage />} />
              <Route path="/contacts.html" element={<ContactsPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
