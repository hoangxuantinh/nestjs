import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = (plainPassword: string): string => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash
}


export const comparePassword = (plainPassword: string, hash: string) => {
    return bcrypt.compareSync(plainPassword, hash)
}














