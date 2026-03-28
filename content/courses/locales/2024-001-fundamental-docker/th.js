const courseTh = {
  title: 'Fundamental Docker',
  duration: '1 วัน, 09:00 - 17:00',
  overview:
    'คอร์ส Fundamental Docker เป็นการเรียนรู้เกี่ยวกับพื้นฐานของ Docker ซึ่งเป็นเทคโนโลยีที่ใช้กับการคอนเทนเนอร์ได้อย่างมีประสิทธิภาพ ผู้เรียนจะได้เรียนรู้เกี่ยวกับการใช้งาน Linux, คำสั่งพื้นฐานของ Linux, การใช้งานตัวแก้ไขข้อความ VIM, และการทำงานกับ Docker ในระดับพื้นฐานและขั้นตอนการสร้างและจัดการคอนเทนเนอร์ และการใช้งาน Docker Compose เพื่อจัดการกับหลายบริการพร้อมกัน',
  objectives: [
    'เพื่อให้ผู้เรียนมีความเข้าใจเกี่ยวกับพื้นฐานของ Docker และการทำงานของระบบคอนเทนเนอร์',
    'เพื่อให้ผู้เรียนสามารถใช้งาน Docker ในการสร้างและจัดการคอนเทนเนอร์ได้อย่างมีประสิทธิภาพ',
    'เพื่อให้ผู้เรียนสามารถใช้งาน Docker Compose เพื่อจัดการกับหลายบริการพร้อมกัน',
  ],
  whoShouldAttend: [
    'นักพัฒนาซอฟต์แวร์ที่ต้องการเรียนรู้เกี่ยวกับการใช้ Docker เพื่อการพัฒนาแอปพลิเคชัน',
    'วิศวกร DevOps ที่ต้องการทำความเข้าใจในการใช้งาน Docker เพื่อการจัดการสภาพแวดล้อมและการทำงานร่วมกันในทีม',
    'ผู้ดูแลระบบที่สนใจในการใช้ Docker เพื่อการจัดการและดูแลระบบ',
    'ผู้ที่สนใจเรียนรู้เกี่ยวกับการใช้งานคอนเทนเนอร์และการจัดการระบบคอมพิวเตอร์ในสถานการณ์ที่ต้องการการยืดหยุ่นและประหยัดทรัพยากร',
  ],
  prerequisites: [
    'พื้นฐานเกี่ยวกับระบบปฏิบัติการ Linux',
    'การใช้งาน Command Line Interface (CLI)',
  ],
  participantsWillReceive: [
    'Cloud Server (VM) ท่านละ 1 เครื่อง เพื่อใช้ประกอบการอบรม',
    'เอกสารคู่มือการอบรม',
    'อาหารกลางวันและอาหารว่าง',
    'ใบรับรองผ่านการอบรมหลักสูตร Fundamental Docker',
    'การดูแลเอาใจใส่เป็นอย่างดีจากวิทยากรและทีมงาน Staff',
    'สามารถเข้าร่วม Fundamental Docker Workshop ซ้ำได้ไม่จำกัดจำนวนครั้ง (จำกัดสิทธิ์เข้าร่วมซ้ำ 5 ท่านต่อรอบการอบรม หากท่านต้องการเข้าร่วม Workshop ซ้ำ กรุณาติดต่อ Facebook Page, Line, Email หรือช่องทางอื่น ๆ เพื่อสำรองที่นั่ง)',
    'หากท่านไม่สะดวกเข้าร่วมการอบรมในครั้งนี้ ท่านสามารถเลื่อนการเข้าร่วมอบรมได้ตามตารางการอบรม',
  ],
  outline: [
    {
      title: 'พื้นฐาน Linux',
      descriptions: [
        'Directory structure',
        'Linux Commands',
        'Using VIM Text Editor',
        'Using GIT Version Control',
        'Workshop 1 - Basic web deploy',
        'Workshop 2 - Deploy with Nginx',
      ],
    },
    {
      title: 'What is Docker?',
      descriptions: [
        'Container Technology',
        'Containers and VM',
        'Docker Architecture',
      ],
    },
    {
      title: 'Docker Basic Commands',
      descriptions: [
        'Workshop 3 - Images Management',
        'Workshop 4 - Running Containers',
        'Workshop 5 - Reverse Proxy',
      ],
    },
    {
      title: 'Docker Compose',
      descriptions: [
        'Workshop 6 - Docker Compose File',
        'Workshop 7 - Running Compose Services',
        'Workshop 8 - Build image with Docker file',
      ],
    },
  ],
  documents: [
    {
      title: 'Fundamental Docker Outline (English Version)',
      fileUrl: '/course/2024-001/document/2024-001-fundamental-docker-en.pdf',
    },
    {
      title: 'Fundamental Docker Outline (Thai Version)',
      fileUrl: '/course/2024-001/document/2024-001-fundamental-docker-th.pdf',
    },
  ],
};

export default courseTh;
