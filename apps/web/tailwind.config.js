import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/components/(avatar|breadcrumbs|button|card|divider|dropdown|input|kbd|link|listbox|modal|navbar|progress|radio|toggle|table|tabs|user|ripple|spinner|menu|popover|checkbox|spacer).js',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

