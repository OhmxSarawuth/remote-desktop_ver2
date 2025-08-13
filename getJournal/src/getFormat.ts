// getFormat.ts
export type TaskObj = any; // ปรับตาม schema จริง

export function getFormat(task: TaskObj): { [key: string]: string } {
    let journal_day: { [key: string]: string } = {};

    switch (task.task) {
        case "upload":
            journal_day["งานที่ได้รับมอบหมาย"] = `Upload file ระบบ ${task.sys}`;
            journal_day["การดำเนินการ"] = `นำข้อมูล file จาก ${task.src} ไปที่เครื่อง server ${task.des} ตาม path ที่กำหนด`;
            break;

        case "runbatch":
            journal_day["งานที่ได้รับมอบหมาย"] = `Run batch task ${task.task} ระบบ ${task.sys}`;
            journal_day["การดำเนินการ"] = `รัน batch task ตั้งแต่วันที่ ${task.start} ถึง ${task.end} ใน environment ${task.enviornment}`;
            break;

        case "import":
            journal_day["งานที่ได้รับมอบหมาย"] = `Import ข้อมูลใน environment ${task.env}`;
            journal_day["การดำเนินการ"] = `ทำการ import ข้อมูล${task.remark ? ` (${task.remark})` : ""}`;
            break;

        // เพิ่ม format อื่น ๆ ได้ที่นี่
        default:
            journal_day["งานที่ได้รับมอบหมาย"] = `Task ${task.task}`;
            journal_day["การดำเนินการ"] = `รายละเอียดไม่ระบุ`;
            break;
    }

    return journal_day;
}
