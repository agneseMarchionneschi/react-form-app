# React Form App
This project showcases a multi-step form built with React, demonstrating form validation, responsiveness, and integration of modern styling frameworks.

## Project Overview
The form is divided into three steps, guiding users through the process of entering personal information, account details, and preferences.

### Step 1:
Users are prompted to enter their name, surname, and optionally their date of birth. I've implemented character checks for the name and surname fields, as well as validation for the date of birth to ensure data integrity.

### Step 2:
In this step, users are asked to provide their email address and choose a password. Email validation ensures that users enter email in the correct format.

### Step 3:
Users are presented with a selection of mock flowers from which to choose their favorite.
The form is designed to be responsive and adjusts seamlessly to fit various screen sizes, with a mobile-friendly slider layout for smaller devices.

## Key Features
- **Responsive Design:** The form is fully responsive, adjusting seamlessly to fit various screen sizes. On mobile devices, it transitions into a slider layout for a smooth user experience.
- **Custom Styling:** I've customized the theme of Material-UI and integrated Tailwind CSS classes for styling, resulting in a visually appealing and consistent user interface.
- **Validation:** Each step includes robust validation to ensure that users provide the necessary information in the correct format. Errors are clearly communicated to the user, preventing progression until issues are resolved.

## Live Demo
You can test the application yourself [here](https://stackblitz.com/~/github.com/agneseMarchionneschi/react-form-app?file=package.json:L1).

### Local Setup
To run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/agneseMarchionneschi/react-form-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd react-form-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Feedback and Contributions
If you have any questions, need further modifications, or would like to provide feedback, please feel free to reach out or submit an issue.
