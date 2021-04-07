import React from "react";
import Logo from "./Logo";
import Search from "./Search";

const Header: React.FC = () => {
    return (
        <header>
            <Logo />
            <Search />
        </header>
    )
}

export default Header;