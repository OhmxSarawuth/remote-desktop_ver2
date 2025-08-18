import * as fs from "fs";
import * as path from "path";
import { getFormat, Task } from "./getFormat";

// 1) รายชื่อไฟล์
const files = ["task_06.json", "task_07.json", "task_08.json"];

// 2) โครงสร้างข้อมูลรายวัน
interface Day {
    date: string;
    tasks: Task[]; // แก้เป็น Task[] แทน unknown[]
}

interface result_date {
    date: string;
    result: result_task[];
}
interface result_task {
    task1: string;
    task2: string;
}

// 3) ฟังก์ชันอ่านไฟล์ JSON → Day[]
function readDaysFromFile(jsonFile: string): Day[] {
    const filePath = path.join(__dirname, jsonFile);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Day[];
}

// 4) main
function main() {
    for (const file of files) {
        console.log(`\n=== FILE: ${file} ===`);
        const days = readDaysFromFile(file);
        const answer: result_date[] = [];

        for (const day of days) {
            const result: result_date = {
                date: day.date,
                result: []
            };

            if (day.tasks?.length > 0) {
                console.log(`- วันที่: ${day.date} (tasks: ${day.tasks.length})`);
                for (const task of day.tasks) {
                    // ส่ง task object เข้า getFormat โดยตรง
                    const [line1, line2] = getFormat(task);
                    result.result.push({ task1: line1, task2: line2 });
                }
            }

            answer.push(result);
        }

        // สร้าง string ของทุกวัน
        const outputDays: string[] = [];

        for (const day of answer) {
            const task1Lines = day.result
                .map((task, index) => `ลำดับที่ ${index + 1}: ${task.task1}`)
                .join("\n");

            const task2Lines = day.result
                .map((task, index) => `ลำดับที่ ${index + 1}: ${task.task2}`)
                .join("\n");

            const dayString = `///////// วันที่ : ${day.date} /////\n\n${task1Lines}\n\n${task2Lines}\n`;
            outputDays.push(dayString);
        }

        const finalOutput = outputDays.join("\n");

        // เขียนไฟล์ txt ทีเดียว
        const outputPath = path.join(__dirname, `${file.replace(".json", "")}_result.txt`);
        fs.writeFileSync(outputPath, finalOutput, "utf-8");
        console.log(`File written: ${outputPath}`);
    }
}

main();
