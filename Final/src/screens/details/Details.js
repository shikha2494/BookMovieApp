import React, { useEffect } from 'react';
import Header from '../../common/header/Header';


export default function Details(props) {

    console.log(props.match.params.id);

    async function loadDetails(){
        const rawResponse = await fetch(props.baseUrl + "movies/" + props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        });
        const data = await rawResponse.json();
        console.log(data);
    }

    useEffect(() => {
        loadDetails();
    }, []);

    return(
        <div>
            <Header baseUrl={props.baseUrl}/>

        </div>
    );
}