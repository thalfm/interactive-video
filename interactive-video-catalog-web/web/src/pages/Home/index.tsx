import React, { useEffect, useState } from "react";
import ThumbVideo from "../../components/Layout/ThumbVideo";
import ListCourse from "../../components/Layout/ListCourse";
import { findCourses } from "../../services/api";
import Header from "../../components/Layout/Header";

const Home: React.FC = () => {
    const [courses, setCourses] = useState([]);
    async function getCourses(search: string = "") {
        const listCourses = await findCourses(search);
        setCourses(listCourses);
    }

    const searchCourses = (event: KeyboardEvent | any) => {
        if (event.key === 'Enter') {
            getCourses(event.target.value)
        }
    }


    useEffect(() => {
        getCourses();
    }, [])

    return (
        <>
            <Header onSearch={searchCourses} />
            <section className="main-container">
                <ListCourse id={'home'} title={'Popular'}>
                    { courses.map((course: any) => (
                        <ThumbVideo key={course.id_coursos} src={course.imagem_curso} />
                    )) }
                </ListCourse>
            </section>
        </>
);
}

export default Home;