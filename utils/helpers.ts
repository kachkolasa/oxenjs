export const generateRandomId = () => {
    const length = 20;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Checking if the first character is a number
    // If so, replace it with a random letter
    if(result.charAt(0).match(/[0-9]/)){
        result = result.replace(result.charAt(0), characters.charAt(Math.floor(Math.random() * characters.length)));
    }

    return result;
}