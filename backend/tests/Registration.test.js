const pool = require('../database/pool');
const { registerUser } = require('../controllers/RegistrationPage'); 
const { mock } = require('jest-mock-extended');

jest.mock('../database/pool');

describe('registration controller', () => {
    const mockConnection = mock();
    const mockUser = {
        firstName: 'Butter',
        lastName: 'Chicken',
        email: 'vindaloo@email.com',
        password: 'pa55word',
        location: 'Wellington',
        gender: 'Male'
    };

    beforeEach(() => {
        jest.resetAllMocks();
        pool.getConnection.mockResolvedValue(mockConnection);
    });

    it('error if email already exists', async () => {
        mockConnection.query.mockResolvedValueOnce([{ count: 1 }]);
        await expect(registerUser(mockUser)).rejects.toThrow('An account with that email already exists');
    });

    it('registers a new user', async () => {
        mockConnection.query.mockResolvedValueOnce([{ count: 0 }]);
        mockConnection.query.mockResolvedValueOnce([{ insertId: 1 }]);
        const result = await registerUser(mockUser);
        expect(result).toEqual(1); // insertId
    });

    it('connection released when db error', async () => {
        mockConnection.query.mockRejectedValueOnce(new Error('DB error'));
        await expect(registerUser(mockUser)).rejects.toThrow('DB error');
        expect(mockConnection.release).toHaveBeenCalled();
    });
});
