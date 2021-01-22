export const turnOn = () => {
    sendSignalA();
    sendSignalB();
    console.log("TV is on...");
}

// This is implementation details, 
// export const sendSignalA = (a, b) => {};
// export const sendSignalB = () => {};

const sendSignalA = () => {};
const sendSignalB = () => {};