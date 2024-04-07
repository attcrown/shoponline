import { DateTime } from 'luxon'

export function formatDatetime(date ,time) {
    if (!date || !time) return
    // แปลงวันที่ yyyy-MM-dd
    const dateFormat = DateTime.fromISO(date).toFormat('yyyy-MM-dd');
    // สร้างวันเวลาท้องถิ่น
    const isoDateTime = DateTime.fromISO(`${dateFormat}T${time}:00`);

    return isoDateTime
}

export function checkDateNow(firebase) {
    const timestampFromFirestore = firebase.firestore.Timestamp.now();
    // Convert Firestore Timestamp to milliseconds
    const milliseconds = timestampFromFirestore.toMillis();
    // Convert milliseconds to DateTime object in the desired timezone
    const dateTimeInBangkok = DateTime.fromMillis(milliseconds, { zone: 'Asia/Bangkok' });
    return dateTimeInBangkok
}