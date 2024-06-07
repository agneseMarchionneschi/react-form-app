import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import flowersData from '../../assets/mock/flowers.json';

interface Flower {
    id: number;
    name: string;
}

interface Step3Props {
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

const Step3: React.FC<Step3Props> = ({formData, setFormData, formErrors, setFormErrors}) => {
    const [flowers, setFlowers] = useState<Flower[]>([]);

    useEffect(() => {
        setFlowers(flowersData);
        if (!formData.flower && flowersData.length > 0) {
            setFormData((prevData) => ({...prevData, flower: flowersData[0].name}));
        }
    }, [formData.flower, setFormData]);

    const handleChange = (value: string | null) => {
        setFormData((prevData) => ({...prevData, flower: value || ''}));
        setFormErrors((prevErrors) => ({...prevErrors, flowerError: ''}));
    };

    return (
        <div>
            <Autocomplete
                id="flower"
                options={flowers.map((flower) => flower.name)}
                value={formData.flower}
                onChange={(event, newValue) => handleChange(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Flower" variant="outlined" fullWidth required
                               error={!!formErrors.flowerError} helperText={formErrors.flowerError}/>
                )}
            />
        </div>
    );
};

export default Step3;
