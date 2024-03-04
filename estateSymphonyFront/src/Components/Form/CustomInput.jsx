import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { FormHelperText, IconButton, TextField } from "@mui/material"

const CustomInput = ({ name, value, type, onChange, placeholder, label, required, error, secured, showPassword, handleClickShowPassword }) => {

    return (
        <>
            <TextField
                sx={{ marginTop: 2, marginBottom: -0.5 }
                }
                name={name}
                value={value}
                type={
                    secured ? !showPassword ? "password" : "text" : type
                }
                onChange={onChange}
                fullWidth
                placeholder={placeholder}
                label={label}
                required={required}
                InputProps={{
                    endAdornment: (
                        secured ? !showPassword ? (
                            <IconButton onClick={handleClickShowPassword}>
                                <VisibilityOff />
                            </IconButton>

                        ) : (
                            <IconButton onClick={handleClickShowPassword}>

                                <Visibility />
                            </IconButton>
                        )
                            : null
                    )
                }}
            />
            <FormHelperText sx={{ color: 'red', marginLeft: 1 }}>{error}</FormHelperText>
        </>

    )
}
export default CustomInput
