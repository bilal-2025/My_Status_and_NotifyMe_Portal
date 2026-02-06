import { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './EditModal.module.css';
import axios from 'axios';
// import { Oval } from 'react-loader-spinner';

const EditModal = ({ closeEditModal, campaignName, groupId, channel }) => {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false);
    const [editDateTime, setEditDateTime] = useState({
        editFrom: '',
        editTo: ''
    })

    // This function will be called when the edit campaign is called
    async function editSubmitHandler(e) {
        e.preventDefault()
        setLoading(true);

        // Fetching user from the local storage
        const token = localStorage.getItem('user');

        let body = {
            campaign_group_id: groupId,
            editDateTime: JSON.stringify(editDateTime)
        }

        if (editDateTime.editFrom === '' && editDateTime.editTo === '') {
            setMessage('Please select date and time to edit');
            return
        }

        try {
            const url = channel === 'nm' ? `${process.env.REACT_APP_BASE_URL}/nm/editcampaign` : `${process.env.REACT_APP_BASE_URL}/editcampaign`;
            const response = await axios.patch(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setLoading(false);
            setMessage(response.data);

            setTimeout(() => {
                window.location.reload()
            }, 3000);

        }
        catch (error) {
            setLoading(false);

            setMessage('Error in updating campaign')

        }
    }

    function editTimeHandler(e) {
        const { name, value } = e.target;

        setEditDateTime((prevValues) => ({
            ...prevValues,
            [name]: value
        }));

        console.log("Name : ", name);
        console.log("Value : ", value);
    };


    return ReactDOM.createPortal(<>
        <div className={styles['edit-modal-wrapper']} onClick={closeEditModal}></div>

        <div className={styles['edit-modal-container']}>

            <form onSubmit={editSubmitHandler} encType="application/x-www-form-urlencoded">

                <h3 style={{ textAlign: "center", marginBottom: '2rem' }}>{campaignName}</h3>

                <div className={styles.campWrapper}>
                    <div className={styles.grid}>

                        {/* Campaign Name */}
                        <div>{campaignName}</div>

                        <div className={styles.editDateTimeDiv}>
                            Start:<input type={'datetime-local'} className={styles.editDateTimeFrom} name="editFrom" onChange={editTimeHandler} />
                        </div>


                        <div className={styles.editDateTimeDiv}>
                            End:<input type={'datetime-local'} className={styles.editDateTimeTo} name="editTo" onChange={editTimeHandler} />
                        </div>

                        <div className={styles.doneBtnDiv}>
                            <button type='submit' className={styles.doneBtn}> {
                                loading ? 'adding...' : 'Done'
                            } </button>
                        </div>

                    </div>
                </div>
            </form>


            <div style={{ display: 'flex', alignItems: 'center' }}>

                <button className={styles['edit-modal-btn']} onClick={closeEditModal} >Close!</button>
                {
                    message && <p style={{ fontSize: '1.1rem', lineHeight: '0px', margin: '0px', marginLeft: '1rem' }}>{message}</p>
                }

            </div>
        </div>
    </>, document.querySelector('.editModal'))
}

export default EditModal