export function formatDateToDMY(dateString) {
    if (!dateString) {
        return 'Fecha no válida'
    }

    const date = new Date(Date.parse(dateString + 'T00:00:00'))
    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('es-ES', options)

    return formattedDate;
}
