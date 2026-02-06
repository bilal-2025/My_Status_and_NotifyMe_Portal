import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NM() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('user') || '';
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/nm/viewcampaigns`, { headers: { Authorization: `Bearer ${token}` } });
        setCampaigns(res.data ? JSON.parse(res.data) : []);
      } catch (err) {
        console.error('Error fetching NM campaigns', err);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const download = (campaign) => {
    window.location = `${process.env.REACT_APP_BASE_URL}/nm/downloadfile?campaign=${encodeURIComponent(campaign)}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Notify Me - Campaigns</h2>
      {loading ? <p>Loading...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>Campaign</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Start</th>
              <th style={{ textAlign: 'left', padding: 8 }}>End</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Other</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.campaignname}>
                <td style={{ padding: 8 }}>{c.campaignname}</td>
                <td style={{ padding: 8 }}>{c.starttime}</td>
                <td style={{ padding: 8 }}>{c.endtime}</td>
                <td style={{ padding: 8 }}>{c.other}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => download(c.campaignname)}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NM;
