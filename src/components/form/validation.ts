import { isEmail } from 'validator';

export interface ValidationResult {
    valid: boolean;
    message: string;
}

export const validateName = async (name: string): Promise<ValidationResult> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!name.trim()) resolve({ valid: false, message: 'Name is required' });
            else if (!/^[a-zA-Z]+$/.test(name.trim())) resolve({ valid: false, message: 'Invalid characters in name' });
            else resolve({ valid: true, message: 'Name is valid' });
        }, 500);
    });
};

export const validateSurname = async (surname: string): Promise<ValidationResult> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!surname.trim()) resolve({ valid: false, message: 'Last name is required' });
            else if (!/^[a-zA-Z]+$/.test(surname.trim())) resolve({ valid: false, message: 'Invalid characters in last name' });
            else resolve({ valid: true, message: 'Last name is valid' });
        }, 500);
    });
};

export const validateEmail = async (email: string): Promise<ValidationResult> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!email.trim()) resolve({ valid: false, message: 'Email is required' });
            else if (!isEmail(email.trim())) resolve({ valid: false, message: 'Invalid email format' });
            else resolve({ valid: true, message: 'Email is valid' });
        }, 500);
    });
};

export const validatePassword = async (password: string): Promise<ValidationResult> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!password.trim()) resolve({ valid: false, message: 'Password is required' });
            else resolve({ valid: true, message: 'Password is valid' });
        }, 500);
    });
};

export const validateDateOfBirth = async (dob: string | null): Promise<ValidationResult> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (dob) {
                const dobDate = new Date(dob);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                if (dobDate >= currentDate) {
                    resolve({ valid: false, message: 'Insert a valid date of birth' });
                } else {
                    resolve({ valid: true, message: 'Date of birth is valid' });
                }
            } else {
                resolve({ valid: true, message: '' });
            }
        }, 500);
    });
};

export const validateFlower = async (flower: string): Promise<ValidationResult> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!flower.trim()) resolve({ valid: false, message: 'Favorite flower is required' });
            else resolve({ valid: true, message: 'Flower is valid' });
        }, 500);
    });
};
