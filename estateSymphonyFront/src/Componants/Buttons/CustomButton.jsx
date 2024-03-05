import React from "react";
import { Button} from "@mui/material";
import useIcon from "../../utils/hooks/useIcon";

const CustomButton = (props) => {
    
    const {
        text,
        onClick,
        iconPosition,
        icon,
        type,
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
            >
            {text}
        </Button>
    );
};

export default CustomButton;


