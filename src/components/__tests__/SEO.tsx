import React from 'react';
import { render } from '@testing-library/react';

import { PureSEO } from '../SEO';

test('renders without crashing', () => {
  render(<PureSEO title="Smoke Test" titleTemplate="%s - Foobar" />);
});
