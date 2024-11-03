import React, { useEffect, useState } from "react";

export default function InsurancePlans(props) {
  const { response } = props;
  // const [plans, setPlans] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //     const fetchPlans = async () => {
  //         try {
  //             const response = await fetch('http://localhost:5125/api/v1/InsurancePlan/');
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             const data = await response.json();
  //             setPlans(data);
  //         } catch (error) {
  //             setError(error);
  //             console.error('There was a problem with the fetch operation:', error);
  //         }
  //     };

  //     fetchPlans();
  // }, []);

  // if (error) {
  //     return <div>Error: {error.message}</div>;
  // }

  return (
    <div>
      <h1>Insurance Plans</h1>
      <ul>
        {Array.isArray(response) && response.length > 0 ? (
          response.map((plan) => (
            <li key={plan.insuranceId}>
              <h2>{plan.planName}</h2>
              <p>Monthly Premium: ${plan.monthlyPremium}</p>
              <p>Coverage Type: {plan.coverageType}</p>
              <p>Details: {plan.coverageDetails}</p>
            </li>
          ))
        ) : (
          <li>No insurance plans available.</li>
        )}
      </ul>
    </div>
  );
}
