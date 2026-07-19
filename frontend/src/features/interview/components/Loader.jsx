import React from 'react'
import '../style/loader.scss'

const Loader = ({ label = "Loading..." }) => (
    <div className='app-loader'>
        <div className='app-loader__spinner'>
            <div className='app-loader__ring' />
            <div className='app-loader__ring' />
            <div className='app-loader__ring' />
        </div>
        <p className='app-loader__label'>{label}</p>
    </div>
)

export default Loader