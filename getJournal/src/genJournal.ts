import * as fs from "fs";
import * as path from "path";
import { getFormat, Task } from "./getFormat";

// 1) รายชื่อไฟล์
const files = ["task_06.json", "task_07.json", "task_08.json"];

// 2) โครงสร้างข้อมูลรายวัน
interface Day {
    date: string;
    tasks: Task[];
}

interface result_date {
    date: string;
    result: result_task[];
}
interface result_task {
    env?:string;
    sys:string;
    task: string;
    task1: string;
    task2: string;
}
function formatThaiDate(dateStr: string): string {
    const months = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const [year, month, day] = dateStr.split("-").map(Number);
    const buddhistYear = year + 543;
    return `วันที่ ${day} ${months[month - 1]} ${buddhistYear}`;
}
function readDaysFromFile(jsonFile: string): Day[] {
    const filePath = path.join(__dirname, jsonFile);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Day[];
}

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
                for (const task of day.tasks) {
                    const [line1, line2] = getFormat(task);
                    result.result.push({sys:task.sys!, task: task.task!, task1: line1, task2: line2 ,env:task.enviornment!});
                }
            }
            answer.push(result);
        }

        // ---------- output by date ----------
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
        const outputPath = path.join(__dirname, `${file.replace(".json", "")}_result.txt`);
        fs.writeFileSync(outputPath, finalOutput, "utf-8");
        console.log(`File written: ${outputPath}`);

        // ---------- output by task ----------
        const taskMap: Record<string, { task1: string; dates: { date: string; lines: string[] }[] }> = {};

        for (const day of answer) {
            for (const task of day.result) {
                if (!taskMap[task.task]) {
                    taskMap[task.task] = {
                        task1: task.task1, // เอาไว้โชว์เป็น output1
                        dates: []
                    };
                }
                // หา date object เดิม
                let dateObj = taskMap[task.task].dates.find(d => d.date === day.date);
                if (!dateObj) {
                    dateObj = { date: day.date, lines: [] };
                    taskMap[task.task].dates.push(dateObj);
                }
                if (task.task === "upload"){
                    dateObj.lines.push(`${task.task2} บนระบบ ${task.sys}`)
                }
                else if (task.task === "runbatch"){
                    dateObj.lines.push(`${task.task2} บน environment ${task.env}`)
                }
                else{
                     dateObj.lines.push(task.task2); // เก็บ task1 ไว้
                }
               
            }
        }

        const outputTasks: string[] = [];
        for (const [taskName, taskInfo] of Object.entries(taskMap)) {
            let block = `==== TASK: ${taskName} ====\n`;
            block += `Output1: ${taskInfo.task1}\n\nOutput2:\n`;

            for (const d of taskInfo.dates) {
                block += formatThaiDate(d.date) + ":\n";;
                block += d.lines.map(line => `- ${line}`).join("\n") + "\n\n";
            }

            outputTasks.push(block);
        }

        const finalOutput2 = outputTasks.join("\n");
        const outputPath2 = path.join(__dirname, `${file.replace(".json", "")}_output2.txt`);
        fs.writeFileSync(outputPath2, finalOutput2, "utf-8");
        console.log(`File written: ${outputPath2}`);
    }
}

main();
