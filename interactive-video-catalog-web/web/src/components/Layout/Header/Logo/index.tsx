import React from "react";

const Logo: React.FC = () => {
    return (
        <div className="netflixLogo">
            <a id="logo" href="#home" style={{float: 'left'}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="Logo do site" />

            </a>
            <label style={{fontSize: "28px"}}>Interactive</label>
        </div>
    );
}

export default Logo;