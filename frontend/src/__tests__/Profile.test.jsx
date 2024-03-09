import { render } from '@testing-library/react';
import Profile from '../components/SettingsPage/Profile';


it('profile form renders', () => {
    const { queryByRole } = render(
        <Profile></Profile>
    );

    expect(queryByRole('form')).toBeDefined();
    expect(queryByRole('input')).toBeDefined();
    expect(queryByRole('InputLabel')).toBeDefined();
    expect(queryByRole('Selection')).toBeDefined();
});

it('submit button renders', () => {
    const { queryByRole } = render(
        <Profile></Profile>
    );
    expect(queryByRole('button')).toBeDefined();
});

