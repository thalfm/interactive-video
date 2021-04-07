import React from "react";
import ThumbVideo from "../../components/Layout/ThumbVideo";
import ListCourse from "../../components/Layout/ListCourse";

const Home: React.FC = () => {

    return (
        <>
            <section className="main-container">
                <ListCourse id={'home'} title={'Popular'}>
                    <ThumbVideo />
                </ListCourse>
            </section>
        </>
);
}

export default Home;