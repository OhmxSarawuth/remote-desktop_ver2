// getFormat.ts

export interface Task {
    task?: string;
    sys?: string;
    env?: string;
    remark?: string;
    option?: string;
    enviornment?: string;
    start?: string;
    end?: string;
    src?: string;
    des?: string;
    text1?: string;
    text2?: string;
}

export function getFormat(task: Task): [string, string] {
    let line1 = "";
    let line2 = "";

    if (task.task === "runbatch") {
        const startDate = new Date(task.start!);
        const endDate = new Date(task.end!);

        // หาจำนวนวันต่างกัน
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        line1 = `Run batch บนระบบ ${task.sys} ที่ environment ${task.enviornment}`;
        line2 = `ดำเนินการ run batch ตั้งแต่วันที่ ${task.start} ถึง ${task.end} เป็นระยะเวลา ${diffDays} วัน`;
    }
    else if (task.task === "import") {
        line1 = `ให้ Import Configuration บนระบบ CBS`;
        line2 = `ดำเนินการนำเข้าไฟล์ Configuration เข้าสู่ระบบ CBS ในทุก Environment (SIT และ UAT) โดยมีการสำรองข้อมูล (Backup) ก่อนดำเนินการ Import เเละ ทำการ ${task.remark}`;

    } else if (task.task === "runMat") {
        line1 = `Run Mat บนระบบ ${task.sys}`;
        line2 = `ดำเนินการ upload Mat file จากเครื่อง dev201.core ไปยังเครื่อง christmas101.int ตาม path เพื่อใช้ในการ run mat file`;

    } else if (task.task === "upload") {
        line1 = `ให้ นำส่ง file บนระบบ ${task.sys}`;
        line2 = `ดำเนินการ นำส่ง file จาก ${(task.src === "mail" ? "user ผ่าน mail" : `จากเครื่อง ${task.src}`)} ไปยัง ${(task.des === "mail" ? "user ผ่าน mail" : `เครื่อง ${task.des} ตาม path ที่กำหนด` )}`;

    } else if (task.task === "upload-payment") {
        line1 = `ให้ทำการ Upload Payment code`;
        line2 = `ดำเนินการนำคู่ code branch ไปทำการเข้าสูตร excel เเล้วทำการ query บนระบบ terminal จอดำ`;

    } else if (task.task === "update-gui") {
        line1 = `ให้ update image version ของระบบ ${task.sys}`;
        line2 = `ดำเนินการ update image version ของระบบ ${task.sys} พร้อมั้งทำการ restart service ให้ทำงานได้ตามปกติ `;

    } else if (task.task === "f1") {
        line1 = `เปิด f1 เรื่อง ${task.sys}`;
        line2 = `ดำเนินการสร้างคำขอ policies ${task.option} ของ ${task.sys} บนระบบ f1`;
        
    } else if (task.task === "certificate") {
        line1 = `ต่ออายุ Certificate `;
        line2 = `ดำเนินการ เปลี่ยน certificate บนระบบ ${task.src} ให้เป็น version ใหม่`;

    } else if (task.task === "reset") {
        line1 = `ให้ reset password ระบบ ${task.sys}`;
        line2 = `ดำเนินการ เข้า ระบบ ${task.sys} ด้วยสิทธิ admin เเล้วทำการ reset password ให้กับ user`;

    } else if (task.task === "auto") {
        line1 = `นำส่ง รายงาน auto Cr/Dr บนระบบ รับส่งข้อมูล`;
        line2 = `ดำเนินการ ซ่อม file ย้อนหลังตามคู่มือ เเล้วทำการนำส่งรายงาน auto Cr/Dr เข้าสู่ระบบรับส่งข้อมูลสาขา`;

    } else {
        // fallback: task ไม่ตรง case ที่เตรียมไว้
        line1 = task.text1 || "ไม่ระบุ Task";
        line2 = task.text2 || "ไม่มีรายละเอียดเพิ่มเติม";
    }

    return [line1, line2];
}
