import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import RegistrationPage from '../components/RegistrationPage/Registration';
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

jest.mock('axios');

//test if registration page upon filling out of the form will invoke axios.post
describe('Registration page submission', () => {
    test('submits user registration data successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: {} });
        const { getByLabelText, getByText, container } = render(<MemoryRouter><RegistrationPage /></MemoryRouter>);
        fireEvent.change(getByLabelText(/first name/i), { target: { value: 'Butter' } });
        fireEvent.change(getByLabelText(/last name/i), { target: { value: 'Chicken' } });
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'butter@email.com' } });
      
        const passwordInput = container.querySelector('input[id="password"]');
        const reenterPasswordInput = container.querySelector('input[id="reenter-password"]');
        fireEvent.change(passwordInput, { target: { value: 'password1' } });
        fireEvent.change(reenterPasswordInput, { target: { value: 'password1' } });
      
        const select = getByLabelText('Primary Location');
        userEvent.click(select,  'Auckland' );
      
        const otherButton = getByText(/all/i);
        fireEvent.click(otherButton);

        const submitButton = getByText(/submit/i);
        fireEvent.click(submitButton);
        expect(axios.post)
    
      });
      
    });
