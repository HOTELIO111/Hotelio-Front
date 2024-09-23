import { ClockLoader, FadeLoader, ScaleLoader } from "react-spinners";

export const WaitLoader = ({ loading }) => {
  return (
    <ScaleLoader
      color="#ff0000"
      loading={loading}
      size={60}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "99999",
      }}
    />
  );
};

export const ClockWaitLoader = ({ loading }) => {
  return (
    <FadeLoader
      color="#ff0000"
      loading={loading}
      size={60}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "99999",
      }}
    />
  );
};
