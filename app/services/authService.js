const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || '12345';
const SALT_ROUNDS = 10;

class AuthService {
    static async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    static async comparePasswords(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    static generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );
    }

    static async register(email, password) {
        try {
            const user = await userRepository.findByEmail(email);
            if (user) {
                throw new Error('Email already registered');
            }

            const hashedPassword = await this.hashPassword(password);
            const newUser = await userRepository.create({
                email,
                password: hashedPassword
            });

            return {
                id: newUser.id,
                email: newUser.email,
                token: this.generateToken(newUser)
            };
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    static async login(email, password) {
        try {
            const user = await userRepository.findByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await this.comparePasswords(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            return {
                id: user.id,
                email: user.email,
                token: this.generateToken(user)
            };
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

}

module.exports = AuthService;