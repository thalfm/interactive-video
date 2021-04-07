import React from "react";
import { Link } from 'react-router-dom'

type ThumbVideoProps = {
    href?: string,
    src?: string,
    alt?: string
}

const ThumbVideo: React.FC<ThumbVideoProps> = ({ href, src, alt }) => {
    return (
        <Link to={href || '/video'}><img src={src || "https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true"} alt={alt || ''} /></Link>
    );
}

export default ThumbVideo;