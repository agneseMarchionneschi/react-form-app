export const validateName = async (name: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!name.trim()) resolve('Name is required');
            else if (!/^[a-zA-Z]+$/.test(name.trim())) resolve('Invalid characters in name');
            else resolve('');
        }, 500);
    });
};

export const validateSurname = async (surname: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!surname.trim()) resolve('Last name is required');
            else if (!/^[a-zA-Z]+$/.test(surname.trim())) resolve('Invalid characters in last name');
            else resolve('');
        }, 500);
    });
};

export const validateEmail = async (email: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!email.trim()) resolve('Email is required');
            else if (!/\S+@\S+\.\S+/.test(email.trim())) resolve('Invalid email format');
            else resolve('');
        }, 500);
    });
};

export const validatePassword = async (password: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!password.trim()) resolve('Password is required');
            else resolve('');
        }, 500);
    });
};

export const validateDateOfBirth = async (dob: string | null): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (dob) {
                const dobDate = new Date(dob);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                if (dobDate >= currentDate) {
                    resolve('Insert a valid date of birth');
                } else {
                    resolve('');
                }
            } else {
                resolve('');
            }
        }, 500);
    });
};


export const validateFlower = async (flower: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!flower.trim()) resolve('Favorite flower is required');
            else resolve('');
        }, 500);
    });
};


