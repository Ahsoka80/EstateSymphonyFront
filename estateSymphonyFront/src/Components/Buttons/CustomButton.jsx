import React from "react";
import { Button } from "@mui/material";
import useIcon from "../../utils/hooks/useIcon";

const CustomButton = (props) => {

    const {
        text,
        onClick,
        iconPosition,
        icon,
        type,
        size,
        fullWidth,
        color,


    } = props;
    return (
        <Button
            variant={type}
            onClick={onClick}
            my={2}
            endIcon={
                iconPosition == "right" ? (
                    useIcon(icon, 'error', '5')
                ) : null
            }
            startIcon={
                iconPosition == "left" ? (
                    useIcon(icon, 'secondary', '5')
                ) : null
            }
            size={size}
            fullWidth={fullWidth}
            type={type}
            color={color}
        >
            {text}
        </Button>
    );
};

export default CustomButton;

