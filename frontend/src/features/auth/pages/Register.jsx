import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Loader from '../../interview/components/Loader'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({ username, email, password })
        if (success) {
            navigate("/login")
        }
    }

    if (loading) {
        return <Loader label="Creating your account..." />
    }

    

    return (
        <div className="auth-page">
            {/* Left info panel */}
            <div className='auth-panel'>
                <div className='auth-panel__logo'>
                    <span className='auth-panel__mark'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" /></svg>
                    </span>
                    <span>Interview<em>Prep</em></span>
                </div>

                <h1 className='auth-panel__title'>Start preparing smarter, not harder.</h1>
                <p className='auth-panel__sub'>Create a free account to save your sessions, track your progress, and revisit your prep plans anytime.</p>

                <ul className='auth-panel__list auth-panel__list--check'>
                    <li>
                        <span className='auth-panel__check'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <div><strong>Free forever</strong><span>No credit card required</span></div>
                    </li>
                    <li>
                        <span className='auth-panel__check'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <div><strong>Persistent history</strong><span>Every session saved automatically</span></div>
                    </li>
                    <li>
                        <span className='auth-panel__check'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <div><strong>Tailored content</strong><span>Questions matched to your role</span></div>
                    </li>
                    <li>
                        <span className='auth-panel__check'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <div><strong>Downloadable reports</strong><span>Take your plan anywhere</span></div>
                    </li>
                </ul>
            </div>

            {/* Right form panel */}
            <div className='auth-form-panel'>
                <div className="auth-card">
                    <div className='auth-heading'>
                        <h1>Create your account</h1>
                        <p>It takes 30 seconds. No credit card needed.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                type="text" id="username" name="username"
                                placeholder="Enter username"
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email" id="email" name="email"
                                placeholder="Enter email address"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className='password-field'>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    id="password" name="password"
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type='button'
                                    className='password-field__toggle'
                                    onClick={() => setShowPassword(s => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.6 21.6 0 0 1 5.06-6.06M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.6 21.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type='submit' className='button primary-button' disabled={loading}>
                            {loading ? <span className='btn-spinner' /> : (
                                <>
                                    Create account
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </>
                            )}
                        </button>
                    </form>

                    <p className='auth-switch'>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register