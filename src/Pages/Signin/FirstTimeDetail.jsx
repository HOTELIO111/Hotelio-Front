import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FirstTimeDetail = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        reEnteredPassword: ''
    });
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.reEnteredPassword) {
            alert('Passwords do not match');
            return;
        }

        // Perform any additional submission logic here
        console.log('Form Data:', formData);
    };

    const theme = createTheme({
        components: {
            // ... your existing component overrides
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={0}>
                <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            label="Enter Your Full Name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange}
                            value={formData.password}
                            name="password"
                            label="Enter Your Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="password"
                            autoFocus
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{
                                                backgroundColor: isFocused ? "#fff" : "transparent",
                                            }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange}
                            value={formData.reEnteredPassword}
                            name="reEnteredPassword"
                            label="Re-Enter Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            autoFocus
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{
                                                backgroundColor: isFocused ? "#fff" : "transparent",
                                            }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <ArrowBackIcon /> Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </ThemeProvider>
    );
};

export default FirstTimeDetail;
