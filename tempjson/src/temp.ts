import fs from 'fs';
const html = fs.readFileSync('remote.txt', 'utf8');
console.log('HTML Preview:', html.slice(0, 200)); // ดูแค่ 200 ตัวอักษรพอ