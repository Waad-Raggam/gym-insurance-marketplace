import React, { useEffect, useState } from "react";
import "./InsurancePlans.css";
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
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Monthly Premium</th>
                <th>Coverage Type</th>
                <th>Coverage Details</th>
              </tr>
            </thead>
            <tbody>
              {response.map((plan) => (
                <tr key={plan.insuranceId}>
                  <td>{plan.planName}</td>
                  <td>${plan.monthlyPremium}</td>
                  <td>{plan.coverageType}</td>
                  <td>
                  <ul>
                    {plan.coverageDetails.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <li>No insurance plans available.</li>
        )}
      </ul>
    </div>
  );
}
