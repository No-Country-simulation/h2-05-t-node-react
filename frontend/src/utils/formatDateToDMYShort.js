export const formatDateToDMYShort = (date) => {
    let splitDate = date.split('-')
    return (splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0])
}