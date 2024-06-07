import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    useMediaQuery,
    useTheme,
    MobileStepper,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Alert
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import {
    validateName,
    validateSurname,
    validateEmail,
    validatePassword,
    validateDateOfBirth,
    validateFlower
} from './validation';

const Form: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dob: '',
        email: '',
        password: '',
        flower: ''
    });
    const [formErrors, setFormErrors] = useState({
        nameError: '',
        surnameError: '',
        dobError: '',
        emailError: '',
        passwordError: '',
        flowerError: ''
    });
    const [submittedSteps, setSubmittedSteps] = useState<number[]>([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const updateNextStep = () => {
            let nextDisabled = false;
            if (activeStep === 0) {
                nextDisabled = !formData.name || !formData.surname;
            } else if (activeStep === 1) {
                nextDisabled = !formData.email || !formData.password;
            } else if (activeStep === 2) {
                nextDisabled = !formData.flower || !!formErrors.dobError;
            }
            setIsNextDisabled(nextDisabled);
        };

        updateNextStep();
    }, [activeStep, formData, formErrors]);

    const handleNext = async () => {
        setIsLoading(true);

        let valid = true;
        let errors: string[] = [];
        const newFormErrors = {...formErrors};

        if (activeStep === 0) {
            newFormErrors.nameError = await validateName(formData.name);
            newFormErrors.surnameError = await validateSurname(formData.surname);
            newFormErrors.dobError = await validateDateOfBirth(formData.dob);
            errors = [newFormErrors.nameError, newFormErrors.surnameError, newFormErrors.dobError];
        } else if (activeStep === 1) {
            newFormErrors.emailError = await validateEmail(formData.email);
            newFormErrors.passwordError = await validatePassword(formData.password);
            errors = [newFormErrors.emailError, newFormErrors.passwordError];
        } else if (activeStep === 2) {
            newFormErrors.flowerError = await validateFlower(formData.flower);
            errors = [newFormErrors.flowerError];
        }

        valid = !errors.some(error => !!error);
        setFormErrors(newFormErrors);

        if (valid) {
            setSubmittedSteps([...submittedSteps, activeStep]);
            if (activeStep === stepContents.length - 1) {
                setShowSuccessAlert(true);
                setTimeout(() => {
                    navigate('/welcome', {state: formData});
                }, 2000);
            } else {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }
        }

        setIsLoading(false);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const stepContents = [
        {
            label: 'Insert your data',
            component: <Step1
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
            />
        },
        {
            label: 'Enter your email and choose a password',
            component: <Step2
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
            />
        },
        {
            label: 'Choose your favorite flower',
            component: <Step3
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
            />
        },
    ];

    return (
        <div className="flex justify-center items-center">
            <Box className="flex-1" sx={{maxWidth: '600px', margin: '24px', marginBottom: '24px'}}>
                {isMobile ? (
                    <>
                        {stepContents[activeStep].component}
                        <MobileStepper
                            variant="dots"
                            steps={stepContents.length}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={isNextDisabled || isLoading}
                                >
                                    {isLoading ? 'Loading...' : activeStep === stepContents.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                >
                                    Back
                                </Button>
                            }
                        />
                    </>
                ) : (
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {stepContents.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step.label}</StepLabel>
                                <StepContent>
                                    {step.component}
                                    <Box sx={{textAlign: 'center', mt: 2}}>
                                        <Button
                                            onClick={handleBack}
                                            sx={{mr: 1}}
                                            disabled={activeStep === 0}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            disabled={isNextDisabled || isLoading}
                                        >
                                            {isLoading ? 'Loading...' : activeStep === stepContents.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                )}
                {showSuccessAlert && <Alert severity="success">Data saved!</Alert>}
            </Box>
        </div>
    );
};

export default Form;
