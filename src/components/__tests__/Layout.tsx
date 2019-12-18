import React from 'react';
import { render } from '@testing-library/react';

import Layout from '../Layout';

test('renders without crashing', () => {
  const { queryByText } = render(
    <Layout>
      <p>Smoke Test</p>
    </Layout>
  );
  expect(queryByText('Smoke Test')).toBeTruthy();
});
