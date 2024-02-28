const validateName = (name) => /^[A-Za-z\s]+$/.test(name) ? true : false;

const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? true : false;

const validatePassword = (password) => password.match(/^[A-Za-z]\w{7,}$/) ? true : false;