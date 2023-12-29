import bcrypt from 'bcryptjs';

export const hashPassword = async (password, limit) => {
    return await bcrypt.hash(password, limit)
}