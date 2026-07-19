import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'
import Sidebar from './Sidebar'
import '../style/layout.scss'

const Layout = () => {
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            if (!mobile) setIsMobileSidebarOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleToggle = () => {
        if (isMobile) {
            setIsMobileSidebarOpen(prev => !prev)
        } else {
            setIsDesktopSidebarOpen(prev => !prev)
        }
    }

    const showBackButton = true

    return (
        <div className={`app-layout ${!isDesktopSidebarOpen && !isMobile ? 'app-layout--collapsed' : ''}`}>
            <Sidebar
                isOpen={isMobile ? true : isDesktopSidebarOpen}
                onToggle={handleToggle}
                mobileOpen={isMobileSidebarOpen}
                isMobile={isMobile}
                onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />

            {isMobile && isMobileSidebarOpen && (
                <div className='app-sidebar-overlay' onClick={() => setIsMobileSidebarOpen(false)} />
            )}

            <div className='app-layout__content'>
                <div className='app-layout__topbar'>
                    {isMobile && (
                        <button className='app-layout__mobile-toggle' onClick={handleToggle} aria-label='Open menu'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                        </button>
                    )}
                    {showBackButton && (
                        <button className='app-layout__back' onClick={() => navigate(-1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                            Back
                        </button>
                    )}
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout