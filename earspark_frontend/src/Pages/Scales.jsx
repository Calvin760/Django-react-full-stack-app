import React from 'react'
import AbsolutePitchTraining from './AbsolutePitchTraining';
import ScalesQuiz from './ScalesQuiz';

const Scales = () => {
  return (
      <div className="piano-card-holder">
          <h2>Piano</h2>
          <div className="piano-container">
              <AbsolutePitchTraining />
          </div>
          <hr /> {/* Optional: Adds a horizontal line for separation */}
          {/* <h2>Intervals Quiz</h2> */}
          <ScalesQuiz />
      </div>
  )
}

export default Scales