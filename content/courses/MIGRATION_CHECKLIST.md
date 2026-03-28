# Course Migration Checklist

ใช้ checklist นี้เมื่อต้องย้ายคอร์สจาก source เดิม ไปยังโครงสร้างใหม่แบบ:

- `shared`
- `locales`
- `schedules`

## ก่อนเริ่ม

- ระบุ `courseKey` ที่จะย้าย
- หา source เดิมของคอร์สที่จะย้ายให้ครบ

## ขั้นตอนย้าย

### 1. สร้างไฟล์ใหม่

สร้างไฟล์ต่อไปนี้:

- `content/courses/shared/<courseKey>.js`
- `content/courses/locales/<courseKey>/en.js`
- `content/courses/locales/<courseKey>/th.js`
- `content/courses/schedules/<courseKey>.js`

### 2. ย้าย shared metadata

ย้าย field กลุ่มนี้ไป `shared`:

- `key`
- `code`
- `brand`
- `isActive`
- `imageUrl`
- `lastUpdate`
- `detailUrl`

ตรวจว่า:
- ค่าพวกนี้ไม่ถูกเขียนซ้ำใน locale files โดยไม่จำเป็น

### 3. ย้าย English content

ย้าย field กลุ่มนี้ไป `locales/<courseKey>/en.js`:

- `title`
- `overview`
- `duration`
- `objectives`
- `whoShouldAttend`
- `prerequisites`
- `participantsWillReceive`
- `outline`
- `documents` ถ้าเป็นเอกสาร EN

### 4. ย้าย Thai content

ย้าย field กลุ่มนี้ไป `locales/<courseKey>/th.js`:

- `title`
- `overview`
- `duration`
- `objectives`
- `whoShouldAttend`
- `prerequisites`
- `participantsWillReceive`
- `outline`
- `documents` ถ้าเป็นเอกสาร TH

### 5. ย้าย schedules

ย้าย `publicSchedule[]` ทั้งหมดไป `schedules/<courseKey>.js`

ตรวจทุก session ว่ามี:
- `title`
- `eventStart`
- `eventEnd`
- `saleStart`
- `saleEnd`
- `isActive`
- `isSoldOut`
- `ticketUrl`
- `location`
- `scheduleKey`
- `deliveryMode` ถ้ารู้แน่ชัด

### 6. ลงทะเบียนใน registry

เพิ่มคอร์สใน:
- `content/courses/registry.js`

ตรวจว่า registry ชี้ถูกไฟล์:
- shared
- locales.en
- locales.th
- schedules

### 7. ตรวจ normalized output

ตรวจว่า output หลัง compose แล้ว ยังมี shape เดิม:

- `courseData.en`
- `courseData.th`
- `publicSchedule[]`
- `documents[]`

### 8. ตรวจ field compatibility

ถ้ามี field alias เดิม เช่น:
- `audience`
- `whoShouldAttend`

ให้แน่ใจว่า compatibility ยังอยู่ตามที่ UI/repository ต้องใช้

### 9. ตรวจ route compatibility

เช็กว่า:
- `courseKey` ไม่เปลี่ยน
- `scheduleKey` ไม่หาย
- route เดิมยังอ้างถึงคอร์สนี้ได้

### 10. remove superseded source

เมื่อย้ายเสร็จและตรวจครบแล้ว:
- ลบ source เดิมที่ไม่ใช้แล้ว
- ให้ `registry.js` ชี้เฉพาะ split files เท่านั้น

## Validation Checklist

หลังย้ายแล้ว ต้องเช็กอย่างน้อย:

- EN page ยังมี title/overview ครบ
- TH page ยังมี title/overview ครบ
- schedules ยังแสดงครบ
- documents ยังอยู่ครบ
- คอร์สยัง active/inactive ถูกต้อง
- image ยังถูก path
- route ไม่เปลี่ยน
- session key ไม่พัง

## ความผิดพลาดที่พบบ่อย

- ลืมย้าย `lastUpdate`
- ลืมย้าย `documents`
- เอา `location` ไปไว้ locale file
- เอา `overview` ไปไว้ shared
- ย้าย session ไม่ครบทุก object
- ลืมลง registry
- ใช้ `courseKey` ไม่ตรงกับของเดิม

## Definition of Done

ถือว่าย้ายคอร์สเสร็จเมื่อ:

- มี `shared`, `locales/en`, `locales/th`, `schedules`
- registry ถูกอัปเดต
- normalized output เหมือน contract เดิม
- route compatibility ยังอยู่
- ไม่มี field สำคัญหาย
