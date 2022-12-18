import { useRef } from "react";
import IdealTimer from "react-idle-timer";

export default function IdleTimerContainer() {
  const idleTimerRef = useRef(null);

  const onIdle = () => {
    console.log("User is idle");
  };

  return (
    <div>
      <IdealTimer
        ref={idleTimerRef}
        timeout={5 * 1000}
        onIdle={onIdle}
      ></IdealTimer>
    </div>
  );
}
