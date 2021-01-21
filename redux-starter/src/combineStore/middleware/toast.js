// type: "error",
// paylaod: { message: "An Error Occurred"}

const toast = (store) => (next) => (action) => {
  if (action.type === 'error') {
    console.log(`Toastify: ${action.payload.message}`);
  } else {
    next(action);
  }
};

export default toast;
