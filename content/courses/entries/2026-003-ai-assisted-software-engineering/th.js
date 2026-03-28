const courseTh = {
  brand: 'DKS Center',
  lastUpdate: '2026-03-29T12:00:00+0700',
  key: '2026-003-ai-assisted-software-engineering',
  locale: 'th',
  isActive: true,
  imageUrl: null,
  detailUrl:
    'https://dkscenter.gumon.io/th/course/2026-003-ai-assisted-software-engineering',
  title: 'AI-Assisted Software Engineering: Practical, Secure & Production-Ready',
  code: '2026-003',
  duration: '2 วัน (09:00 - 17:00)',
  overview:
    'หลักสูตรนี้ออกแบบเพื่อให้ Software Engineer สามารถใช้ AI เช่น ChatGPT, Copilot และ Codex ในการพัฒนา Software ได้อย่างมีประสิทธิภาพ พร้อมทั้งเข้าใจความเสี่ยงด้าน Security และสามารถควบคุมคุณภาพของระบบในระดับ Production ได้จริง ผู้เรียนจะได้เรียนรู้ผ่าน Workshop เป็นหลัก โดยครอบคลุมตั้งแต่การเขียน Prompt, การ generate code, การ review และ debug ไปจนถึงการตรวจสอบช่องโหว่และออกแบบ workflow ที่ปลอดภัย',
  objectives: [
    'ใช้ AI ใน workflow การพัฒนา Software ได้อย่างมีโครงสร้าง',
    'เขียน Prompt สำหรับงานจริงได้อย่างมีประสิทธิภาพ',
    'ตรวจสอบและปรับปรุง AI-generated code ได้',
    'เข้าใจข้อจำกัดของ LLM เช่น hallucination',
    'ป้องกันช่องโหว่ด้าน Security ที่เกิดจาก AI',
    'ออกแบบ Secure AI Workflow สำหรับองค์กร',
  ],
  whoShouldAttend: [
    'Software Engineer ทุกระดับ ตั้งแต่ Junior ถึง Senior',
    'Backend, Frontend และ Full-stack Developer',
    'Tech Lead และ Engineering Manager',
    'DevOps และ Platform Engineer',
    'ทีมพัฒนาที่มีการใช้ AI เช่น ChatGPT หรือ Copilot ในการทำงาน',
  ],
  prerequisites: [
    'มีพื้นฐานการเขียนโปรแกรม เช่น JavaScript, Python หรือภาษาอื่น',
    'เข้าใจพื้นฐานการพัฒนา Web หรือ API',
    'มีประสบการณ์ใช้ AI เบื้องต้น เช่น ChatGPT หรือ Copilot',
  ],
  participantsWillReceive: [
    'ใบรับรองผ่านการอบรมหลักสูตร AI-Assisted Software Engineering: Practical, Secure & Production-Ready',
    'เอกสารคู่มือการอบรมและเอกสารประกอบ Workshop',
    'การดูแลเอาใจใส่เป็นอย่างดีจากวิทยากรและทีมงาน Staff ตลอดการอบรม',
    'ประสบการณ์ลงมือทำจริงกับ workflow การพัฒนา Software แบบ AI-assisted',
    'แนวคิดด้าน secure development สำหรับการ review, test และปรับปรุงโค้ดที่ AI สร้างขึ้น',
    'เนื้อหาเชิง Workshop มากกว่า 70% ให้ผู้เรียนได้ฝึกกับสถานการณ์งานพัฒนาจริงอย่างต่อเนื่อง',
    'ได้ลงมือสร้างและปรับปรุง API รวมถึงฟีเจอร์ระดับ production โดยใช้ AI เป็นผู้ช่วยใน workflow',
    'มี Simulation การโจมตี เช่น Prompt Injection เพื่อให้เห็นความเสี่ยงด้าน Security จากการใช้ AI ในทางปฏิบัติ',
    'มี Capstone Project ที่รวมการเขียน Prompt, การพัฒนา, การทดสอบ, การ review และการส่งมอบงานอย่างปลอดภัยไว้ในโจทย์เดียว',
    'ได้แนวทางที่สามารถนำไปต่อยอดเป็น Secure AI Workflow สำหรับทีมและองค์กรได้จริง',
  ],
  outline: [
    {
      title: 'AI กับบทบาทในงาน Software Engineering',
      descriptions: [
        'ภาพรวมของ AI ใน Software Development Lifecycle',
        'หลักการทำงานของ LLM เช่น token, context และ prediction',
        'ข้อจำกัดของ AI เช่น hallucination และ pattern-based reasoning',
        'แนวคิด Vibe Coding เทียบกับ Structured AI Development',
      ],
    },
    {
      title: 'การเขียน Prompt สำหรับงานพัฒนา Software',
      descriptions: [
        'องค์ประกอบของ Prompt ที่ดี เช่น context, constraint และ output format',
        'เทคนิคการควบคุมคุณภาพผลลัพธ์จาก AI',
        'เปรียบเทียบ Prompt คุณภาพต่ำกับ Prompt คุณภาพสูง',
        'Workshop: ทดลองเขียน Prompt หลายรูปแบบกับโจทย์เดียวกันและวิเคราะห์ผลลัพธ์',
      ],
    },
    {
      title: 'AI-Assisted Development Workflow',
      descriptions: [
        'Workflow มาตรฐานตั้งแต่ requirement, design, code, review, test ไปจนถึง deploy',
        'แนวคิด Trust Boundary ระหว่างการตัดสินใจของมนุษย์กับผลลัพธ์จาก AI',
        'การแบ่งบทบาทระหว่าง Human และ AI ในงานพัฒนา',
        'Mini Project: ใช้ AI generate REST API และปรับปรุงให้พร้อมใช้งานจริง',
      ],
    },
    {
      title: 'การตรวจสอบและแก้ไขโค้ดจาก AI',
      descriptions: [
        'หลักการ review AI-generated code ด้าน logic',
        'การมองหา edge case และ error handling ที่ไม่สมบูรณ์',
        'การ debug ปัญหาที่เกิดจากโค้ดที่ AI สร้าง',
        'Workshop: วิเคราะห์โค้ดที่มี bug และช่องโหว่แล้วปรับปรุงให้ดีขึ้น',
      ],
    },
    {
      title: 'การทดสอบระบบด้วย AI',
      descriptions: [
        'การใช้ AI เพื่อช่วยสร้าง unit test',
        'การออกแบบ edge case และ negative case',
        'การประเมินคุณภาพและความครอบคลุมของ test',
        'Workshop: สร้าง test จากโค้ดที่พัฒนาในคลาส',
      ],
    },
    {
      title: 'Integrated Practice',
      descriptions: [
        'เพิ่ม feature ใหม่ด้วย AI-assisted workflow',
        'เพิ่ม validation และปรับปรุง error handling',
        'ขยาย test coverage ให้ครอบคลุมมากขึ้น',
        'ปรับคุณภาพ implementation ก่อนนำไปใช้งาน',
      ],
    },
    {
      title: 'ความปลอดภัยของ AI-Generated Code',
      descriptions: [
        'ความเสี่ยงด้าน Security ที่เกี่ยวข้องกับ AI-assisted software development',
        'ประเด็นด้านความปลอดภัยที่เชื่อมโยงกับ OWASP',
        'ช่องโหว่สำคัญ เช่น SQL Injection, XSS และ Broken Authentication',
        'ความเสี่ยงจาก Secret Leakage, Data Exposure และ Dependency Risk',
      ],
    },
    {
      title: 'Workshop การตรวจจับช่องโหว่',
      descriptions: [
        'วิเคราะห์ตัวอย่างโค้ดที่มีช่องโหว่',
        'ระบุความเสี่ยงทั้งเชิงเทคนิคและด้าน Security',
        'แก้ไข implementation ให้ปลอดภัยขึ้น',
        'ตรวจสอบผลลัพธ์หลังการปรับปรุง',
      ],
    },
    {
      title: 'Simulation การโจมตี AI',
      descriptions: [
        'พื้นฐานของ Prompt Injection',
        'Jailbreak Techniques และการหลบเลี่ยงข้อจำกัด',
        'Simulation แบบ attacker vs defender',
        'เรียนรู้วิธีลดความเสี่ยงจากพฤติกรรมที่ไม่ปลอดภัยของ AI',
      ],
    },
    {
      title: 'การออกแบบ Secure AI Workflow',
      descriptions: [
        'การออกแบบ Prompt ให้ปลอดภัยมากขึ้น',
        'การควบคุม context และขอบเขตของข้อมูล',
        'การ validate output ก่อนนำไปใช้งาน',
        'การกำหนด AI Usage Policy สำหรับทีมและองค์กร',
      ],
    },
    {
      title: 'Production Capstone Project',
      descriptions: [
        'พัฒนา feature ระดับ production โดยใช้ AI',
        'ใส่ input validation และ authentication หรือ authorization',
        'มี unit test และโครงสร้างโค้ดที่ปลอดภัย',
        'เตรียมงานสำหรับการ review และนำเสนอผลงาน',
      ],
    },
    {
      title: 'การนำเสนอผลงานและสรุป Best Practices',
      descriptions: [
        'นำเสนอผลงานจากโปรเจกต์',
        'รับ feedback จากผู้สอน',
        'สรุปแนวทางการใช้ AI ในงานวิศวกรรมซอฟต์แวร์อย่างปลอดภัยและใช้งานได้จริง',
        'ต่อยอดสู่การนำไปใช้ในทีมและองค์กร',
      ],
    },
  ],
  publicSchedule: [],
  documents: [],
};

export default courseTh;
