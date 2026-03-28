const courseEn = {
  brand: 'DKS Center',
  lastUpdate: '2026-03-29T12:00:00+0700',
  key: '2026-003-ai-assisted-software-engineering',
  locale: 'en',
  isActive: true,
  imageUrl: null,
  detailUrl:
    'https://dkscenter.gumon.io/en/course/2026-003-ai-assisted-software-engineering',
  title: 'AI-Assisted Software Engineering: Practical, Secure & Production-Ready',
  code: '2026-003',
  duration: '2 days (09:00 - 17:00)',
  overview:
    'This course is designed to help software engineers effectively leverage AI tools such as ChatGPT, GitHub Copilot, and Codex in real-world development workflows, while maintaining strong control over security, reliability, and code quality. Participants will engage in hands-on workshops covering prompt engineering, AI-assisted coding, debugging, testing, and secure development practices for production systems.',
  objectives: [
    'Apply AI in a structured software development workflow.',
    'Write high-quality prompts for engineering tasks.',
    'Review and improve AI-generated code.',
    'Understand LLM limitations such as hallucination.',
    'Identify and mitigate security risks.',
    'Design secure AI-assisted development workflows.',
  ],
  whoShouldAttend: [
    'Software engineers at all levels, from junior to senior.',
    'Backend, frontend, and full-stack developers.',
    'Tech leads and engineering managers.',
    'DevOps and platform engineers.',
    'Development teams already using tools such as ChatGPT or GitHub Copilot.',
  ],
  prerequisites: [
    'Basic programming experience, such as JavaScript, Python, or another language.',
    'Foundational understanding of web or API development.',
    'Basic familiarity with AI tools such as ChatGPT or Copilot.',
  ],
  participantsWillReceive: [
    'Certificate of completion for the AI-Assisted Software Engineering: Practical, Secure & Production-Ready course.',
    'Training manuals and workshop materials.',
    'Dedicated support and close guidance from instructors and staff throughout the course.',
    'Hands-on experience with practical AI-assisted software engineering workflows.',
    'A secure development mindset for reviewing, testing, and improving AI-generated code.',
    'More than 70% of the course is workshop-based, with guided practice in real engineering scenarios.',
    'Participants will build and refine practical APIs and production-style features with AI assistance.',
    'Attack simulation exercises, including prompt injection scenarios, help teams understand AI security risks in practice.',
    'A capstone project ties together prompting, coding, testing, review, and secure delivery in one production-oriented workflow.',
    'Actionable patterns for introducing secure AI-assisted development practices into real teams and organizations.',
  ],
  outline: [
    {
      title: 'AI in Software Engineering',
      descriptions: [
        'AI across the software development lifecycle.',
        'How LLMs work: tokens, context, and prediction.',
        'LLM limitations such as hallucination and pattern-based reasoning.',
        'Vibe coding vs. structured AI-assisted development.',
      ],
    },
    {
      title: 'Prompt Engineering for Real Work',
      descriptions: [
        'Building prompts with context, constraints, and output format.',
        'Techniques for controlling AI output quality.',
        'Comparing low-quality prompts with high-quality prompts.',
        'Workshop: rewrite prompts for the same engineering task and compare results.',
      ],
    },
    {
      title: 'Structured AI-Assisted Development Workflow',
      descriptions: [
        'Requirement to design to code to review to test to deploy.',
        'Trust boundaries between human judgment and AI output.',
        'Role separation between engineers and AI tools.',
        'Mini project: generate a REST API with AI and refine it for real use.',
      ],
    },
    {
      title: 'AI Code Review and Debugging',
      descriptions: [
        'Reviewing AI-generated code for logic correctness.',
        'Finding edge cases and weak error handling.',
        'Debugging defects introduced by generated code.',
        'Workshop: analyze buggy and vulnerable code, then improve it.',
      ],
    },
    {
      title: 'Testing with AI',
      descriptions: [
        'Using AI to generate unit tests.',
        'Designing edge cases and negative test scenarios.',
        'Evaluating test quality and coverage.',
        'Workshop: create tests for code developed during class.',
      ],
    },
    {
      title: 'Integrated Development Practice',
      descriptions: [
        'Add a new feature with AI assistance.',
        'Improve validation and error handling.',
        'Expand automated test coverage.',
        'Refine implementation quality before release.',
      ],
    },
    {
      title: 'Security Risks in AI-Generated Code',
      descriptions: [
        'Security concerns related to AI-assisted software development.',
        'OWASP-relevant risks in generated code.',
        'SQL Injection, XSS, and broken authentication.',
        'Secret leakage, data exposure, and dependency risk.',
      ],
    },
    {
      title: 'Vulnerability Detection Workshop',
      descriptions: [
        'Inspect insecure code samples.',
        'Identify technical and security risks.',
        'Fix vulnerable implementations.',
        'Validate safer coding outcomes.',
      ],
    },
    {
      title: 'AI Attack Simulation',
      descriptions: [
        'Prompt injection fundamentals.',
        'Jailbreak techniques and bypass attempts.',
        'Attacker vs. defender simulation.',
        'Learning how to reduce unsafe AI behavior.',
      ],
    },
    {
      title: 'Designing a Secure AI Workflow',
      descriptions: [
        'Prompt design with safer guardrails.',
        'Context control and data handling boundaries.',
        'Validating AI outputs before use.',
        'Defining AI usage policy for teams and organizations.',
      ],
    },
    {
      title: 'Production Capstone Project',
      descriptions: [
        'Build a production-style feature using AI.',
        'Apply input validation and authentication or authorization.',
        'Include unit tests and secure code structure.',
        'Prepare the feature for final review and presentation.',
      ],
    },
    {
      title: 'Presentation and Best Practices',
      descriptions: [
        'Present project outcomes.',
        'Receive instructor feedback.',
        'Summarize secure and practical AI engineering practices.',
        'Create a path for adoption in real teams.',
      ],
    },
  ],
  publicSchedule: [],
  documents: [],
};

export default courseEn;
