import { validateEmailFormat, checkCredentials } from '../src';

describe('Utility functions', () => {
    describe('validateEmailFormat()', () => {
        it('should return true for valid email', () => {
            expect(validateEmailFormat('test@example.com')).toBe(true);
            expect(validateEmailFormat('user.name+tag@sub.domain.co')).toBe(true);
        });

        it('should return false for invalid email', () => {
            expect(validateEmailFormat('no-at-symbol.com')).toBe(false);
            expect(validateEmailFormat('missing-domain@')).toBe(false);
            expect(validateEmailFormat('')).toBe(false);
        });
    });

    describe('checkCredentials()', () => {
        it('should return true for correct credentials', () => {
            expect(checkCredentials('user@example.com', 'password123')).toBe(true);
        });

        it('should return false for wrong email', () => {
            expect(checkCredentials('wrong@domain.com', 'password123')).toBe(false);
        });

        it('should return false for wrong password', () => {
            expect(checkCredentials('user@example.com', 'wrongpass')).toBe(false);
        });

        it('should return false if both wrong', () => {
            expect(checkCredentials('wrong@domain.com', 'wrongpass')).toBe(false);
        });
    });
});
