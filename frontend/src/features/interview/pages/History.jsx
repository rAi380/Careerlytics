import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import '../style/history.scss'
import { useInterview } from '../hooks/useInterview'
import Loader from '../components/Loader'
import ConfirmDialog from '../components/ConfirmDialog'
import toast from 'react-hot-toast'

const scoreTier = (score) =>
    score >= 80 ? 'high' : score >= 60 ? 'mid' : 'low'

const ReportRow = ({ report, onRequestDelete }) => {
    const navigate = useNavigate()
    const tier = scoreTier(report.matchScore)

    return (
        <div className={`ihx-row ihx-row--${tier}`} onClick={() => navigate(`/interview/${report._id}`)}>
            <span className='ihx-row__bar' />

            <div className='ihx-row__badge'>
                <span>{report.matchScore}</span>
                <small>%</small>
            </div>

            <div className='ihx-row__title'>
                <h3>{report.title}</h3>
            </div>

            <div className='ihx-row__date'>
                {new Date(report.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>

            <div className='ihx-row__actions'>
                <button
                    className='ihx-row__delete'
                    onClick={(e) => { e.stopPropagation(); onRequestDelete(report) }}
                    aria-label='Delete report'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
                <span className='ihx-row__chevron'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
            </div>
        </div>
    )
}

const History = () => {
    const { reports, loading, deleteReport } = useInterview()
    const navigate = useNavigate()
    const [reportPendingDelete, setReportPendingDelete] = useState(null)

    const handleConfirmDelete = async () => {
        const report = reportPendingDelete
        setReportPendingDelete(null)
        try {
            await deleteReport(report._id)
            toast.success("Report deleted")
        } catch {
            toast.error("Failed to delete report")
        }
    }

    if (loading) {
        return <Loader label="Loading your history..." />
    }

    if (!reports || reports.length === 0) {
        return (
            <main className='ihx-empty'>
                <div className='ihx-empty__icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <h1>No history yet</h1>
                <p>Generate your first interview preparation plan to see it appear here. Everything is saved automatically to your account.</p>
                <button className='ihx-empty__btn' onClick={() => navigate('/new-session')}>
                    Create New Session
                </button>
            </main>
        )
    }

    return (
        <main className='ihx-page'>
            <div className='ihx-page__header'>
                <h1>Preparation History</h1>
                <p>Your past interview prep sessions, saved to your account.</p>
            </div>

            <div className='ihx-table'>
                <div className='ihx-table__head'>
                    <span className='ihx-table__head-bar' />
                    <span>Score</span>
                    <span>Title</span>
                    <span>Date</span>
                    <span></span>
                </div>

                <div className='ihx-table__body'>
                    {reports.map((report) => (
                        <ReportRow key={report._id} report={report} onRequestDelete={setReportPendingDelete} />
                    ))}
                </div>
            </div>

            <ConfirmDialog
                open={!!reportPendingDelete}
                title="Delete this report?"
                message={reportPendingDelete ? `"${reportPendingDelete.title}" will be permanently deleted. This cannot be undone.` : ""}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                danger
                onConfirm={handleConfirmDelete}
                onCancel={() => setReportPendingDelete(null)}
            />
        </main>
    )
}

export default History