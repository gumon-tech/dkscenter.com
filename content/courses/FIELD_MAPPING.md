# Field Mapping Guide

เอกสารนี้อธิบายว่า field แต่ละตัวควรอยู่ในไฟล์ประเภทใดในโครงสร้างคอร์สใหม่

โครงสร้างเป้าหมาย:

- `shared/<courseKey>.js`
- `locales/<courseKey>/en.js`
- `locales/<courseKey>/th.js`
- `schedules/<courseKey>.js`

## กฎสั้นที่สุด

- ถ้าเป็นข้อมูลกลางของคอร์สและไม่ต้องแปล: `shared`
- ถ้าเป็นข้อความที่ผู้ใช้เห็นและต้องเขียน/แปล: `locales`
- ถ้าเป็นข้อมูลระดับรอบอบรม: `schedules`

## Shared Fields

ใช้กับข้อมูลที่ควรใช้ร่วมกันทุกภาษา

| Field | อยู่ที่ไหน | เหตุผล |
| --- | --- | --- |
| `key` | `shared` | เป็น identity หลักของคอร์ส |
| `code` | `shared` | เป็นรหัสคอร์สกลาง |
| `brand` | `shared` | ปกติไม่เปลี่ยนตามภาษา |
| `isActive` | `shared` | เป็นสถานะระดับคอร์ส |
| `imageUrl` | `shared` | โดยทั่วไปใช้ภาพเดียวกัน |
| `lastUpdate` | `shared` | เป็น metadata กลาง |
| `detailUrl` | `shared` | เป็น route metadata ของคอร์ส |
| `slug` | `shared` | เป็น identifier กลาง |
| `id` | `shared` | ถ้ายังจำเป็นในระบบ |
| `defaultDeliveryMode` | `shared` | optional fallback ระดับคอร์สในอนาคต |
| `tags` | `shared` | ถ้ามี ใช้เป็น metadata กลาง |
| `category` | `shared` | ถ้ามี ใช้เป็น metadata กลาง |

### หมายเหตุ

ห้ามใส่ข้อความ overview, title, objectives หรือ outline ไว้ใน `shared`

## Localized Fields

ใช้กับข้อมูลที่ editor ต้องแปลหรือเขียนแยกตามภาษา

| Field | อยู่ที่ไหน | เหตุผล |
| --- | --- | --- |
| `title` | `locales/en`, `locales/th` | ชื่อคอร์สเป็นข้อความผู้ใช้เห็น |
| `overview` | `locales/en`, `locales/th` | เป็น editorial copy |
| `duration` | `locales/en`, `locales/th` | wording อาจต่างตามภาษา |
| `objectives` | `locales/en`, `locales/th` | เป็นเนื้อหาการเรียนรู้ |
| `whoShouldAttend` | `locales/en`, `locales/th` | เป็นข้อความเฉพาะภาษา |
| `audience` | compatibility only | ไม่ควรเป็น source หลักถ้ายังมี `whoShouldAttend` |
| `prerequisites` | `locales/en`, `locales/th` | เป็นข้อความเฉพาะภาษา |
| `participantsWillReceive` | `locales/en`, `locales/th` | เป็นข้อความเฉพาะภาษา |
| `outline` | `locales/en`, `locales/th` | เป็น long-form editorial structure |
| `curriculum` | `locales/en`, `locales/th` | ถ้ายังใช้จริงใน UI |
| `documents` | `locales/en`, `locales/th` | ถ้าชื่อหรือไฟล์เอกสารแยกตามภาษา |
| `seoTitle` | `locales/en`, `locales/th` | ถ้ามีในอนาคต |
| `seoDescription` | `locales/en`, `locales/th` | ถ้ามีในอนาคต |
| `faq` | `locales/en`, `locales/th` | ถ้ามีในอนาคต |
| `heroCopy` | `locales/en`, `locales/th` | ถ้ามีข้อความเฉพาะหน้า |

### Canonical Rule

ให้ใช้ `whoShouldAttend` เป็น canonical field หลัก  
ถ้าระบบเดิมยังต้องใช้ `audience` ให้ map compatibility ตอน normalize แทน

## Schedule Fields

ใช้กับข้อมูลระดับ "รอบอบรม" เท่านั้น

