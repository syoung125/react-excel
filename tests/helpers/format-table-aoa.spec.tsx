import { formatTable } from '../../src';
import { mockTableData } from '../mocks';

describe('formatTable', () => {
  const mock = mockTableData();
  it('returns proper table data format', () => {
    const result = formatTable(mock.data, mock.columns);
    expect(result).toEqual(mock.result);
  });
});
