import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

const Camera = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const radius = 160;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-[360px] h-[360px] border-5 border-black rounded-full flex justify-center items-center p-2.5">
      <svg className="absolute top-0 left-0 w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#4caf50"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 180 180)"
          className="transition-all duration-100 ease-linear"
        />
      </svg>
      <Webcam
        className="rounded-full"
        audio={false}
        width={320}
        height={320}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
      />
    </div>
  );
};

export default Camera;
