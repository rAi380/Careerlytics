import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/landingPage.scss'
import BrandMark from '../components/BrandMark'

const FEATURES = [
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2a10 10 0 0 1 10 10h-10z" /></svg>),
        title: "Targeted Technicals",
        desc: "Custom technical questions based precisely on the stack and responsibilities mentioned in the job description."
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
        title: "Behavioral Scenarios",
        desc: "STAR-format prompts that help you map your past experiences to the core competencies the role demands."
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
        title: "7-Day Action Plan",
        desc: "A structured daily itinerary to ensure you peak at the right time, balancing deep dives with essential rest."
    }
]

const STEPS = [
    {
        number: "01",
        title: "Input the context",
        desc: "Paste the job description, tell us a bit about your background, and provide your resume. The more context, the sharper the preparation plan."
    },
    {
        number: "02",
        title: "Generate your brief",
        desc: "Our system analyzes the intersection of your experience and their requirements to generate a highly specific interview brief."
    },
    {
        number: "03",
        title: "Execute the plan",
        desc: "Download your brief as a PDF, follow the daily action plan, and walk into your interview room feeling grounded and prepared."
    }
]

const LandingPage = () => {
    const { user, loading } = useAuth()

    // While the session check is running, avoid flashing the wrong CTA
    const destination = !loading && user ? '/new-session' : '/login'
    const ctaLabel = !loading && user ? 'Go to New Session' : 'Start Session'

    return (
        <div className='lp-page'>
            {/* ── Nav ── */}
            <header className='lp-nav'>
                <div className='lp-nav__brand'>
                    <BrandMark size="sm" pill />
                </div>
                <div className='lp-nav__actions'>
                    <Link to={destination} className='lp-nav__cta'>{ctaLabel}</Link>
                </div>
            </header>

            {/* ── Hero ── */}
            <section className='lp-hero'>
                <span className='lp-hero__pill'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" /></svg>
                    Your quiet command center for interview success
                </span>

                <h1 className='lp-hero__title'>
                    Prepare with <span className='lp-hero__accent'>precision</span>.<br />
                    Interview with confidence.
                </h1>

                <p className='lp-hero__sub'>
                    Stop guessing what they'll ask. We analyze the job description and your background to generate
                    targeted technical questions, behavioral scenarios, and a structured 7-day preparation plan.
                </p>

                <div className='lp-hero__actions'>
                    <Link to={destination} className='lp-hero__btn'>Try It Out Now
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </Link>
                </div>
            </section>

            {/* ── Features ── */}
            <section className='lp-features'>
                <div className='lp-features__header'>
                    <h2>Everything you need. Nothing you don't.</h2>
                    <p>A focused toolkit designed to eliminate pre-interview anxiety and replace it with structured readiness.</p>
                </div>

                <div className='lp-features__grid'>
                    {FEATURES.map((f, i) => (
                        <div className='lp-feature-card' key={i}>
                            <span className='lp-feature-card__icon'>{f.icon}</span>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className='lp-steps'>
                <h2>How it works</h2>

                <div className='lp-steps__list'>
                    {STEPS.map((s, i) => (
                        <div className='lp-step' key={i}>
                            <span className='lp-step__number'>{s.number}</span>
                            <div className='lp-step__content'>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className='lp-cta'>
                <h2>Ready to secure the offer?</h2>
                <p>Take approx 30 seconds to generate a preparation plan that could change the trajectory of your career.</p>
                <Link to={destination} className='lp-cta__btn'>
                    Start Your Prep
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
            </section>
        </div>
    )
}

export default LandingPage