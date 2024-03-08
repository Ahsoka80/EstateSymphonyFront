/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { FormHelperText, IconButton, MenuItem, TextField } from "@mui/material"

const CustomInput = ({ name, value, type, onChange, onClick, placeholder, label, required, error, secured, showPassword, handleClickShowPassword, inputType, items }) => {

    return (
        <>
            {inputType === 'select' ? (
                <>
                    <TextField
                        sx={{ marginTop: 2, marginBottom: -0.5, width: 200 }}
                        select
                        name={name}
                        onChange={onChange}
                        onClick={onClick}
                        placeholder={placeholder}
                        label={label}
                        required={required}
                    >
                        {items.map((item, _index) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormHelperText sx={{ color: 'red', marginLeft: 1 }}>{error}</FormHelperText>
                </>
            ) : (
                <>
                    <TextField
                        sx={{ marginTop: 2, marginBottom: -0.5, width: 200 }}
                        name={name}
                        value={value}
                        type={secured ? (showPassword ? "text" : "password") : type}
                        onChange={onChange}
                        onClick={onClick}
                        placeholder={placeholder}
                        label={label}
                        required={required}
                        InputProps={{
                            endAdornment: secured && (
                                <IconButton onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    <FormHelperText sx={{ color: 'red', marginLeft: 1 }}>{error}</FormHelperText>
                </>
            )}
        </>
    );
}; export default CustomInput
