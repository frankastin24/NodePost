module.exports = (string) => {
    const firstLetter = string[0].toUpperCase();

    return firstLetter + string.slice(1,string.length);
}