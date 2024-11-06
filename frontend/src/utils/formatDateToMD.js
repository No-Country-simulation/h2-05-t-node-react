export const formatDateToMD = (dateString) => {
    const date = new Date(`${dateString}T12:00:00`);

    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('es-ES', options);
}
