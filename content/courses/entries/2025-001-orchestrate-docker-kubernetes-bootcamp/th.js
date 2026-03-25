const courseTh = {
  brand: 'AC Academys',
  lastUpdate: '2026-02-08T16:31:00+0700',
  key: '2025-001-orchestrate-docker-kubernetes-bootcamp',
  locale: 'th',
  isActive: true,
  imageUrl: '/course/2025-001/poster/banner_resize_1.png',
  detailUrl:
    'https://dkscenter.gumon.io/th/course/2025-001-orchestrate-docker-kubernetes-bootcamp',
  title: 'Orchestrate - Docker & Kubernetes Bootcamp',
  code: '2025-001',
  duration: '2 วัน, 09:00 - 17:00',
  overview:
    'ในโลกที่การพัฒนาและการปรับใช้ซอฟต์แวร์มีการเปลี่ยนแปลงอย่างรวดเร็ว คอนเทนเนอร์ (Containers) ได้กลายมาเป็นพื้นฐานสำคัญของแนวปฏิบัติ DevOps สมัยใหม่ หลักสูตรเชิงปฏิบัติการเข้มข้น 2 วัน นี้ จะช่วยให้คุณมีพื้นฐานที่มั่นคงในการใช้งาน Docker และ Kubernetes ซึ่งเป็นเครื่องมือยอดนิยมสำหรับการจัดการและประสานคอนเทนเนอร์ หลักสูตรนี้ออกแบบมาเพื่อ นักพัฒนาโปรแกรม วิศวกร DevOps และสถาปนิกระบบ โดยผสมผสานทฤษฎีและการปฏิบัติจริงอย่างลงตัว',
  objectives: [
    'เข้าใจแนวคิดพื้นฐานของ คอนเทนเนอร์ และความแตกต่างจากเครื่องเสมือน (Virtual Machines)',
    'เรียนรู้คำสั่ง Docker เพื่อจัดการ คอนเทนเนอร์ และ อิมเมจ',
    'สร้าง Dockerfile และอิมเมจแบบกำหนดเองสำหรับแอปพลิเคชันของคุณ',
    'ใช้งาน Docker Compose เพื่อจัดการแอปพลิเคชันหลายคอนเทนเนอร์',
    'เข้าใจโครงสร้างและส่วนประกอบของ Kubernetes Cluster',
    'เรียนรู้การจัดการแอปพลิเคชันด้วย Pods, Deployments และ Services',
    'ทำความเข้าใจ Networking, Persistent Storage, และการใช้งาน ConfigMaps และ Secrets',
    'แนะนำการใช้งานขั้นสูง เช่น Helm และการตั้งค่า CI/CD Pipelines',
  ],
  whoShouldAttend: [
    'นักพัฒนาโปรแกรม ที่ต้องการพัฒนาแอปพลิเคชันให้มีความยืดหยุ่นและปรับขนาดได้',
    'วิศวกร DevOps ที่มุ่งเน้นการทำงานแบบอัตโนมัติและเพิ่มประสิทธิภาพในกระบวนการส่งมอบซอฟต์แวร์',
    'ผู้ดูแลระบบ (System Administrators) ที่ต้องการจัดการโครงสร้างพื้นฐานแบบสมัยใหม่',
  ],
  prerequisites: [
    'ความรู้พื้นฐานเกี่ยวกับ คำสั่ง Linux และ แนวคิดด้านเครือข่าย',
    'ความคุ้นเคยกับ การพัฒนาเว็บแอปพลิเคชัน จะช่วยให้เรียนได้เข้าใจเร็วขึ้น แต่ไม่จำเป็น',
  ],
  participantsWillReceive: [
    'เอกสารคู่มือการอบรม',
    'ใบรับรองผ่านการอบรมหลักสูตร Orchestrate - Docker & Kubernetes Bootcamp',
    'การดูแลเอาใจใส่เป็นอย่างดีจากวิทยากรและทีมงาน Staff',
    'สามารถเข้าร่วม Orchestrate - Docker & Kubernetes Bootcamp ซ้ำได้ไม่จำกัดจำนวนครั้ง (จำกัดสิทธิ์เข้าร่วมซ้ำ 5 ท่านต่อรอบการอบรม หากท่านต้องการเข้าร่วม Workshop ซ้ำ กรุณาติดต่อ Facebook Page, Line, Email หรือช่องทางอื่น ๆ เพื่อสำรองที่นั่ง)',
    'หากท่านไม่สะดวกเข้าร่วมการอบรมในครั้งนี้ ท่านสามารถเลื่อนการเข้าร่วมอบรมได้ตามตารางการอบรม',
    'ความมั่นใจในการพัฒนา ปรับใช้ และขยายระบบคอนเทนเนอร์',
    'ทักษะสำคัญสำหรับการสร้าง Microservices แบบ Cloud-Native',
    'ความรู้เพื่อเริ่มต้นสู่โลกของ DevOps และระบบอัตโนมัติบนคลาวด์',
  ],
  outline: [
    {
      title: 'Introduction to Containers and Docker',
      descriptions: [
        'Understanding Containers vs. Virtual Machines',
        'What is Docker, and why use it?',
        'Installing Docker (Windows, macOS, Linux)',
      ],
    },
    {
      title: 'Working with Docker Containers',
      descriptions: [
        'Docker Architecture and Components',
        'Docker CLI Commands: Pulling Images from Docker Hub',
        'Docker CLI Commands: Running and Stopping Containers',
        'Docker CLI Commands: Managing Container Lifecycle',
        'Hands-on: Running a Hello World Container',
        'Hands-on: Running Nginx or Node.js in a Container',
      ],
    },
    {
      title: 'Docker Images',
      descriptions: [
        'Understanding Docker Images and Layers',
        'Creating Docker Images with Dockerfiles',
        'Hands-on: Writing a Simple Dockerfile',
        'Hands-on: Building Custom Images',
        'Hands-on: Tagging and Pushing Images to Docker Hub',
      ],
    },
    {
      title: 'Docker Networking',
      descriptions: [
        'Networking Basics in Docker',
        'Bridge, Host, and Overlay Networks',
        'Hands-on: Linking Containers',
        'Hands-on: Creating a Custom Bridge Network',
      ],
    },
    {
      title: 'Docker Volumes and Persistent Storage',
      descriptions: [
        'Introduction to Volumes and Bind Mounts',
        'Managing Volumes',
        'Hands-on: Using Volumes to Persist Data',
      ],
    },
    {
      title: 'Docker Compose',
      descriptions: [
        'Overview of Docker Compose',
        'Writing a docker-compose.yml File',
        'Hands-on: Running Multi-Container Applications with Docker Compose',
      ],
    },
    {
      title: 'Introduction to Kubernetes',
      descriptions: [
        'Understanding Kubernetes Concepts',
        'Installing Minikube or Using Kubernetes in the Cloud',
      ],
    },
    {
      title: 'Kubernetes Components and Architecture',
      descriptions: [
        'Overview of Key Components: API Server, etcd, Scheduler, Controller Manager, kubelet',
        'Role of kubectl Command-Line Tool',
      ],
    },
    {
      title: 'Managing Pods and Deployments',
      descriptions: [
        'Creating and Managing Pods',
        'Deployments and ReplicaSets',
        'Hands-on: Creating a Deployment',
        'Hands-on: Scaling and Updating a Deployment',
      ],
    },
    {
      title: 'Services and Networking',
      descriptions: [
        'Service Types: ClusterIP, NodePort, LoadBalancer',
        'Ingress for HTTP/HTTPS Traffic',
        'Hands-on: Exposing a Deployment with a Service',
        'Hands-on: Setting up an Ingress Controller',
      ],
    },
    {
      title: 'ConfigMaps and Secrets',
      descriptions: [
        'Using ConfigMaps for Configuration',
        'Managing Sensitive Data with Secrets',
        'Hands-on: Creating and Using ConfigMaps',
        'Hands-on: Managing Secrets',
      ],
    },
    {
      title: 'Storage in Kubernetes',
      descriptions: [
        'Persistent Volumes and Persistent Volume Claims',
        'Storage Classes',
        'Hands-on: Using Persistent Volumes and Claims',
      ],
    },
  ],
  publicSchedule: [
    {
      title: 'Orchestrate - Docker & Kubernetes Bootcamp - 1/2025',
      eventStart: '2025-03-15T09:00:00+0700',
      eventEnd: '2025-03-16T17:00:00+0700',
      saleStart: '2025-02-15T09:00:00+0700',
      saleEnd: '2025-03-14T21:00:00+0700',
      isActive: true,
      isSoldOut: false,
      location:
        'Clazy Cafe The Seasons Mall @BTS สนามเป้า ทางออก 1 Bangkok, Thailand',
      scheduleKey: '',
      ticketUrl:
        'https://www.eventpop.me/e/74477/orchestrate-docker-kubernetes-bootcamp-1-2025',
    },
    {
      title: 'Orchestrate - Docker & Kubernetes Bootcamp - 1/2026',
      eventStart: '2026-05-16T09:00:00+07:00',
      eventEnd: '2026-05-17T17:00:00+07:00',
      saleStart: '2026-03-10T09:00:00+07:00',
      saleEnd: '2026-05-15T21:00:00+07:00',
      isActive: true,
      isSoldOut: false,
      location:
        'เอเชีย คอนเน็คท์ คอร์ปอเรชั่น, เขตลาดกระบัง, กรุงเทพมหานคร',
      locationUrl: 'https://maps.app.goo.gl/SZZsAHV1RtFawjM66',
      scheduleKey: '',
      ticketUrl:
        'https://www.eventpop.me/e/103013/orchestrate-docker-kubernetes-bootcamp-2-2025',
    },
  ],
  documents: [],
};

export default courseTh;
