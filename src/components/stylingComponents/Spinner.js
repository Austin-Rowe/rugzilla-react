import React from 'react';
import Loader from 'react-loader-spinner';


const Spinner = (props) => {
    return(
        <div style={{textAlign: 'center', marginTop: '25vh'}} >
            <Loader type="Circles" color='#005fb2' height={100} width={100} />
            <h1>{props.loadingMessage}</h1>
        </div>
    )
}

export default Spinner;