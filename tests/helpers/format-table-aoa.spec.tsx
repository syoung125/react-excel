import { formatTableAOA } from '../../src';
import { mockTableData } from '../mocks';

describe('formatTableAOA', () => {
  const mock = mockTableData();
  it('returns proper table data format', () => {
    const result = formatTableAOA(mock.data, mock.columns);
    expect(result).toEqual(mock.result);
  });
});
