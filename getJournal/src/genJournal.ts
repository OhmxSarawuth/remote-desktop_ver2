// loop-files-and-days.ts
import * as fs from "fs";
import * as path from "path";

// 1) รายชื่อไฟล์
const files = ["task_06.json", "task_07.json", "task_08.json"];

// 2) โครงสร้างข้อมูลรายวัน
interface Day {
    date: string;
    tasks: unknown[];
}

// 3) ฟังก์ชันอ่านไฟล์ JSON → Day[]
function readDaysFromFile(jsonFile: string): Day[] {
    const filePath = path.join(__dirname, jsonFile);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Day[];
}

// 4) วนไฟล์ → วนวัน
function main() {
    for (const file of files) {
        console.log(`\n=== FILE: ${file} ===`);
        const days = readDaysFromFile(file);

        for (const day of days) {

            if (day.tasks?.length > 0) {
                console.log(`- วันที่: ${day.date} (tasks: ${day.tasks?.length || 0})`);
                for (const task of day.tasks) {
                    const data = JSON.stringify(task);
                    
                }
            }
            // (ตอนถัดไป: ค่อย for-loop tasks ภายในวันนี้)
        }
    }
}

main();
