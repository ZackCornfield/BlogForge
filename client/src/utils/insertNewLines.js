const insertNewlines = (text) => {
    if (typeof text !== 'string') {
        return text;
    }
    return text.replaceAll("\r\n", "\n");
}

export default insertNewlines;