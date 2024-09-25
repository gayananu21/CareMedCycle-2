// JavaScript to generate the calendar dynamically

const calendarDates = document.getElementById('calendar-dates');
const monthSelect = document.getElementById('month-select');
const yearSelect = document.getElementById('year-select');

// Sample journal entries data (you can replace with dynamic data)
const journalEntries = {
    '2023-09-02': [{ time: '10 AM', mood: 'positive', description: 'Feeling good' }],
    '2023-09-04': [{ time: '7 PM', mood: 'stressed', description: 'Stressed about work' }],
    '2023-09-06': [{ time: '8 AM', mood: 'neutral', description: 'Meditation' }],
    '2023-09-07': [{ time: '9 AM', mood: 'positive', description: 'Exercise' }],
};

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // 0-based index

// Populate years and months dropdown
function populateDropdowns() {
    for (let year = 2020; year <= currentYear + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = month;
        monthSelect.appendChild(option);
    });
}

// Generate calendar based on the selected year and month
function generateCalendar(year, month) {
    calendarDates.innerHTML = ''; // Clear previous dates

    const firstDay = new Date(year, month, 1).getDay(); // Get the first day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date');
        calendarDates.appendChild(emptyCell);
    }

    // Populate days with dates and journal entries
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');
        dateCell.textContent = day;

        const fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Add journal entries if available
        if (journalEntries[fullDate]) {
            journalEntries[fullDate].forEach(entry => {
                const journalDiv = document.createElement('div');
                journalDiv.classList.add('journal-entry');

                // Assign color based on mood
                if (entry.mood === 'positive') {
                    journalDiv.classList.add('entry-positive');
                } else if (entry.mood === 'stressed') {
                    journalDiv.classList.add('entry-stressed');
                } else {
                    journalDiv.classList.add('entry-neutral');
                }

                journalDiv.textContent = `${entry.time} - ${entry.description}`;
                dateCell.appendChild(journalDiv);
            });
        }

        calendarDates.appendChild(dateCell);
    }
}

// Event listeners for changing month and year
monthSelect.addEventListener('change', () => {
    generateCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
});

yearSelect.addEventListener('change', () => {
    generateCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
});

// Initialize the calendar
populateDropdowns();
yearSelect.value = currentYear;
monthSelect.value = currentMonth;
generateCalendar(currentYear, currentMonth);
