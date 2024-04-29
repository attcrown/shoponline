import { test , expect } from "vitest";
import { percenBlockWorking } from "./store-service";
import { formatDatetime} from "./formatDatetime";
import { PENDING , WORKING , STOP } from "./const";

//formatTimestampFirebase(Timestamp.now())

test("percenBlockWorking test1", () => {
    const item = {
        createdAt: formatDatetime('2024-04-23' ,'10:00'),
        nowAt: formatDatetime('2026-04-23' ,'10:00'),
        contract: 1095,
        cost : 0.55,
        block : 50
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(WORKING)
    expect(result.percenStore).toBe(66)
    expect(result.farDay).toBe(365)
    expect(result.profitNow).toBe(481800)
    expect(result.profitAll).toBe(722700)
    expect(result.checkStartToNowDay.days).toBe(730)
})

test("percenBlockWorking test2", () => {
    const item = {
        createdAt: formatDatetime('2024-04-23' ,'10:00'),
        nowAt: formatDatetime('2024-03-23' ,'10:00'),
        contract: 1095,
        cost : 0.55,
        block : 50
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(PENDING)
})

test("percenBlockWorking test3", () => {
    const item = {
        createdAt: formatDatetime('2024-04-20' ,'10:00'),
        nowAt: formatDatetime('2024-04-28' ,'10:00'),
        contract: 10,
        cost : 0.55,
        block : 50
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(WORKING)
    expect(result.percenStore).toBe(80)
    expect(result.farDay).toBe(2)
    expect(result.profitNow).toBe(5280)
    expect(result.profitAll).toBe(6600)
    expect(result.checkStartToNowDay.days).toBe(8)
})

test("percenBlockWorking test4", () => {
    const item = {
        createdAt: formatDatetime('2024-04-20' ,'10:00'),
        nowAt: formatDatetime('2024-04-28' ,'10:00'),
        contract: -60,
        cost : 0.55,
        block : 50
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(STOP)
})


test("percenBlockWorking test5", () => {
    const item = {
        createdAt: formatDatetime('2024-04-20' ,'10:00'),
        nowAt: formatDatetime('2027-04-20' ,'09:00'),
        contract: 1095,
        cost : 0.55,
        block : 50
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(WORKING)
    expect(result.percenStore).toBe(99)
    expect(result.farDay).toBe(1)
    expect(result.profitNow).toBe(722672.5)
    expect(result.profitAll).toBe(722700)
    expect(result.checkStartToNowDay.days).toBe(1094)
})

test("percenBlockWorking test6", () => {
    const item = {
        createdAt: formatDatetime('2024-04-20' ,'10:00'),
        nowAt: formatDatetime('2027-04-20' ,'09:00'),
        contract: -1095,
        cost : -0.55,
        block : -50
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(STOP)
})

test("percenBlockWorking test7", () => {
    const item = {
        createdAt: formatDatetime('2024-04-20' ,'10:00'),
        nowAt: formatDatetime('2024-04-20' ,'10:00'),
        contract: 10,
        cost : 0.55,
        block : 1
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(WORKING)
    expect(result.percenStore).toBe(0)
    expect(result.farDay).toBe(0)
    expect(result.profitNow).toBe(0)
    expect(result.profitAll).toBe(132)
    expect(result.checkStartToNowDay.days).toBe(0)
})

test("percenBlockWorking test8", () => {
    const item = {
        createdAt: formatDatetime('2024-04-20' ,'10:00'),
        nowAt: formatDatetime('2024-04-10' ,'23:00'),
        contract: 10,
        cost : 0.55,
        block : 1
    }
    const result = percenBlockWorking(item)
    expect(result.status).toBe(PENDING)
})

test("percenBlockWorking test8", () => {
    const item = {
        createdAt: formatDatetime('2024-04-20' ,'10:00'),
        nowAt: formatDatetime('2024-01-10' ,'10:00'),
        contract: 10,
        cost : 0.55,
        block : 1
    }
    const result = percenBlockWorking(item)
    console.log(result)
    expect(result.status).toBe(PENDING)
})