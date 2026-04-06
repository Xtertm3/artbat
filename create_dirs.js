const fs = require('fs');
const path = require('path');

const base = 'c:\\Users\\ANKIT TIWARI\\Desktop\\artbat\\lssm-frontend\\src';
const dirs = [
  'types', 'config', 'lib', 'hooks', 'store', 'services', 'styles',
  'components/common', 'components/layout', 'components/auth', 'components/course',
  'components/student', 'components/instructor', 'components/admin', 'components/payment',
  'components/notifications',
  'pages/public', 'pages/auth', 'pages/student', 'pages/instructor', 'pages/admin',
  'pages/payment', 'pages/errors'
];

dirs.forEach(d => {
  const fullPath = path.join(base, d);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log('Created: ' + fullPath);
});

console.log('\nALL DONE - Listing contents of src directory:');
fs.readdirSync(base).forEach(item => console.log(item));
