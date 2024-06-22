import React, { useEffect, useState } from "react";
import "./Robot.css"; // Ensure this imports your CSS with the animation
import { Link } from "react-router-dom";

const RobotAnimation = () => {
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    const randomInterval = () => {
      // Generate a random interval between 30 seconds to 2 minutes
      return Math.floor(Math.random() * (120000 - 30000 + 1)) + 30000;
    };

    const showRobotAtRandomTimes = () => {
      setShowRobot(true);

      // Hide the robot after the animation ends
      setTimeout(() => {
        setShowRobot(false);
      }, 10000); // Duration should match the animation

      // Schedule the next appearance
      setTimeout(showRobotAtRandomTimes, randomInterval());
    };

    // Start the first appearance
    const initialTimeout = setTimeout(showRobotAtRandomTimes, randomInterval());

    // Cleanup on component unmount
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div>
      {showRobot && (
        <Link to="/chat">
          <img
            src="/robotfcrop.png" // Make sure the path is correct
            alt="Robot"
            className="robot"
          />
        </Link>
      )}
    </div>
  );
};

export default RobotAnimation;
