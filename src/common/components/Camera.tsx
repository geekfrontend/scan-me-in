import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

const Camera = () => (
  <Webcam
    style={{ borderRadius: "100%" }}
    audio={false}
    width={720}
    height={720}
    screenshotFormat="image/jpeg"
    videoConstraints={videoConstraints}
    mirrored={true}
  />
);

export default Camera;
