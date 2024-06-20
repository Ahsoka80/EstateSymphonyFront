/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@mui/material"

const CustomInput = ({ name, value, type, onChange, onClick, placeholder, label, required, error, secured, showPassword, handleClickShowPassword, inputType, items, min, max }) => {
    if (inputType === 'select') {
        return (
            <>
                <FormControl
                    sx={{ marginTop: 2, marginBottom: -0.5, width: 200 }}
                >
                    <InputLabel id={`select-${name}`}>{label}</InputLabel>
                    <Select
                        value={value ?? 0}
                        labelId={`select-${name}`}
                        name={name}
                        onClick={onClick}
                        onChange={onChange}
                        placeholder={placeholder}
                        label={label}
                        required={required}
                    >
                        {items.map((item, _index) => {
                            return (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText sx={{ color: 'red', marginLeft: 1 }}>{error}</FormHelperText>
                </FormControl>
            </>
        )
    } else if (type === 'checkbox') {
        return (
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
                    required={required}
                />
            </>)
    } else if (type === 'slider') {
        return (<>
            <Box width={300} mx="auto" mt={5} >
                <Typography id="input-slider" gutterBottom>
                    {label}
                </Typography>
                <Slider
                    value={value}
                    name={name}
                    onChange={onChange}
                    required={required}
                    min={min}
                    max={max}
                    step={50}
                    valueLabelDisplay="auto"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="body3"
                        sx={{ cursor: 'default' }}
                    >
                        {min}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ cursor: 'default' }}
                    >
                        {max}
                    </Typography>
                </Box>
            </Box>
        </>)
    } else {
        return (
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
        )
    }

}; export default CustomInput
