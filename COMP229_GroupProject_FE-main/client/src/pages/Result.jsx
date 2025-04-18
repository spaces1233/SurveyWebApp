import React from 'react';

function Result() {
  const data = {
    questions: [
      '1. How do you usually get to school?',
      '2. What time do you typically arrive at school?',
      '3. How long does it usually take you to get to school?',
    ],
    answers: [
      ['By bus', 'By car', 'By bike', 'Walking', 'Other'],
      ['Before 7:00 AM', '7:00 - 7:30 AM', '7:30 - 8:00 AM', '8:00 - 8:30 AM', 'After 8:30 AM'],
      ['Less than 15 minutes', '15 - 30 minutes', '30 - 45 minutes', '45 minutes - 1 hour', 'More than 1 hour'],
    ],
    responses: [
      [16, 36, 12, 22, 9],  // Updated responses for question 1
      [8, 22, 30, 25, 10],   // Updated responses for question 2
      [21, 28, 24, 13, 9],   // Same responses for question 3
    ],
  };

  // Calculate percentages
  const percentages = data.responses.map((response) => {
    const total = response.reduce((sum, count) => sum + count, 0);
    return response.map((count) => ((count / total) * 100).toFixed(2));
  });

  return (
    <div className="container mt-2 min-h-screen">
      <div className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] text-center">
        Survey Results
      </div>
      <div className="overflow-auto p-8">
        <div className="text-center rounded-lg overflow-hidden w-full sm:w-96 mx-auto">
          {data.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{question}</h3>
              <table className="w-full text-left border border-gray-300">
                <thead>
                  <tr>
                    <th className="p-2 border-b border-gray-300">Option</th>
                    <th className="p-2 border-b border-gray-300">Responses</th>
                    <th className="p-2 border-b border-gray-300">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {data.answers[questionIndex].map((answer, answerIndex) => (
                    <tr key={answerIndex}>
                      <td className="p-2 border-b border-gray-300">{answer}</td>
                      <td className="p-2 border-b border-gray-300">{data.responses[questionIndex][answerIndex]}</td>
                      <td className="p-2 border-b border-gray-300">{percentages[questionIndex][answerIndex]}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Result;
