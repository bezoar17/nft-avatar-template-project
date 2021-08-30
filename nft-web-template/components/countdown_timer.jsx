import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

// Random component
const Completed = () => <span>Minting enabled!!</span>;

const deadline = '03 Aug 2021 13:00:00 GMT';

// Renderer callback with condition
const countdown_renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completed />;
  } else {
    // Render a countdown
    return <span> Minting starts in {days} days {hours} hours {minutes} minutes {seconds} seconds</span>;
  }
};

export default function CountdownTimer(props) {
  const handle_on_completed = (t) => {
    props.setLaunched(true)
  }
  return(
    <Countdown
    date={Date.parse(deadline)}
    renderer={countdown_renderer}
    onComplete={ handle_on_completed }
    ></Countdown>
  )
}