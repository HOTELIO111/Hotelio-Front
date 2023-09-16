import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import style from '../Terms/Terms.module.css'
import Footer from '../../Components/footer/Footer';

const Refund = () => {
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
                <h1>Hotelio Refund Policy</h1>
            </div>
            <div className='container'>
                <h4 className='py-3'><b>Cancellation and Refund Policy</b></h4>
                <p className='py-2'>
                    Cancellation and Refund Policy
                    To request a refund, please contact us through  HOTELIO Help Center.
                    Cancelling an HOTELIO is as fast and easy as booking one.
                    <ol>
                        <li style={{ display: 'flex', paddingTop: '10px' }}>&rarr; <p style={{ margin: '0px 0px 0px 10px' }}>We love to host you but in case your plans change, our simple cancellation process makes sure you receive a quick confirmation and fast refunds. Our standard check-in time is 11 PM.</p></li>
                        <li style={{ display: 'flex', paddingTop: '10px' }}>&rarr; <p style={{ margin: '0px 0px 0px 10px' }}>Hotelio is committed to providing you with a simple and efficient refund process. Please note that shortening your stay during the high season, periods of high occupancy, during trade fairs and conventions, or failure to cancel your reservation prior to the due date noted on your confirmation may result in a penalty charge being imposed by the hotel. If a penalty charge is incurred, this will be deducted from the amount refunded.</p></li>
                        <li style={{ display: 'flex', paddingTop: '10px' }}>&rarr; <p style={{ margin: '0px 0px 0px 10px' }}>Your confirmation email will specify the exact cancellation due date which is the deadline you must cancel by in order to avoid any cancellation fee. Generally, the cancellation due date is 24 hrs prior to arrival at the hotel. The penalty charge is usually one-night stay, unless specified on the confirmation email.</p></li>
                        <li style={{ display: 'flex', paddingTop: '10px' }}>&rarr; <p style={{ margin: '0px 0px 0px 10px' }}>We will fully refund any booking cancelled up to 24 hours prior to scheduled check in date. For any cancellation within 24 hours of scheduled check-in, the complete booking amount shall be deducted as cancellation charge.</p></li>
                        <li style={{ display: 'flex', paddingTop: '10px' }}>&rarr; <p style={{ margin: '0px 0px 0px 10px' }}>Unless specifically mentioned otherwise in the cancellation policy, cancellation requests submitted via any of the means above, prior to the due date noted on your confirmation, will normally be refunded 100% of the cost of their stay (Hotelio does not charge a processing fee for cancellations) within 10 days of receiving the request. Any cancellation request submitted after the due date noted on your confirmation will also be processed within 10 days, and any applicable penalty charge will be deducted from the amount refunded.</p></li>
                        <li style={{ display: 'flex', paddingTop: '10px' }}>&rarr; <p style={{ margin: '0px 0px 0px 10px' }}>Shortened stays, in most cases, will be refunded within 10 days, net of any penalty charge applicable, and if you notify us (by any of the means above) prior to shortening your stay, we can expedite the refund process. If however, you notify us after checking out, some shortened stay refunds may take longer because some hotels can be slow to confirm the exact dates of your stay. If your refund is likely to take longer than 10 days to process, we will notify you via email or sms upon receipt of your request.</p></li>
                    </ol>
                </p>
                <h3 className='py-3'><b>How to Cancel</b></h3>
                <p>You can cancel your booking using our website or mobile app. You can also email us at <a href="mailto:mailto:recipient@example.com">info@hoteliorooms.com</a> to cancel your booking. The applicable refund amount will be credited to you within 14 working days.</p>
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
        </div >
    );
};

export default Refund;
