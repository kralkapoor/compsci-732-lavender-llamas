import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SettingsPage from '../components/SettingsPage/SettingsPage';

it('settings page renders correctly', () => {
    const { queryByText } = render(
        <MemoryRouter initialEntries={['/']}>
            < SettingsPage />
        </MemoryRouter>
    )

    expect(queryByText('SETTINGS')).toBeDefined();
});