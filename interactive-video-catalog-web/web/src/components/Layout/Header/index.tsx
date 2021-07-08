import React from "react";
import Logo from "./Logo";
import Search from "./Search";

type SearchProps = {
    onSearch?:  (event: KeyboardEvent | any) => void
}
const Header: React.FC<SearchProps> = ({ onSearch }) => {
    return (
        <header>
            <Logo />
            <Search onSearch={onSearch} />
        </header>
    )
}

export default Header;