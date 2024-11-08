export function compareDates(date1, date2) {
    const firstDate = new Date(date1);

    const secondDate = new Date(date2.split('T')[0]);

    if (secondDate > firstDate) {
        return 'future';
    } else {
        return 'daily';
    }
}