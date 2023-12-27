import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import style from '../Terms/Terms.module.css'
import Footer from '../../Components/footer/Footer';
import DecorImage from '../../images/DecorImage.png'


const Terms = () => {
    const termsList = [
        'Terms of Service',
        'Terms of Operations',
        'Payment and Reconciliation',
        'Hotelio Wizard',
        'Hotelio Products',
        'Invoicing',
        'Set-off',
        'Taxes',
        'OTA Related Terms',
        'Brand Exclusivity',
        'Right to Audit and Inspect',
        'Intellectual Property',
        'Data Privacy and Retention',
        'Confidentiality',
        'Term and Termination',
        'Indemnity',
        'Limitation of Liability',
        'Representation and Warranties',
        'Miscellaneous'
    ];

    return (
        <div>
            <Navbar />
            <div
                style={{ marginTop: '100px' }}
                className={` text-center p-5 rounded ${style.TermsContainer}`}
            >
                <h1>Hotelio Terms & Services</h1>
            </div>
            <div className='container' style={{ background: `linear-gradient(37deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4290966386554622) 100%),url(${DecorImage})` }}>
                <h4 className='py-3'><b>Terms Of Use</b></h4>
                <p className='py-2'>
                    By registering on, signing into, or using the Hotelio Platform, you (“you” or “User”) agree to the terms herein (this “Agreement”):
                    'HOTELO' means owning by Houda Carjour Tourism Pvt Ltd., a company situated  with an address at 22,Ward no8 Mundera Bazaar Chauri Chaura Gorakhpur.
                </p>
                {/* <div className="my-2">
                    <ol>
                        {termsList.map((term, index) => (
                            <li key={index}>
                                <span>{index + 1}. </span>
                                {term}
                            </li>
                        ))}
                    </ol>
                    <ol>
                        <li>Appendix I (DEFINITIONS)</li>
                        <li>Appendix 2 (Hotelio CONTRACTING ENTITIES)</li>
                    </ol>
                </div> */}
            </div>
            <Footer />
        </div>
    );
};

export default Terms;
