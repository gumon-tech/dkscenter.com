const courseTh = {
  title: 'Fundamental Kubernetes',
  duration: '1 วัน, 09:00 - 17:00',
  overview:
    'คอร์ส Fundamental Kubernetes เป็นการเรียนรู้เกี่ยวกับพื้นฐานของ Kubernetes ซึ่งเป็นระบบจัดการคลัสเตอร์และการจัดการคอนเทนเนอร์อย่างเป็นทางการ ผู้เรียนจะได้เรียนรู้เกี่ยวกับความสามารถของ Kubernetes, วิธีการทำงานของระบบ, โครงสร้างของ Cluster, การจัดการกับสถานะของ Container, การจัดการเครือข่ายและการใช้งานเครื่องมือต่าง ๆ ในการจัดการกับ Kubernetes',
  objectives: [
    'เพื่อให้ผู้เรียนมีความเข้าใจเกี่ยวกับพื้นฐานของ Kubernetes และความสามารถของระบบ',
    'เพื่อให้ผู้เรียนสามารถสร้างและจัดการกับ Cluster ของตนเองด้วย Kubernetes',
    'เพื่อให้ผู้เรียนเข้าใจเกี่ยวกับการจัดการกับสถานะของ Container, การทำ Load Balancing, และการ Scaling ของแอปพลิเคชัน',
  ],
  whoShouldAttend: [
    'นักพัฒนาซอฟต์แวร์ที่สนใจในการศึกษาเกี่ยวกับการจัดการคลัสเตอร์และการจัดการคอนเทนเนอร์',
    'วิศวกร DevOps ที่ต้องการทำความเข้าใจในการใช้งาน Kubernetes เพื่อการจัดการและดูแลระบบ',
    'ผู้ดูแลระบบที่สนใจในการเรียนรู้เกี่ยวกับการจัดการคลัสเตอร์และการจัดการคอนเทนเนอร์',
    'ผู้ที่สนใจเรียนรู้เกี่ยวกับเครื่องมือและเทคโนโลยีที่ใช้ในการจัดการคลัสเตอร์และการจัดการคอนเทนเนอร์',
  ],
  prerequisites: [
    'พื้นฐานเกี่ยวกับระบบปฏิบัติการ Linux',
    'การใช้งาน Command Line Interface (CLI)',
    'ความรู้พื้นฐานการใช้งาน Docker',
  ],
  participantsWillReceive: [
    'Cloud Server (VM) ท่านละ 3 เครื่อง (1 Master and 2 Nodes) เพื่อใช้ประกอบการอบรม',
    'เอกสารคู่มือการอบรม',
    'อาหารกลางวันและอาหารว่าง',
    'ใบรับรองผ่านการอบรมหลักสูตร Fundamental Kubernetes',
    'การดูแลเอาใจใส่เป็นอย่างดีจากวิทยากรและทีมงาน Staff',
    'สามารถเข้าร่วม Fundamental Kubernetes Workshop ซ้ำได้ไม่จำกัดจำนวนครั้ง (จำกัดสิทธิ์เข้าร่วมซ้ำ 5 ท่านต่อรอบการอบรม หากท่านต้องการเข้าร่วม Workshop ซ้ำ กรุณาติดต่อ Facebook Page, Line, Email หรือช่องทางอื่น ๆ เพื่อสำรองที่นั่ง)',
    'หากท่านไม่สะดวกเข้าร่วมการอบรมในครั้งนี้ ท่านสามารถเลื่อนการเข้าร่วมอบรมได้ตามตารางการอบรม',
  ],
  outline: [
    {
      title: 'What? When? Where?',
      descriptions: [
        'Kubernetes คืออะไร?',
        'มีความสามารถอย่างไร?',
        'ควรใช้เมื่อไร?',
        'กรณีศึกษา',
      ],
    },
    {
      title: 'Going back in time',
      descriptions: [
        'วิธีการ Deploy และจัดการกับ Container ก่อนที่จะมีสิ่งที่เรียกว่า Kubernetes พร้อมศึกษาปัญหาและวิธีรับมือแบบเดิม',
      ],
    },
    {
      title: 'Kubernetes Concepts and Overview',
      descriptions: [
        'Understanding Concepts',
        'ความสามารถในการเข้ามาจัดการกับปัญหาต่าง ๆ',
      ],
    },
    {
      title: 'Cluster Architecture',
      descriptions: [
        'Architecture ของ Cluster',
        'ความแต่งต่างระหว่างการทำงานแบบ Cluster และ Container แบบเดิม',
        'nodes, pods, and services คืออะไร',
      ],
    },
    {
      title: 'Workshop 1 - Building Your Own Cluster',
      descriptions: [
        'ทอดสอบสร้าง Cluster และเพิ่ม Node ใน Cluster นั้น พร้อมทั้งลองสร้าง Pods และ Service แบบง่าย ๆ',
      ],
    },
    {
      title: 'Storage, Containers and Workloads',
      descriptions: [
        'รู้จักการทำงานและองค์ประกอบของ Containers และ Workload',
        'กรณีศึกษา',
      ],
    },
    {
      title: 'Workshop 2 - Deploying an Easy App with Deployments',
      descriptions: ['ทดสอบ Deploy App ง่ายๆ ด้วยการใช้งาน Kubernetes Deployments'],
    },
    {
      title: 'Workshop 3 - Deploying the App with StatefulSets',
      descriptions: [
        'ทดสอบการ Deploy App ด้วย Kubernetes StatefulSets',
        'ศึกษาข้อแตกต่างระหว่าง Deployment และ StatefulSets',
      ],
    },
    {
      title: 'Services, Load Balancing, and Networking',
      descriptions: [
        'รู้จักกับเครื่องมือในการจัดการเส้นทางของ Network และการกำหนดค่าเพื่อให้สามารถเข้าถึง Application ที่เราได้ Deploy ไว้',
      ],
    },
    {
      title: 'Workshop 4 - Point to my services 1',
      descriptions: [
        'ทดสอบการเข้าถึง Web Application ผ่านการทำหนดค่าใน Kubernetes และ DNS จากภายนอก',
      ],
    },
    {
      title: 'Workshop 5 - Point to my services 2',
      descriptions: [
        'ทดสอบการกำหนดค่าและสิทธิ์การเข้าถึง การจำกัดเส้นทาง Network รวมถึงการทำ Load balancing ใน Cluster',
      ],
    },
    {
      title: 'Workshop 6 - HPA and K6',
      descriptions: [
        'ทดสอบสร้าง HPA และใช้เครื่องมือการทดสอบเพื่อดูผลลัพธ์ของการตั้งค่า',
      ],
    },
    {
      title: 'Configuration',
      descriptions: [
        'รู้จักกับการตั้งค่า การส่งค่าผ่าน Parameter ต่างๆ ใน Kubernetes พร้อมทั้ง Best Practice',
      ],
    },
    {
      title: 'Workshop 7 - Testing Your Configuration',
      descriptions: [
        "Testing Configuration Settings and Parameter Passing Following Kubernetes Officials' Recommendations",
      ],
    },
  ],
  documents: [
    {
      title: 'Fundamental Kubernetes Outline (English Version)',
      fileUrl: '/course/2024-002/document/fundamental-kubernetes-en.pdf',
    },
    {
      title: 'Fundamental Kubernetes Outline (Thai Version)',
      fileUrl: '/course/2024-002/document/fundamental-kubernetes-th.pdf',
    },
  ],
};

export default courseTh;
