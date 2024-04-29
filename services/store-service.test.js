import { test , expect } from "vitest";
import { percenBlockWorking } from "./store-service";
import { formatDatetime} from "./formatDatetime";

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
    expect(result.status).toBe(true)
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
    expect(result.status).toBe(false)
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
    expect(result.status).toBe(true)
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
    expect(result.status).toBe(false)
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
    expect(result.status).toBe(true)
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
    expect(result.status).toBe(false)
})

