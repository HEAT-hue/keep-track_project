// jshint esverion:6

import { CSSProperties } from "react";
import { BounceLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#52bfd9",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

interface SpinnerProps {
    color: string,
    loading: boolean,
    size: number
}

function Spinner({ color, loading = false, size = 150 }: SpinnerProps) {
    return (
        <>
            <BounceLoader
                color={color}
                loading={loading}
                cssOverride={override}
                // size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>);
}

export { Spinner };