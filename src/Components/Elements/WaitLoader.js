import { ScaleLoader } from "react-spinners"

export const WaitLoader = ({ loading }) => {
    return (
        <ScaleLoader
            color="#ff0000"
            loading={loading}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "9999",
            }}
        />
    )
}