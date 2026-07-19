import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import BrandMark from '../../interview/components/BrandMark'
import Loader from '../../interview/components/Loader'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({ email, password })
        if (success) {
            navigate('/')
        }
    }
    if (loading) {
        return <Loader label="Signing you in..." />
    }

    return (
        <div className="auth-page">
            {/* Left info panel */}
            <div className='auth-panel'>
                <div className='lp-nav__brand'>
                    <BrandMark size="sm" pill />
                </div>

                <h1 className='auth-panel__title'>Your quiet command center for interview success.</h1>
                <p className='auth-panel__sub'>Generate targeted questions, a 7-day plan, and downloadable reports — all from your job description.</p>

                <ul className='auth-panel__list'>
                    <li><span className='auth-panel__dot' />Tailored technical &amp; behavioral questions</li>
                    <li><span className='auth-panel__dot' />Structured 7-day preparation plan</li>
                    <li><span className='auth-panel__dot' />Downloadable resume &amp; report</li>
                    <li><span className='auth-panel__dot' />Session history to revisit anytime</li>
                </ul>

                <p className='auth-panel__footnote'>Sign in or create a free account to generate and save your interview prep sessions.</p>
            </div>

            {/* Right form panel */}
            <div className='auth-form-panel'>
                <div className="auth-card">
                    <div className='auth-heading'>
                        <h1>Welcome back</h1>
                        <p>Sign in to access your prep sessions and history.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                                    autoComplete="current-password"
                                    required
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
                                    Sign in
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </>
                            )}
                        </button>
                    </form>

                    <p className='auth-switch'>Don't have an account? <Link to="/register">Create one</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login