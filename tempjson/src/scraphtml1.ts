import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('remote.txt', 'utf8');
const $ = cheerio.load(html);

const result: any[] = [];

$('tr').each((index, tr) => {
  const tds = $(tr).find('td');

  // ข้ามถ้าแถวนี้ไม่มี td มากพอ
  if (tds.length < 5) return;
  console.log("eiei")
  // STEP: เตรียมตัวแยก field แต่ละช่อง
});

console.log(result);
