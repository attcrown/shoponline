import { DateTime } from 'luxon'
import { Timestamp } from 'firebase/firestore';

export function formatDatetime(dateSend ,timeSend) {
    const date = dateSend
    const time = timeSend

    if (!date || !time) return
    // แปลงวันที่ yyyy-MM-dd
    const dateFormat = DateTime.fromISO(date).toFormat('yyyy-MM-dd');
    // สร้างวันเวลาท้องถิ่น
    const isoDateTime = DateTime.fromISO(`${dateFormat}T${time}:00`);

    return isoDateTime
}

export function checkDateNow() {
    const timestampFromFirestore = Timestamp.now();
    // Convert Firestore Timestamp to milliseconds
    const milliseconds = timestampFromFirestore.toMillis();
    // Convert milliseconds to DateTime object in the desired timezone
    const dateTimeInBangkok = DateTime.fromMillis(milliseconds, { zone: 'Asia/Bangkok' });
    return dateTimeInBangkok
}

export function formatTimestamp(timestampSend) {
    const timestamp = timestampSend
    if(timestamp === null) return '-'
    // dd/mm/yyyy hh:mm:ss
    const date = DateTime.fromMillis(timestamp.toMillis(),{zone: 'Asia/Bangkok'}).toFormat('dd/MM/yyyy HH:mm:ss');
    return date
}

export function formatTimestampFirebase(timestamp) {
    const timestampFrom = timestamp
    const milliseconds = timestampFrom.toMillis();
    const dateTimeInBangkok = DateTime.fromMillis(milliseconds, { zone: 'Asia/Bangkok' });
    return dateTimeInBangkok
}