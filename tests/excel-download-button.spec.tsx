import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ExcelDownloadButton } from '../src';

const MOCK_DATA = [
  ['name', 'height', 'weight'],
  ['Joe', 188, 87],
  ['Marry', 158, 54],
  ['Bob', 177, 78],
];
describe('ExcelDownloadButton', () => {
  it('renders excel download button component', () => {
    render(<ExcelDownloadButton fileName="new_file" data={MOCK_DATA} />);
    expect(screen.getByText('Excel Download')).toBeInTheDocument();
  });

  it('renders csv download button component', () => {
    render(
      <ExcelDownloadButton
        fileName="new_file"
        fileExtension="csv"
        data={MOCK_DATA}
      />
    );
    expect(screen.getByText('CSV Download')).toBeInTheDocument();
  });

  it('renders with style props', () => {
    render(
      <ExcelDownloadButton
        fileName="new_file"
        data={MOCK_DATA}
        style={{ background: 'green', color: 'white' }}
      />
    );
    expect(screen.getByRole('button')).toHaveStyle({
      background: 'green',
      color: 'white',
    });
  });

  it('renders with custom element', () => {
    const testId = 'custom-element';
    const CustomElement: React.ReactElement = (
      <label data-testid={testId}>Want to Download with Excel File?</label>
    );
    render(
      <ExcelDownloadButton
        fileName="new_file"
        data={MOCK_DATA}
        element={CustomElement}
        style={{ background: 'green', color: 'white' }}
      />
    );
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
