export const convertToOriginalFormat = (dateString) => {
    const [day, monthAbbr] = dateString.split(' ');

    const months = {
        'ene': 0,
        'feb': 1,
        'mar': 2,
        'abr': 3,
        'may': 4,
        'jun': 5,
        'jul': 6,
        'ago': 7,
        'sep': 8,
        'oct': 9,
        'nov': 10,
        'dic': 11
    };

    const month = months[monthAbbr];
    const currentYear = new Date().getFullYear();

    if (month === undefined || isNaN(day)) {
        throw new Error('Fecha inválida');
    }

    const formattedDate = new Date(currentYear, month, day);

    if (isNaN(formattedDate)) {
        throw new Error('Fecha inválida');
    }

    return formattedDate.toISOString().split('T')[0];
}
