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
    const [redirect, setRedirect] = useState(false);
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
        if (redirect) {
            navigate('/welcome', {state: formData});
        }
    }, [redirect, navigate, formData]);

    useEffect(() => {
        const updateNextStep = () => {
            let nextDisabled = false;
            if (activeStep === 0) {
                nextDisabled = !formData.name || !formData.surname || !!formErrors.nameError || !!formErrors.surnameError || !!formErrors.dobError;
            } else if (activeStep === 1) {
                nextDisabled = !formData.email || !formData.password || !!formErrors.emailError || !!formErrors.passwordError;
            } else if (activeStep === 2) {
                nextDisabled = !formData.flower || !!formErrors.flowerError;
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

        try {
            if (activeStep === 0) {
                const nameValidationResult = await validateName(formData.name);
                const surnameValidationResult = await validateSurname(formData.surname);
                const dobValidationResult = await validateDateOfBirth(formData.dob);
                newFormErrors.nameError = nameValidationResult.valid ? '' : nameValidationResult.message;
                newFormErrors.surnameError = surnameValidationResult.valid ? '' : surnameValidationResult.message;
                newFormErrors.dobError = dobValidationResult.valid ? '' : dobValidationResult.message;
                errors = [newFormErrors.nameError, newFormErrors.surnameError, newFormErrors.dobError];
            } else if (activeStep === 1) {
                const emailValidationResult = await validateEmail(formData.email);
                const passwordValidationResult = await validatePassword(formData.password);
                newFormErrors.emailError = emailValidationResult.valid ? '' : emailValidationResult.message;
                newFormErrors.passwordError = passwordValidationResult.valid ? '' : passwordValidationResult.message;
                errors = [newFormErrors.emailError, newFormErrors.passwordError];
            } else if (activeStep === 2) {
                const flowerValidationResult = await validateFlower(formData.flower);
                newFormErrors.flowerError = flowerValidationResult.valid ? '' : flowerValidationResult.message;
                errors = [newFormErrors.flowerError];
            }

            valid = !errors.some(error => !!error);
            setFormErrors(newFormErrors);

            if (valid) {
                setSubmittedSteps([...submittedSteps, activeStep]);
                if (activeStep === stepContents.length - 1) {
                    setShowSuccessAlert(true);
                    setRedirect(true);
                } else {
                    setActiveStep(prevActiveStep => prevActiveStep + 1);
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsLoading(false);
        }
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
