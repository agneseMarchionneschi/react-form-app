import React from 'react';
import {TextField} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';

interface Step1Props {
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

const Step1: React.FC<Step1Props> = ({formData, setFormData, formErrors, setFormErrors}) => {
    const handleChange = (field: string, value: string | null) => {
        setFormData((prevData) => ({...prevData, [field]: value}));
        setFormErrors((prevErrors) => ({...prevErrors, [`${field}Error`]: ''}));
    };

    return (
        <div>
            <div className="mb-3">
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={!!formErrors.nameError}
                    helperText={formErrors.nameError}
                />
            </div>
            <div className="mb-3">
                <TextField
                    id="surname"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.surname}
                    onChange={(e) => handleChange('surname', e.target.value)}
                    error={!!formErrors.surnameError}
                    helperText={formErrors.surnameError}
                />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date of Birth"
                    value={formData.dob ? dayjs(formData.dob) : null}
                    onChange={(newValue: Dayjs | null) => handleChange('dob', newValue ? newValue.format('YYYY-MM-DD') : null)}
                    slotProps={{
                        textField: {
                            error: !!formErrors.dobError,
                            helperText: formErrors.dobError,
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default Step1;
