import { hashPassword, verifyPassword, generateToken, verifyToken } from './utils';

describe('Auth Utils', () => {
    describe('Password Hashing', () => {
        it('should hash passwords', async () => {
            const password = 'testpassword123';
            const hash = await hashPassword(password);

            expect(hash).toBeDefined();
            expect(hash).not.toBe(password);
        });

        it('should verify correct passwords', async () => {
            const password = 'testpassword123';
            const hash = await hashPassword(password);

            const isValid = await verifyPassword(password, hash);
            expect(isValid).toBe(true);
        });

        it('should reject incorrect passwords', async () => {
            const password = 'testpassword123';
            const hash = await hashPassword(password);

            const isValid = await verifyPassword('wrongpassword', hash);
            expect(isValid).toBe(false);
        });
    });

    describe('JWT Tokens', () => {
        it('should generate valid tokens', () => {
            const payload = { userId: '123', email: 'test@example.com' };
            const token = generateToken(payload);

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });

        it('should verify valid tokens', () => {
            const payload = { userId: '123', email: 'test@example.com' };
            const token = generateToken(payload);

            const verified = verifyToken(token);
            expect(verified).toBeDefined();
            expect(verified?.userId).toBe('123');
            expect(verified?.email).toBe('test@example.com');
        });

        it('should reject invalid tokens', () => {
            const verified = verifyToken('invalid-token');
            expect(verified).toBeNull();
        });
    });
});
