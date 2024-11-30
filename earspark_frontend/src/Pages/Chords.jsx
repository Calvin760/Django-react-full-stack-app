import React from 'react'
import AbsolutePitchTraining from './AbsolutePitchTraining'
import ChordQuiz from './ChordQuiz'

const Chords = () => {
  return (
      <div className="piano-card-holder">
          <h2>Intervals</h2>
          <div className="piano-container">
              <AbsolutePitchTraining />
          </div>
          <hr /> {/* Optional: Adds a horizontal line for separation */}
          {/* <h2>Intervals Quiz</h2> */}
          <ChordQuiz />
      </div>
  )
}

export default Chords