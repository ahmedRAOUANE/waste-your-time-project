import React from 'react';

// components
import Header from '../../../components/Header'
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <Header />
            <section className="box column container">
                <div className="paper box full-width nowrap">
                    <div className="text box column ai-start">
                        <div className="box column">
                            <h1 className='disable-guitters text-start full-width'>wast your time</h1>
                            <p>Enhance your skills in reading, writing, and more..</p>
                        </div>
                        <Link className='btn primary' to={"/join"}>join us</Link>
                    </div>
                </div>

                <div className="feature box paper full-width nowrap column">
                    <h2 className='full-width text-start disable-guitters'>rooms</h2>
                    <div className="box full-width card-container">
                        <div className="card box paper outline column">
                            <h3 className='disable-guitters'>reading room</h3>
                            <p>Improve your reading skills with curated articles and exercises.</p>
                        </div>
                        <div className="card box paper outline column">
                            <h3 className='disable-guitters'>reading room</h3>
                            <p>Enhance your writing skills with prompts, tips, and feedback.</p>
                        </div>
                    </div>
                </div>

                <div className="feature box paper full-width nowrap">
                    <div className="text box column full-width">
                        <h2 className='disable-guitters'>Coming Soon</h2>
                        <p>Stay tuned for more rooms to enhance your coding and other skills.</p>
                    </div>
                    <div className="img full-width hide-in-small"></div>
                </div>
            </section>
            <footer style={{ marginTop: "20px" }} className="box transparent center-x center-y paper outline">
                <p>&copy; 2024 Wast Your Time. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default LandingPage