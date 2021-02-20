import React, {useEffect, useState} from "react";
import Page from "../../components/Page";
import useHomeApi from "../../services/homeApi";

const Home: React.FC = () => {
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
        <Page title="Bem vindo">
            <div>
                <div style={{
                    height: "720px",
                    maxWidth: "1200px",
                    float: "left",
                    padding: "15px",
                    fontSize: "18px"
                }}>
                    <div>Conectado com:</div>
                    <div>{connection}</div>
                </div>
            </div>

        </Page>
    );
}

export default Home;