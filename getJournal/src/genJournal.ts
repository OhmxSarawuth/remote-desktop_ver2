// genJournal.ts
import fs from 'fs'
import path from "path";
import { getFormat } from "./getFormat";

type TaskFile = {
    date: string;
    tasks: any[];
};

// Path folder ที่เก็บ task JSON
const TASK_FOLDER = "./tasks"; 

async function genJournal() {
    // อ่านทุกไฟล์ task_[xx].json
    const files = fs.readdirSync(TASK_FOLDER).filter(f => f.startsWith("task_") && f.endsWith(".json"));

    let journalAll: { date: string, journal: { [key: string]: string }[] }[] = [];

    for (const file of files) {
        const filePath = path.join(TASK_FOLDER, file);
        const data: TaskFile[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        for (const day of data) {
            let dailyJournal: { [key: string]: string }[] = [];

            for (const task of day.tasks) {
                const journalText = getFormat(task);
                dailyJournal.push(journalText);
            }

            journalAll.push({ date: day.date, journal: dailyJournal });
        }
    }

    // เขียนเป็นไฟล์ text แบบง่าย
    let outputText = "";
    for (const day of journalAll) {
        outputText += `=== วันที่: ${day.date} ===\n`;
        day.journal.forEach((j, idx) => {
            outputText += `งาน ${idx + 1}:\n`;
            outputText += `- งานที่ได้รับมอบหมาย: ${j["งานที่ได้รับมอบหมาย"]}\n`;
            outputText += `- การดำเนินการ: ${j["การดำเนินการ"]}\n`;
        });
        outputText += `\n`;
    }

    fs.writeFileSync("journal_output.txt", outputText, "utf-8");
    console.log("Write journal_output.txt เสร็จเรียบร้อย");
}

genJournal();
