export const getDateList = (date) => {
    const currentDate = new Date(`${date}T00:00:00`);

    const setToMidnight = (d) => {
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    setToMidnight(previousDate);

    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setToMidnight(nextDate);

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    return [
        { previousDate: formatDate(previousDate) },
        { currentDate: formatDate(currentDate) },
        { nextDate: formatDate(nextDate) }
    ];
};
