import React from 'react'
import '../style/brandMark.scss'

const BrandMark = ({ size = 'md', pill = false }) => {
    return (
        <div className={`brand-mark brand-mark--${size} ${pill ? 'brand-mark--pill' : ''}`}>
            <span className='brand-mark__icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
                </svg>
            </span>
            <span className='brand-mark__text'>
                Career<em>lytics</em>
            </span>
        </div>
    )
}

export default BrandMark