import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InfluencerList = () => {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    const fetchInfluencers = async () => {
      const response = await axios.get('http://localhost:5000/api/influencers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setInfluencers(response.data);
    };
    fetchInfluencers();
  }, []);

  return (
    <div>
      <h1>Influenciadores</h1>
      <ul>
        {influencers.map((influencer: any) => (
          <li key={influencer._id}>{influencer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfluencerList;
