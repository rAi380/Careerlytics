import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader'

const Home = () => {

    const { loading, generateReport } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFileName, setResumeFileName ] = useState(null)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleResumeChange = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setResumeFileName(null)
            return
        }

        if (file.type !== 'application/pdf') {
            toast.error("Please upload a PDF file")
            e.target.value = ""
            setResumeFileName(null)
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File too large — max 5MB")
            e.target.value = ""
            setResumeFileName(null)
            return
        }

        setResumeFileName(file.name)
        
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]

        if (!resumeFile) {
            toast.error("Please upload your resume first")
            return
        }
        if (!jobDescription.trim()) {
            toast.error("Job description is required")
            return
        }

        const data = await generateReport({ jobDescription, selfDescription, resumeFile })

        if (data) {
            navigate(`/interview/${data._id}`)
        } else {
            toast.error("Failed to generate report. Please try again.")
        }
    }

    if (loading) {
    return <Loader label="Analyzing your profile and building your strategy..." />
    }

    return (
        <div className='ns-page'>
            <div className='ns-page__header'>
                <h1>New Preparation Session</h1>
                <p>Provide the context below to generate a highly targeted interview plan.</p>
            </div>

            {/* The Opportunity */}
            <div className='ns-section'>
                <div className='ns-section__bar' />
                <div className='ns-section__body'>
                    <div className='ns-section__header'>
                        <span className='ns-section__icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                        </span>
                        <h2>The Opportunity</h2>
                    </div>
                    <p className='ns-section__desc'>Paste the full job description you are applying for.</p>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className='ns-textarea'
                        placeholder="e.g. We are looking for a Senior Frontend Engineer with experience in React, TypeScript..."
                        maxLength={5000}
                    />
                    <div className='ns-char-counter'>{jobDescription.length} / 5000</div>
                </div>
            </div>

            {/* Your Narrative */}
            <div className='ns-section'>
                <div className='ns-section__bar' />
                <div className='ns-section__body'>
                    <div className='ns-section__header'>
                        <span className='ns-section__icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </span>
                        <h2>Your Narrative</h2>
                    </div>
                    <p className='ns-section__desc'>Briefly describe your current role, goals, and what makes you unique.</p>
                    <textarea
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                        className='ns-textarea ns-textarea--short'
                        placeholder="e.g. I am a mid-level engineer transitioning to senior. I specialize in web performance and accessible UI..."
                    />
                </div>
            </div>

            {/* Your Resume */}
            <div className='ns-section'>
                <div className='ns-section__bar' />
                <div className='ns-section__body'>
                    <div className='ns-section__header'>
                        <span className='ns-section__icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                        </span>
                        <h2>Your Resume</h2>
                    </div>
                    <p className='ns-section__desc'>Upload your resume as a PDF (max 5MB).</p>

                    <label className={`ns-dropzone ${resumeFileName ? 'ns-dropzone--filled' : ''}`} htmlFor='resume'>
                        {resumeFileName ? (
                            <>
                                <span className='ns-dropzone__icon ns-dropzone__icon--success'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                </span>
                                <p className='ns-dropzone__title'>{resumeFileName}</p>
                                <p className='ns-dropzone__subtitle'>Click to replace</p>
                            </>
                        ) : (
                            <>
                                <span className='ns-dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='ns-dropzone__title'>Click to upload or drag &amp; drop</p>
                                <p className='ns-dropzone__subtitle'>PDF Only (Max 5MB)</p>
                            </>
                        )}
                        <input
                            ref={resumeInputRef}
                            hidden
                            type='file'
                            id='resume'
                            name='resume'
                            accept='.pdf'
                            onChange={handleResumeChange}
                        />
                    </label>
                </div>
            </div>

            <div className='ns-footer'>
                <button onClick={handleGenerateReport} className='ns-generate-btn'>
                    Generate Prep Plan
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" /></svg>
                </button>
            </div>
        </div>
    )
}

export default Home