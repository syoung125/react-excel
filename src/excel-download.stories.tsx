import React from 'react';

import { Story, Meta } from '@storybook/react';

import ExcelDownload from './excel-download';

export default {
  title: 'YourComponent',
  component: ExcelDownload,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story = () => <ExcelDownload />;

export const FirstStory = Template.bind({});
FirstStory.args = {};
