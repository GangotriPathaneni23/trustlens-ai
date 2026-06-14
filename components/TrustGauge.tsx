"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  score: number;
}

export default function TrustGauge({
  score
}: Props) {

  const color =
    score >= 80
      ? "#22c55e"
      : score >= 50
      ? "#f97316"
      : "#ef4444";

  const emoji =
    score >= 90
      ? "😎"
      : score >= 75
      ? "😊"
      : score >= 50
      ? "😐"
      : "😟";

  return (
    <div className="w-64 mx-auto">

      <div className="text-center text-5xl mb-4">
        {emoji}
      </div>

      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={{
          path: {
            stroke: color
          },
          text: {
            fill: "white",
            fontSize: "18px"
          },
          trail: {
            stroke: "#222"
          }
        }}
      />

      <p className="mt-4 text-center font-bold">
        TRUST SCORE
      </p>

    </div>
  );
}