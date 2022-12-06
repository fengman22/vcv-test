import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Appliance from './Appliance'
import './ApplianceList.css'

// hard coded URL for demo only
const API_ENDPOINT = 'http://localhost:3000'

export default function ApplianceList() {
  const [appliances, setAppliances] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const results = await axios.get(`${API_ENDPOINT}/appliances`)
        const appliances = await results.data
        setAppliances(appliances)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    })();
  }, []);

  return (
    <div className="container">
      <h1>Appliances</h1>
      { error? <div className="error">Error while loading data</div>: null}
      { loading? <div>Loading data</div>: 
        <div className="appliances">
          {appliances && appliances.map(appliance =>
            <Appliance appliance={appliance} key={appliance.id}/>
          )}
        </div>
      }
    </div>
  )
}