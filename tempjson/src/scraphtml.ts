import * as cheerio from 'cheerio';
import * as fs from 'fs';

// โหลด HTML จากไฟล์
const html = `<table>${fs.readFileSync('remote.txt', 'utf8')}</table>`;
const $ = cheerio.load(html);

// เก็บผลลัพธ์ทั้งหมด
const result: any[] = [];

$('tr').each((i, tr) => {
  const row: string[] = [];
  $(tr).children('td').each((j, td) => {
    if ([0, 2, 4, 6].includes(j)) {
      row.push($(td).text().trim());
      console.log(`Row ${i + 1}, Cell ${j + 1}:`, $(td).text().trim());
    }
  });
  if (row.length > 0) {
    result.push(row);
    console.log(`Row ${i + 1} data:`, row);
    console.log('----------------------------');
  }
});

console.log(JSON.stringify(result, null, 2));
