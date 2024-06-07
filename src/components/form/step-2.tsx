import React from 'react';
import {TextField} from '@mui/material';

interface Step2Props {
    formData: { name: string; surname: string; dob: string; email: string; password: string; flower: string };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        surname: string;
        dob: string;
        email: string;
        password: string;
        flower: string
    }>>;
    formErrors: {
        nameError: string;
        surnameError: string;
        dobError: string;
        emailError: string;
        passwordError: string;
        flowerError: string
    };
    setFormErrors: React.Dispatch<React.SetStateAction<{
        nameError: string;
        surnameError: string;
        dobError: string;
        emailError: string;
        passwordError: string;
        flowerError: string
    }>>;
}

const Step2: React.FC<Step2Props> = ({formData, setFormData, formErrors, setFormErrors}) => {
    const handleChange = (field: string, value: string) => {
        setFormData((prevData) => ({...prevData, [field]: value}));
        setFormErrors((prevErrors) => ({...prevErrors, [`${field}Error`]: ''}));
    };

    return (
        <div>
            <div className="mb-3">
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={!!formErrors.emailError}
                    helperText={formErrors.emailError}
                />
            </div>
            <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={!!formErrors.passwordError}
                helperText={formErrors.passwordError}
            />
        </div>
    );
};

export default Step2;
