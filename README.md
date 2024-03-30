# Habit Tracker App

The **Habit Tracker App** is a Vue.js application designed to help users track their daily habits. Users can view and manage their habits for specific dates, mark habits as completed, and track their progress over time.

## Features

-   **Date Selection**: Users can select a date to view and manage their habits for that specific date.
-   **Habit Management**: Add, remove, and mark habits as completed for the selected date.
-   **Dynamic Progress Bar**: Visual representation of the completion progress of habits for the selected date.
-   **Real-time Updates**: Habit completion status and progress bar update dynamically as users interact with the app.

## Technologies Used

-   **Vue.js**: Frontend framework for building user interfaces and single-page applications.
-   **LocalStorage**: Client-side storage used to persist habit data.
-   **CSS**: Styling the application for a better user experience.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/henriits/habit_tracker_vue.git 
    ```

2. Navigate to the project directory:

    ```
    cd habit-tracker
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Run the development server:

    ```
    npm run dev
    ```

5. Open your browser and visit `http://localhost:5173/` to view the application.

## Usage

1. **Select Date**: Use the date picker to select a date.
2. **Add Habits**: Enter the name of the habit in the input field and press Enter to add it to the list.
3. **Manage Habits**: Mark habits as completed by clicking the checkbox. Remove habits by clicking the "Remove" button.
4. **Track Progress**: Monitor your habit completion progress with the dynamic progress bar.
5. **Future Dates**: You cannot mark habits as complete for future dates.