| Field | อยู่ที่ไหน | เหตุผล |
| --- | --- | --- |
| `publicSchedule` | `schedules` | เป็นกลุ่มข้อมูลรอบอบรม |
| `scheduleKey` | `schedules` | ระบุตัวตนของแต่ละรอบ |
| `title` | `schedules` | ชื่อรอบอบรม |
| `eventStart` | `schedules` | วันเวลาเริ่ม |
| `eventEnd` | `schedules` | วันเวลาจบ |
| `saleStart` | `schedules` | วันเวลาเริ่มขาย |
| `saleEnd` | `schedules` | วันเวลาปิดขาย |
| `isActive` | `schedules` | สถานะต่อรอบ |
| `isSoldOut` | `schedules` | สถานะต่อรอบ |
| `ticketUrl` | `schedules` | ลิงก์สมัครต่อรอบ |
| `location` | `schedules` | สถานที่อาจต่างกันในแต่ละรอบ |
| `locationUrl` | `schedules` | map link ต่อรอบ |
| `deliveryMode` | `schedules` | onsite / online / hybrid ต่อรอบ |
| `capacity` | `schedules` | ถ้ามีในอนาคต |
| `notes` | `schedules` | ถ้ามีในอนาคต |
| `registrationMode` | `schedules` | ถ้ามีในอนาคต |

### หมายเหตุ

ห้ามเก็บวันเวลาอบรมไว้ใน `locales` หรือ `shared`  
เพราะ schedule เป็นข้อมูลที่เปลี่ยนบ่อยและควรแยกจาก long-form content

## Documents Rule

`documents` เป็น field ที่ต้องตัดสินใจตามการใช้งานจริง

### ให้เก็บใน `locales` ถ้า:

- title เอกสารต้องแปล
- EN/TH เป็นคนละไฟล์
- URL เอกสารแยกตามภาษา

### ให้เก็บใน `shared` ได้ ถ้า:

- title ใช้เหมือนกันทุกภาษา
- ไฟล์เดียวกันทุกภาษา
- เป็น asset กลางจริง

### Recommendation

ถ้าไม่แน่ใจ ให้เก็บ `documents` ไว้ใน `locales` ก่อน  
เพราะปลอดภัยกับ editorial workflow มากกว่า

## Runtime Compatibility Fields

field ต่อไปนี้อาจยังต้องมีใน normalized output เพื่อให้ UI เดิมไม่พัง

| Runtime Field | Source ใหม่ | หมายเหตุ |
| --- | --- | --- |
| `audience` | derive from `whoShouldAttend` | compatibility alias |
| `curriculum` | derive from `outline` หรือ localized source | ตามพฤติกรรมเดิม |
| `publicSchedule` | `schedules` | contract เดิมของ UI |
| `language` | derive from locale | runtime only |
| `locale` | derive from locale | runtime only |
| `slug` | shared | runtime identifier |

## Fields That Should Not Be Duplicated

ควรหลีกเลี่ยงการเก็บ field เดียวกันซ้ำหลายที่

| Field | หลีกเลี่ยงการซ้ำที่ไหน |
| --- | --- |
| `code` | อย่าใส่ซ้ำใน locale files |
| `brand` | อย่าใส่ซ้ำใน locale files |
| `imageUrl` | อย่าใส่ซ้ำใน locale files |
| `title` | อย่าใส่ใน shared |
| `overview` | อย่าใส่ใน shared |
| `location` | อย่าใส่ใน locales |
| `eventStart` / `eventEnd` | อย่าใส่ใน locales |
| `ticketUrl` | อย่าใส่ใน shared |

## Default / Fallback Rules

Normalization ควรใช้กฎต่อไปนี้:

| Field | Fallback |
| --- | --- |
| `objectives` | `[]` |
| `whoShouldAttend` | `[]` |
| `prerequisites` | `[]` |
| `participantsWillReceive` | `[]` |
| `outline` | `[]` |
| `documents` | `[]` |
| `publicSchedule` | `[]` |
| `scheduleKey` | generate from courseKey + eventStart |
| `deliveryMode` | optional |
| `detailUrl` | fallback to default locale if needed |

## Quick Decision Examples

### Example 1

"เปลี่ยนคำโปรย overview ภาษาไทย"
- ไปที่ `locales/<courseKey>/th.js`

### Example 2

"เพิ่มรอบอบรมเดือนพฤศจิกายน"
- ไปที่ `schedules/<courseKey>.js`

### Example 3

"เปลี่ยนรูปปกคอร์ส"
- ไปที่ `shared/<courseKey>.js`

### Example 4

"คอร์สนี้รอบล่าสุดเป็น onsite"
- ตั้ง `deliveryMode: 'onsite'` ใน session นั้นที่ `schedules`

## Final Recommendation

ใช้หลักนี้ทุกครั้ง:

- Shared = metadata กลาง
- Locales = เนื้อหาแปลภาษา
- Schedules = ข้อมูลรอบอบรม

ถ้าต้องเลือกระหว่าง `shared` กับ `locales` แล้วไม่แน่ใจ:
- ถ้า editor อาจอยากเขียน EN/TH ไม่เหมือนกันในอนาคต ให้เก็บใน `locales`
