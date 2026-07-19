import React from 'react'
import { NavLink } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/sidebar.scss'
import BrandMark from "./BrandMark"

const NAV_LINKS = [
    {
        to: '/new-session',
        label: 'New Session',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>)
    },
    {
        to: '/history',
        label: 'History',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>)
    }
]

const Sidebar = ({ isOpen, onToggle, mobileOpen, isMobile, onCloseMobile }) => {
    const { handleLogout } = useAuth()
    
    const handleLinkClick = () => {
        if (isMobile) onCloseMobile()
    }

    const handleLogoutClick = () => {
        if (isMobile) onCloseMobile()
        handleLogout()
    }

    return (
        <aside className={`app-sidebar ${!isOpen ? 'app-sidebar--collapsed' : ''} ${isMobile && mobileOpen ? 'app-sidebar--mobile-open' : ''}`}>
            <div className='app-sidebar__top'>
                {isOpen && <BrandMark size="sm" />}
                <button className='app-sidebar__toggle' onClick={onToggle} aria-label='Toggle sidebar'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isOpen
                            ? <polyline points="15 18 9 12 15 6" />
                            : <polyline points="9 18 15 12 9 6" />
                        }
                    </svg>
                </button>
            </div>

            <nav className='sidebar__wrapper'>
                <ul className='sidebar__list'>
                    {NAV_LINKS.map(link => (
                        <li key={link.to} className='sidebar__item'>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `item item--heading ${isActive ? 'item--active' : ''}`
                                }
                                title={!isOpen ? link.label : undefined}
                            >
                                <span className='item__icon'>{link.icon}</span>
                                {isOpen && <span className='item__label'>{link.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <button className='app-sidebar__logout' onClick={handleLogoutClick} title={!isOpen ? 'Logout' : undefined}>
                {isOpen ? 'Logout' : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                )}
            </button>
        </aside>
    )
}

export default Sidebar