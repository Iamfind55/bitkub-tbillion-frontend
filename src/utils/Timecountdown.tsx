import React from "react";
import Countdown from "react-countdown";

export default function Timecountdown({ time }: { time: any }) {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Time&apos;s up!</span>;
    } else {
      return (
        <>
          {`${days ? days + "d:" : ""}${hours ? hours + "h:" : ""}${
            minutes ? minutes + "m:" : ""
          }${seconds}s`}
        </>
      );
    }
  };

  return (
    <>
      {time === "0" ? (
        "Loading..."
      ) : (
        <Countdown autoStart={true} date={time} renderer={renderer} />
      )}
    </>
  );
}
