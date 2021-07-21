import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import faker from 'faker';

import { ExcelDownloadButton } from '../src';

import { mockAoaData } from './mocks';

describe('ExcelDownloadButton', () => {
  const fileName = faker.name.title();
  const fakeData = mockAoaData();

  it('renders excel download button component', () => {
    render(<ExcelDownloadButton fileName={fileName} data={fakeData} />);
    expect(screen.getByText('Excel Download')).toBeInTheDocument();
  });

  it('renders csv download button component', () => {
    render(
      <ExcelDownloadButton
        fileName={fileName}
        fileExtension="csv"
        data={fakeData}
      />
    );
    expect(screen.getByText('CSV Download')).toBeInTheDocument();
  });

  it('renders with style props', () => {
    render(
      <ExcelDownloadButton
        fileName={fileName}
        data={fakeData}
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
        fileName={fileName}
        data={fakeData}
        element={CustomElement}
        style={{ background: 'green', color: 'white' }}
      />
    );
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
