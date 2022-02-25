import React from 'react'
import { useParams } from 'react-router-dom';

function NotFoundPage() {

const { error } = useParams();


    return (
        <div style={{textAlign:"center"}}>
            <h1>404</h1>
            {
                !error ? <h2>Sorry! We could not find your page.</h2> :
                <h2>{error}</h2>
            }
        </div>
    )
}

export default NotFoundPage