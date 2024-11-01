export const getNextFiveDays = (startDate) => {
    const daysList = [];
    const currentDate = new Date(`${startDate}T00:00:00`);
    daysList.push("Todas");

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };
    
    for (let i = 0; i < 6; i++) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + i);
        daysList.push(formatDate(newDate));
    }

    return daysList;
};
