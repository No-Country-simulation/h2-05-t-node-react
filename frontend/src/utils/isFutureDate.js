export const isFutureDate = (fecha1, fecha2) => {
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);

    return date2 > date1;
}