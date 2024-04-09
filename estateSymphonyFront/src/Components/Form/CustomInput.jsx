/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material"

const CustomInput = ({ name, value, type, onChange, onClick, placeholder, label, required, error, secured, showPassword, handleClickShowPassword, inputType, items }) => {

    return (
        <>
            {inputType === 'select' ? (
                <>
                    <FormControl
                        sx={{ marginTop: 2, marginBottom: -0.5, width: 200 }}
                    >
                        <InputLabel id={`select-${name}`}>{label}</InputLabel>
                        <Select
                            labelId={`select-${name}`}
                            name={name}
                            onClick={onClick}
                            onChange={onChange}
                            placeholder={placeholder}
                            label={label}
                            required={required}
                        >
                            {items.map((item, _index) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText sx={{ color: 'red', marginLeft: 1 }}>{error}</FormHelperText>
                    </FormControl>
                </>
            ) : (type === 'checkbox' ? (
                <>
                    <FormControlLabel
                        sx={{ marginTop: 2, marginBottom: -0.5, width: 200 }}
                        name={name}
                        value={value}
                        control={<Checkbox />}
                        label={label}
                        onChange={onChange}
                        onClick={onClick}
                        labelPlacement="end"
                    />
                </>
            ) : (
                <>
                    <FormControl>
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
                            fullWidth
                            InputProps={{
                                endAdornment: secured && (
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <FormHelperText sx={{ color: 'red', marginLeft: 1 }}>{error}</FormHelperText>
                    </FormControl>
                </>
            ))}
        </>
    );
}; export default CustomInput
