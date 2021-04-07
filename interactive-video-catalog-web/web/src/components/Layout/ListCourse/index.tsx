import React from "react";

type ListCourseProps = {
    id?: string,
    title: string
}

const ListCourse: React.FC<ListCourseProps> = ({id, title, children}) => {
    return (
        <>
            <h1 id={id}>{title}</h1>
            <div className="box">
                { children }
            </div>
        </>
    );
}

export default ListCourse;
