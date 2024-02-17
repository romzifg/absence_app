exports.generateCode = () => {
    let result = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const stringLength = string.length;
    let counter = 0;
    while (counter <= 5) {
        result += string.charAt(Math.floor(Math.random() * stringLength));
        counter += 1;
    }

    return result;
}