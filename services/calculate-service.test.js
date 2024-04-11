import {test , expect} from 'vitest'
import { 
    priceCalculate ,
    unitCalculate ,
    dateCalculate
} from './calculate-service'
import { formatDatetime } from './formatDatetime';

test('Number', () => {
    const price = 100
    const discount = 10
    const countItems = 1

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(90)
})

test('String', () => {
    const price = '100'
    const discount = '10'
    const countItems = 3

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(270)
})

test('Float', () => {
    const price = '100.00'
    const discount = '10'
    const countItems = 2

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(180)
})

test('Float1', () => {
    const price = '100.50'
    const discount = '10'
    const countItems = 1

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(90.45)
})

test('Float1 0', () => {
    const price = '100.50'
    const discount = '10'
    const countItems = 0

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(90.45)
})

test('Float1 10', () => {
    const price = '100.50'
    const discount = '10'
    const countItems = 10

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(904.5)
})

test('Float 10', () => {
    const price = '100'
    const discount = undefined
    const countItems = 10

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(1000)
})

test('Float 10', () => {
    const price = '100'
    const discount = undefined
    const countItems = undefined

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(100)
})

test('undefined', () => {
    const price = undefined
    const discount = 7
    const countItems = 10

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(0)
})

test('null', () => {
    const price = 1000
    const discount = null
    const countItems = null

    const result = priceCalculate(price, discount ,countItems)
    expect(result).toBe(1000)
})

test('unitCalu', () => {
    const price = 1000
    const countItems = 6

    const result = unitCalculate(price ,countItems)
    expect(result).toBe(6000)
})

test('unitCalu text', () => {
    const price = '1000'
    const countItems = '6'

    const result = unitCalculate(price ,countItems)
    expect(result).toBe(6000)
})

test('unitCalu text', () => {
    const price = ''
    const countItems = ''

    const result = unitCalculate(price ,countItems)
    expect(result).toBe(0)
})

test('unitCalu text', () => {
    const price = '5'
    const countItems = '5'

    const result = unitCalculate(price ,countItems)
    expect(result).toBe(25)
})

test('unitCalu text null', () => {
    const price = '5'
    const countItems = null

    const result = unitCalculate(price ,countItems)
    expect(result).toBe(5)
})

test('unitCalu text null', () => {
    const price = null
    const countItems = 7

    const result = unitCalculate(price ,countItems)
    expect(result).toBe(0)
})

test('dateNow',async () => {
    const dates = ['2024-04-09','2024-04-10','2024-04-11','2024-04-12']
    const dateNow = formatDatetime('2024-04-11' ,'10:05')
    const timeFirst = '10:00'
    const timeEnd = '23:59'

    const result = await dateCalculate(dates ,timeFirst ,timeEnd , dateNow)

    expect(result.status).toEqual(true)
    expect(result.far.hours).toBe(13)
    expect(result.far.minutes).toBe(54)
})

test('dateNow 1',async () => {
    const dates = ['2024-04-09','2024-04-10','2024-04-11','2024-04-12']
    const dateNow = formatDatetime('2024-04-11' ,'10:05')
    const timeFirst = '10:00'
    const timeEnd = '10:30'

    const result = await dateCalculate(dates ,timeFirst ,timeEnd , dateNow)

    expect(result.status).toEqual(true)
    expect(result.far.hours).toBe(0)
    expect(result.far.minutes).toBe(25)
})

test('dateNow late',async () => {
    const dates = ['2024-04-09','2024-04-10','2024-04-13','2024-04-12']
    const dateNow = formatDatetime('2024-04-11' ,'10:05')
    const timeFirst = '10:00'
    const timeEnd = '10:30'

    const result = await dateCalculate(dates ,timeFirst ,timeEnd , dateNow)

    expect(result.status).toEqual(false)
    expect(result.far).toBeNull()
})

test('dateNow Null day',async () => {
    const dates = []
    const dateNow = formatDatetime('2024-04-11' ,'10:05')
    const timeFirst = '10:00'
    const timeEnd = '10:30'

    const result = await dateCalculate(dates ,timeFirst ,timeEnd , dateNow)

    expect(result.status).toEqual(false)
    expect(result.far).toBeNull()
})

test('dateNow Null day',async () => {
    const dates = ['2024-04-09','2024-04-10','2024-04-11','2024-04-12']
    const dateNow = null
    const timeFirst = '10:00'
    const timeEnd = '10:30'

    const result = await dateCalculate(dates ,timeFirst ,timeEnd , dateNow)

    expect(result.status).toEqual(false)
    expect(result.far).toBeNull()
})

test('dateNow Null day3',async () => {
    const dates = ['2024-04-09','2024-04-10','2024-04-11','2024-04-12']
    const dateNow = formatDatetime('2024-04-11' ,'10:05')
    const timeFirst = '1000'
    const timeEnd = 1030

    const result = await dateCalculate(dates ,timeFirst ,timeEnd , dateNow)

    expect(result.status).toEqual(true)
    expect(result.far.hours).toBe(0)
    expect(result.far.minutes).toBe(25)
})

test('dateNow Null day3',async () => {
    const dates = ['2024-04-09','2024-04-10','2024-04-11','2024-04-12']
    const dateNow = formatDatetime('2024-04-11' ,'10:05')
    const timeFirst = '23:00'
    const timeEnd = '10:00'

    const result = await dateCalculate(dates ,timeFirst ,timeEnd , dateNow)

    expect(result.status).toEqual(false)
    expect(result.far).toBeNull()
})