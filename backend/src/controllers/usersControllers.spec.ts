import { registerUser } from "./usersControllers";

const request = require('supertest');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const {dbhelper} = require('./usersControllers'); // Import your actual database helper module

jest.mock('bcrypt');
jest.mock('./usersControllers');

describe('registerUser Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const mockRequest = {
      body: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        password: 'securepassword',
      },
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };

    const mockUserId = 'mock-user-id';
    const mockHashedPassword = 'mock-hashed-password';

    // Mocking database queries
    dbhelper.query.mockResolvedValueOnce({ recordset: [] }); // Mock email check
    dbhelper.query.mockResolvedValueOnce({ recordset: [] }); // Mock phone_number check
    dbhelper.execute.mockResolvedValueOnce({/* your expected result here */ });

    // Mocking bcrypt.hash
    bcrypt.hash.mockResolvedValueOnce(mockHashedPassword);

    await registerUser(mockRequest, mockResponse);

    expect(dbhelper.query).toHaveBeenCalledTimes(2);
    expect(dbhelper.execute).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
    });
  });

  // Add more test cases for error scenarios, duplicate email, duplicate phone_number, etc.
});
