import React, { useState, useEffect } from 'react';

const RewardCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardsPerMonth, setRewardsPerMonth] = useState({});

  const fetchData = async () => {
    // Simulating an asynchronous API call to fetch data
    const response = [
        {
          customerId: 'John Doe',
          purchaseAmount: 151,
          transactionDate: '2023-07-05',
        },
        {
          customerId: 'John Doe',
          purchaseAmount: 120,
          transactionDate: '2023-06-18',
        },
        {
          customerId: 'John Doe',
          purchaseAmount: 46,
          transactionDate: '2023-08-10',
        },
        {
          customerId: 'Jane Smith',
          purchaseAmount: 79,
          transactionDate: '2023-06-25',
        },
        {
          customerId: 'Michael Johnson',
          purchaseAmount: 220,
          transactionDate: '2023-08-10',
        },
        {
          customerId: 'Michael Johnson',
          purchaseAmount: 120,
          transactionDate: '2023-07-15',
        },
        {
          customerId: 'Emily Brown',
          purchaseAmount: 43,
          transactionDate: '2023-09-03',
        },
        {
          customerId: 'David Lee',
          purchaseAmount: 95,
          transactionDate: '2023-06-20',
        },
        {
          customerId: 'Sophia Martinez',
          purchaseAmount: 66,
          transactionDate: '2023-06-30',
        },
        {
          customerId: 'John Doe',
          purchaseAmount: 30,
          transactionDate: '2023-08-05',
        },
        {
          customerId: 'Jane Smith',
          purchaseAmount: 111,
          transactionDate: '2023-07-10',
        },
        {
          customerId: 'Michael Johnson',
          purchaseAmount: 76,
          transactionDate: '2023-06-22',
        },
        {
          customerId: 'Emily Brown',
          purchaseAmount: 50,
          transactionDate: '2023-08-15',
        },
        {
          customerId: 'David Lee',
          purchaseAmount: 130,
          transactionDate: '2023-08-01',
        },
        {
          customerId: 'Sophia Martinez',
          purchaseAmount: 96,
          transactionDate: '2023-07-28',
        },
        {
          customerId: 'John Doe',
          purchaseAmount: 90,
          transactionDate: '2023-08-18',
        },
        {
          customerId: 'Jane Smith',
          purchaseAmount: 40,
          transactionDate: '2023-06-15',
        },
        {
          customerId: 'Michael Johnson',
          purchaseAmount: 200,
          transactionDate: '2023-07-02',
        },
        {
          customerId: 'Emily Brown',
          purchaseAmount: 70,
          transactionDate: '2023-08-08',
        },
        {
          customerId: 'David Lee',
          purchaseAmount: 55,
          transactionDate: '2023-07-20',
        },
        {
          customerId: 'Sophia Martinez',
          purchaseAmount: 181,
          transactionDate: '2023-08-23',
        },
      ]
    setTransactions(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const calculateRewards = () => {
      const rewards = {};
      transactions.forEach(transaction => {
        const { customerId, purchaseAmount, transactionDate } = transaction;
        const month = new Date(transactionDate).getMonth();

        // Calculate rewards
        const pointsOver100 = Math.max(purchaseAmount - 100, 0) * 2;
        const pointsBetween50And100 = Math.max(Math.min(purchaseAmount, 100) - 50, 0);

        const totalPoints = pointsOver100 + pointsBetween50And100;

        // Update rewards object
        if (!rewards[customerId]) {
          rewards[customerId] = {
            total: 0,
            months: {},
          };
        }

        if (!rewards[customerId].months[month]) {
          rewards[customerId].months[month] = 0;
        }

        rewards[customerId].total += totalPoints;
        rewards[customerId].months[month] += totalPoints;
      });

      setRewardsPerMonth(rewards);
    };

    calculateRewards();
  }, [transactions]);

  return (
    <div>
      <h2>Reward Points Calculator</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Total Reward Points</th>
              <th colSpan="3">Reward Points Per Month</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rewardsPerMonth).map(customerId => (
              <tr key={customerId}>
                <td className="customer-header">{customerId}</td>
                <td className="total-cell">{rewardsPerMonth[customerId].total}</td>
                {Object.keys(rewardsPerMonth[customerId].months).map(month => (
                  <td key={month} className="month-header">
                    Month {parseInt(month) + 1}: {rewardsPerMonth[customerId].months[month]} points
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RewardCalculator;
