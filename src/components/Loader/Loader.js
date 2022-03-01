import React from 'react';
import './loader.css'

function Loader({isActive}) {

    return (
        <div className={isActive ? 'container active' : 'hide'}>
            <div className={'loader'}>
                <div className="lds-roller">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    );
}

export default Loader;