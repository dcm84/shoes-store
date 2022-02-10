import React from "react";
import { NavLink } from "react-router-dom";
import CartWidget from "./Catalog/CartWidget";
import SearchWidget from "./Catalog/SearchWidget";

function Header() {
  const links = [
    {
      title: "Главная",
      url: "/"
    },
    {
      title: "Каталог",
      url: "/catalog.html"
    },
    {
      title: "О магазине",
      url: "/about.html"
    },
    {
      title: "Контакты",
      url: "/contacts.html"
    }
  ];

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src="./img/header-logo.png" alt="Bosa Noga" />
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {
                  links.map(link => (
                    <li className="nav-item" key={link.url}>
                      <NavLink
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        to={link.url}
                        key={link.url}
                      >
                        {link.title}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
              <div>
                <div className="header-controls-pics">
                  <SearchWidget />
                  <CartWidget />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;