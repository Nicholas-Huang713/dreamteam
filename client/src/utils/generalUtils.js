export const removeTextAfterWord = (inputString) => {
    // Split the inputString into an array of words
    const words = inputString.split(' ');

    // Find the index of the targetWord in the array
    // const targetIndex = words.indexOf('Getty Images');

    if (inputString.includes('Getty Images') && inputString.includes('[+413 chars]')) {
        // If the targetWord is found, slice the array up to that index
        const resultWords = words.slice(0, targetIndex + 1); // Add 1 to include the target word

        // Join the remaining words back into a string
        const resultString = resultWords.join(' ');

        return resultString;
    } else {
        // If the targetWord is not found, return the original inputString
        return inputString;
    }
}

