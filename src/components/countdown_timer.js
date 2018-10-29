import React from "react";

export default function timerDisplay(props) {
  const status = props.status;
  const countDown = props.seconds;
  const classNameOngoing = "card bg-dark text-primary border-primary mx-auto";
  const classNameResting = "card bg-dark text-success border-success mx-auto";

  return (
    <div>
      <p className={status === "resting" ? "text-success" : "text-primary"}>
        {status}
      </p>

      <div
        className={status === "resting" ? classNameResting : classNameOngoing}
        style={{ width: "80px" }}
      >
        <div className="card-body">
          <div className="card-title">{countDown}</div>
        </div>
      </div>
    </div>
  );
}
