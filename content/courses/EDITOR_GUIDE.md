# Editor Guide

คู่มือนี้สำหรับผู้ดูแลคอนเทนต์คอร์สของ DKS Center

เป้าหมายคือช่วยให้แก้ข้อมูลได้ถูกไฟล์ โดยไม่ต้องเข้าใจ implementation ภายในทั้งหมด

## แก้อะไร ต้องเปิดไฟล์ไหน

ถ้าต้องการแก้:

- ข้อความภาษาไทย:
  - `content/courses/locales/<courseKey>/th.js`
- ข้อความภาษาอังกฤษ:
  - `content/courses/locales/<courseKey>/en.js`
- รอบอบรม วันเวลา สถานที่ ลิงก์ลงทะเบียน:
  - `content/courses/schedules/<courseKey>.js`
- รูปคอร์ส รหัสคอร์ส แบรนด์ เปิด/ปิดคอร์ส:
  - `content/courses/shared/<courseKey>.js`

## หลักง่าย ๆ

- ถ้าเป็น "ข้อความที่คนอ่านเห็น" ให้แก้ที่ `locales`
- ถ้าเป็น "วันเวลา / สถานที่ / รอบอบรม / ลิงก์สมัคร" ให้แก้ที่ `schedules`
- ถ้าเป็น "ข้อมูลคอร์สกลาง" ให้แก้ที่ `shared`

## โครงสร้างไฟล์

```text
content/courses/
  shared/
  locales/
  schedules/
```

## ตัวอย่างงานที่พบบ่อย

### 1. แก้เฉพาะภาษาไทย

เช่น:
- ชื่อคอร์สภาษาไทย
- overview ภาษาไทย
- outline ภาษาไทย

ให้เปิด:
- `content/courses/locales/<courseKey>/th.js`

### 2. แก้เฉพาะภาษาอังกฤษ

เช่น:
- title ภาษาอังกฤษ
- objectives ภาษาอังกฤษ

ให้เปิด:
- `content/courses/locales/<courseKey>/en.js`

### 3. เพิ่มรอบอบรมใหม่

เช่น:
- วันที่เรียน
- เวลาสอน
- สถานที่
- ลิงก์ Eventpop

ให้เปิด:
- `content/courses/schedules/<courseKey>.js`

แล้วเพิ่ม object ใหม่ใน array ของ schedules

### 4. เปลี่ยนรูปคอร์ส

ให้เปิด:
- `content/courses/shared/<courseKey>.js`

แล้วแก้ `imageUrl`

## คำเตือนสำคัญ

- อย่าใส่ข้อความภาษาไทยหรืออังกฤษไว้ใน `shared`
- อย่าแก้วันเวลาอบรมในไฟล์ `locales`
- อย่าแก้ overview หรือ outline ในไฟล์ `schedules`
- ถ้าไม่แน่ใจว่า field ควรอยู่ไฟล์ไหน ให้ใช้กฎนี้:
  - ข้อความ = `locales`
  - รอบอบรม = `schedules`
  - ข้อมูลกลาง = `shared`

## ก่อนบันทึกงานทุกครั้ง

เช็กว่า:
- แก้ถูกภาษาแล้ว
- แก้ถูกคอร์สแล้ว
- ถ้าเพิ่มรอบใหม่ มี `eventStart` และ `eventEnd` ครบ
- ถ้ามีลิงก์สมัคร ให้เช็ก `ticketUrl`
- ถ้ารอบนั้นเป็น onsite / online / hybrid และรู้แน่ชัด ให้ใส่ `deliveryMode`

## ถ้าไม่แน่ใจ

ให้ถาม developer ก่อนในกรณีต่อไปนี้:
- ต้องเพิ่ม field ใหม่ที่ไม่เคยมี
- ต้องเปลี่ยนโครงสร้างข้อมูล
- ไม่แน่ใจว่าข้อมูลนี้ควรอยู่ shared หรือ locales
- route ของคอร์สดูผิดปกติ
