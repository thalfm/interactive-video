import React, {useEffect, useState} from "react";
import Page from "../../components/Page";
import useHomeApi from "../../services/homeApi";

const Video: React.FC = () => {
    const [connection, setConnection] = useState()
    const homeApi = useHomeApi()

    useEffect(() => {
        homeApi
            .health()
            .then((response) => {
                setConnection(response.data)
            })
    }, [])

    return (
        <Page title={'Lista de videos'}>

        </Page>
    );
}

export default Video;