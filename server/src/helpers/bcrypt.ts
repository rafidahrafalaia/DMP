import bcrypt from 'bcryptjs';

function hash(password: string) {
    return bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT));
}

function compare(inputPassword: string, hashed: string) {
    return bcrypt.compareSync(inputPassword, hashed);
}

export {
    hash, compare,
};
