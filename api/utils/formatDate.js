/**
 * Formats a date object into a string
 * @param {*} date 
 * @returns 
 */
const formatDate = (date) => {
    if (!(date instanceof Date)) {
        return 'Invalid date';
    }

    // Array of months to convert month number to month name
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let prefix;

    // Determine the prefix for the date
    switch(date.getDate()) {
        case 1:
        case 21:
        case 31:
            prefix = "st"
            break;
        case 2:
        case 22:
            prefix = "nd"
            break;
        case 3:
        case 23:
            prefix = "rd"
            break;
        default:
            prefix = "th";
    }

    // Return the formatted date
    return `${date.getDate()}${prefix} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

module.exports = formatDate;