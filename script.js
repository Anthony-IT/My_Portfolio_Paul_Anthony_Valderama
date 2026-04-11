const revealSections = document.querySelectorAll('.reveal');

revealSections.forEach((section, index) => {
  section.style.transitionDelay = `${index * 90}ms`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealSections.forEach((section) => observer.observe(section));

const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('main section[id]')];

const setActiveLink = () => {
  if (!navLinks.length || !sections.length) {
    return;
  }

  let current = sections[0].id;

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 160) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${current}`;
    link.style.color = isCurrent ? '#e85d04' : '';
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const imageLightbox = (() => {
  let existingLightbox = document.querySelector('.image-lightbox');
  if (!existingLightbox) {
    existingLightbox = document.createElement('div');
    existingLightbox.className = 'image-lightbox';
    existingLightbox.innerHTML = '<img alt="Expanded image preview" />';
    document.body.appendChild(existingLightbox);
  }

  return existingLightbox;
})();

const lightboxImage = imageLightbox.querySelector('img');

const closeImageLightbox = () => {
  imageLightbox.classList.remove('is-open');
};

const openImageLightbox = (source, altText) => {
  if (!source) {
    return;
  }

  lightboxImage.src = source;
  lightboxImage.alt = altText || 'Expanded image preview';
  imageLightbox.classList.add('is-open');
};

imageLightbox.addEventListener('click', closeImageLightbox);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && imageLightbox.classList.contains('is-open')) {
    closeImageLightbox();
  }
});

const certificateGrid = document.getElementById('certificateGrid');

if (certificateGrid) {
  const makePlaceholderImage = (title, category) => {
    const short = encodeURIComponent((title || 'Certificate').slice(0, 42));
    const group = encodeURIComponent(category || 'Category');
    return `https://placehold.co/900x650/f2e1cb/5b3312?text=${short}%0A${group}`;
  };

  const supportsCredentialButton = (company) => /cisco|ibm|salesforce|ilaw|up model/i.test(company || '');

  const categoryLogoByName = {
    Cisco: 'assets/icons/Cisco_logo_blue_2016.svg.png',
    IBM: 'assets/icons/ibm.svg',
    Salesforce: 'assets/icons/Salesforce.com_logo.svg.png',
    iLaw: 'assets/icons/images.png',
    'UP MODeL': 'assets/icons/UP-Seal.png',
    TESDA: 'assets/icons/cropped-Tesda-Logo.png',
    'Other Certificates': 'assets/icons/other cert.png',
  };

  const certificateCatalog = [
    {
      id: 'computer-hardware-basics',
      title: 'Computer Hardware Basics',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 20, 2025',
      image: 'assets/certificates/computer-hardware-basics.jpg',
      credentialUrl: 'https://www.credly.com/badges/646e356f-5f01-4ca7-8707-9d4975d6b517',
      description:
        'The Computer Hardware Basics certification provided me with foundational knowledge of computer components, their functions, and how they interact within a system. I gained practical skills in identifying, assembling, and troubleshooting hardware parts such as processors, memory, storage devices, and peripheral equipment. This training also enhanced my understanding of upgrade procedures, compatibility issues, and maintenance practices, equipping me with the ability to support and optimize computer systems effectively.',
    },
    {
      id: 'cyber-threat-management',
      title: 'Cyber Threat Management',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'October 09, 2025',
      image: 'assets/certificates/cyber-threat-management.jpg',
      credentialUrl: 'https://www.credly.com/badges/802c7a49-341c-46b2-a222-e08ad5aa04f8',
      description:
        'The Cyber Threat Management certification equipped me with essential knowledge of identifying, analyzing, and mitigating digital threats. I learned how to recognize common attack vectors, assess vulnerabilities, and apply proactive defense strategies to protect networks and systems. The program also covered incident response, risk management, and the use of security tools to monitor and counter cyberattacks. This training strengthened my ability to safeguard digital environments, manage security operations, and contribute to building resilient IT infrastructures against evolving cyber threats.',
    },
    {
      id: 'data-analytics-essentials',
      title: 'Data Analytics Essentials',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'April 11, 2026',
      image: 'assets/certificates/data-analytics-essentials.jpg',
      credentialUrl: 'https://www.credly.com/badges/8ffbea0b-d1e7-4853-bcd8-17508e96caf3',
      description:
        'The Data Analytics Essentials certification provided me with foundational knowledge of data analysis concepts, techniques, and tools. I gained practical skills in collecting, cleaning, and organizing datasets, as well as applying statistical methods to interpret information accurately. This training also enhanced my ability to create meaningful visualizations, identify trends, and communicate insights effectively to support decision-making. Additionally, it strengthened my understanding of ethical data practices and the role of analytics in solving real-world problems, equipping me to contribute confidently to data-driven projects and initiatives.',
    },
    {
      id: 'exploring-networking-packet-tracer',
      title: 'Exploring Networking with Cisco Packet Tracer',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/exploring-networking-cisco-packet-tracer.jpg',
      credentialUrl: '',
      description:
        'The Exploring Networking with Cisco Packet Tracer certification provided me with hands-on experience in simulating and analyzing computer networks using Cisco\'s Packet Tracer tool. I gained practical knowledge in configuring devices, testing connectivity, and visualizing how data flows across different network topologies. This training enhanced my ability to design, troubleshoot, and optimize networks in a virtual environment, preparing me to apply networking concepts effectively in real-world scenarios.',
    },
    {
      id: 'getting-started-packet-tracer',
      title: 'Getting Started with Cisco Packet Tracer',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/getting-started-cisco-packet-tracer.jpg',
      credentialUrl: '',
      description:
        'The Getting Started with Cisco Packet Tracer certification introduced me to the fundamentals of network simulation using Cisco\'s Packet Tracer tool. I gained practical experience in setting up basic network configurations, testing device connectivity, and visualizing how data travels across different network setups. This training strengthened my ability to apply networking concepts in a simulated environment, preparing me to troubleshoot, design, and understand real-world network infrastructures more effectively.',
    },
    {
      id: 'hardware-upgrade-support',
      title: 'Hardware and Upgrade Support',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'september 20, 2025',
      image: 'assets/certificates/hardware-upgrade-support.jpg',
      credentialUrl: 'https://www.credly.com/badges/93fa5b9a-e24c-446c-a27a-00ff383bbb40',
      description:
        'The Hardware and Upgrade Support certification provided me with practical knowledge in diagnosing, maintaining, and upgrading computer hardware systems. I learned how to identify and resolve hardware issues, perform component replacements, and ensure compatibility when upgrading devices. This training also enhanced my skills in optimizing system performance, extending hardware lifespan, and supporting users with reliable technical solutions. Overall, it strengthened my ability to deliver effective IT support and manage hardware upgrades in both personal and professional environments.',
    },
    {
      id: 'intro-cybersecurity',
      title: 'Introduction to Cybersecurity',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 08, 2025',
      image: 'assets/certificates/introduction-to-cybersecurity.jpg',
      credentialUrl: 'https://www.credly.com/badges/880e9ada-966d-4878-b3ec-464fd9ebeb73',
      description:
        'The Introduction to Cybersecurity certification provided me with foundational knowledge of digital security principles and practices. I learned about common cyber threats, attack methods, and the importance of safeguarding personal and organizational data. The program also covered essential topics such as risk management, security policies, and the role of cybersecurity in protecting networks and systems. This training enhanced my awareness of the evolving cyber landscape and equipped me with practical skills to identify vulnerabilities, apply preventive measures, and contribute to building secure digital environments.',
    },
    {
      id: 'intro-data-science',
      title: 'Introduction to Data Science',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/introduction-to-data-science.jpg',
      credentialUrl: 'https://www.credly.com/badges/ec80f4c5-0027-45ea-8eb2-81fa6cc055de',
      description:
        'The Introduction to Data Science certification provided me with a solid foundation in understanding how data is collected, processed, and analyzed to generate meaningful insights. I learned key concepts such as data types, data cleaning, statistical analysis, and visualization techniques. The program also introduced me to practical applications of data science in business, technology, and research, highlighting how data-driven decision-making supports innovation and problem-solving. This training strengthened my analytical thinking, improved my ability to interpret datasets, and prepared me to apply data science principles in real-world scenarios.',
    },
    {
      id: 'intro-iot',
      title: 'Introduction to Internet of Things',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/introduction-to-iot.jpg',
      credentialUrl: 'https://www.credly.com/badges/f0b92228-86bb-4d63-8606-5d600eec1179',
      description:
        'The Introduction to IoT (Internet of Things) certification provided me with foundational knowledge of how connected devices, sensors, and networks interact to collect and exchange data. I learned about IoT architecture, communication protocols, and the role of cloud computing in managing and analyzing IoT data. The program also highlighted practical applications of IoT in industries such as smart homes, healthcare, manufacturing, and digital transformation. This training strengthened my understanding of how IoT drives innovation, improves efficiency, and supports the development of intelligent, interconnected systems in the modern digital landscape.',
    },
    {
      id: 'intro-modern-ai',
      title: 'Introduction to Modern AI',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/introduction-to-modern-ai.jpg',
      credentialUrl: 'https://www.credly.com/badges/da71a1e4-8609-4deb-b201-c72213de04fa',
      description:
        'The Introduction to Modern AI certification provided me with a clear understanding of contemporary artificial intelligence concepts, tools, and applications. I learned about machine learning models, neural networks, and the ethical considerations of AI deployment. The program also explored practical use cases of AI across industries, highlighting how automation, data-driven insights, and intelligent systems are transforming business and society. This training strengthened my ability to grasp the fundamentals of modern AI technologies and prepared me to apply them in solving real-world problems and driving digital innovation.',
    },
    {
      id: 'it-customer-support-basics',
      title: 'IT Customer Support Basics',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 20, 2025',
      image: 'assets/certificates/it-customer-support-basics.jpg',
      credentialUrl: 'https://www.credly.com/badges/e338e296-6976-45a7-9bc3-173934d0aed8',
      description:
        'The IT Customer Support Basics certification provided me with essential skills in assisting users with technical issues and delivering effective IT support. I learned how to diagnose common hardware and software problems, guide users through troubleshooting steps, and communicate solutions clearly and professionally. The program also emphasized customer service principles, including patience, problem-solving, and maintaining user satisfaction while resolving technical concerns. This training strengthened my ability to provide reliable front-line IT support, ensuring smooth operations and positive user experiences in both personal and organizational settings.',
    },
    {
      id: 'network-support-security',
      title: 'Network Support and Security',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/network-support-security.jpg',
      credentialUrl: 'https://www.credly.com/badges/849f5656-3dbd-4a63-9f37-e40da7c12367',
      description:
        'The Network Support and Security certification provided me with essential skills in maintaining, troubleshooting, and securing computer networks. I learned how to configure and support network devices, monitor connectivity, and apply security measures to protect against unauthorized access and cyber threats. The program also covered best practices in safeguarding data, managing firewalls, and ensuring reliable communication across network infrastructures. This training strengthened my ability to deliver effective network support while implementing security protocols that enhance system resilience and protect organizational assets.',
    },
    {
      id: 'networking-basics',
      title: 'Networking Basics',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/networking-basics.jpg',
      credentialUrl: 'https://www.credly.com/badges/0ae95bbe-a337-4c60-87a1-82b1d494caf4',
      description:
        'The Networking Basics certification introduced me to the fundamental concepts of computer networks, including how devices connect, communicate, and share resources. I learned about network types, protocols, IP addressing, and the role of routers, switches, and other networking hardware. The program also covered essential troubleshooting techniques and best practices for maintaining reliable connectivity. This training strengthened my ability to understand and support network infrastructures, laying the groundwork for more advanced studies in networking and cybersecurity.',
    },
    {
      id: 'os-basics',
      title: 'Operating Systems Basics',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 20, 2025',
      image: 'assets/certificates/operating-systems-basics.jpg',
      credentialUrl: 'https://www.credly.com/badges/ae946632-c285-446e-ab1c-0ea1efb7acde',
      description:
        'The Operating Systems Basics certification provided me with foundational knowledge of how operating systems function as the backbone of computer systems. I learned about core concepts such as process management, memory allocation, file systems, and user interfaces. The program also covered the role of operating systems in coordinating hardware and software resources, ensuring system stability, and supporting multitasking environments. This training strengthened my ability to understand, configure, and troubleshoot operating systems, preparing me to deliver effective IT support and optimize system performance.',
    },
    {
      id: 'os-support',
      title: 'Operating Systems Support',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'September 21, 2025',
      image: 'assets/certificates/operating-systems-support.jpg',
      credentialUrl: 'https://www.credly.com/badges/995f2809-f507-4a0c-b044-5ee8f68236e5',
      description:
        'The Operating Systems Support certification provided me with practical skills in managing, configuring, and troubleshooting operating systems across different platforms. I learned how to install and update operating systems, manage user accounts and permissions, and ensure system stability through proper configuration and maintenance. The program also covered diagnosing common OS-related issues, applying patches, and supporting users in resolving software and compatibility problems. This training strengthened my ability to deliver reliable IT support, optimize system performance, and maintain secure and efficient computing environments.',
    },
    {
      id: 'security-connectivity-support',
      title: 'Security and Connectivity Support',
      category: 'Cisco',
      company: 'Cisco',
      issuedBy: 'Cisco Networking Academy',
      date: 'October 16, 2025',
      image: 'assets/certificates/security-connectivity-support.jpg',
      credentialUrl: 'https://www.credly.com/badges/dd532e4f-c509-4c61-9818-25616e02efc7',
      description:
        'The Security and Connectivity Support certification provided me with practical skills in maintaining secure and reliable network connections. I learned how to configure and support connectivity across devices, troubleshoot common network issues, and apply security measures to protect systems from unauthorized access and cyber threats. The program also emphasized best practices in safeguarding data, managing secure communications, and ensuring consistent connectivity for users. This training strengthened my ability to deliver dependable IT support while enhancing both the performance and security of network infrastructures.',
    },
    {
      id: 'ibm-cloud-computing-fundamentals',
      title: 'Cloud Computing Fundamentals',
      category: 'IBM',
      company: 'IBM',
      issuedBy: 'IBM SkillsBuild',
      date: 'February 24, 2026',
      image: 'assets/certificates/ibm-cloud-computing-fundamentals.jpg',
      credentialUrl: 'https://www.credly.com/badges/65a90b7e-5549-4534-8b38-f0b04245f62a',
      description:
        'The Cloud Computing Fundamentals certification provided me with a strong foundation in understanding cloud technologies and their role in modern IT infrastructures. I learned about cloud service models (IaaS, PaaS, SaaS), deployment types (public, private, hybrid), and the benefits of scalability, flexibility, and cost efficiency. The program also covered essential concepts such as virtualization, data storage, and cloud security practices. This training strengthened my ability to evaluate cloud solutions, support migration strategies, and apply cloud computing principles to improve organizational efficiency and innovation.',
    },
    {
      id: 'ibm-cybersecurity-fundamentals',
      title: 'Cybersecurity Fundamentals',
      category: 'IBM',
      company: 'IBM',
      issuedBy: 'IBM SkillsBuild',
      date: 'February 18, 2026',
      image: 'assets/certificates/ibm-cybersecurity-fundamentals.jpg',
      credentialUrl: 'https://www.credly.com/badges/694abf4d-328c-423e-893d-4879f08d0b83',
      description:
        'The Cybersecurity Fundamentals certification provided me with a strong foundation in understanding the principles, practices, and technologies used to protect digital systems and data. I learned about key concepts such as threat identification, risk management, encryption, authentication, and network security. The program also emphasized the importance of security policies, compliance standards, and ethical considerations in safeguarding information. This training strengthened my ability to recognize vulnerabilities, apply preventive measures, and support the creation of secure digital environments for both individuals and organizations.',
    },
    {
      id: 'ibm-data-fundamentals',
      title: 'Data Fundamentals',
      category: 'IBM',
      company: 'IBM',
      issuedBy: 'IBM SkillsBuild',
      date: 'February 19, 2026',
      image: 'assets/certificates/ibm-data-fundamentals.jpg',
      credentialUrl: 'https://www.credly.com/badges/10b3d3c6-e823-4e2d-bbaa-a856076fe36c',
      description:
        'The Data Fundamentals certification provided me with a strong foundation in understanding how data is structured, managed, and utilized. I learned about different types of data, the basics of databases, and essential concepts such as data collection, storage, and retrieval. The program also introduced me to data quality, integrity, and the importance of accurate information in decision-making. This training strengthened my ability to interpret and organize data effectively, preparing me to support analytics, reporting, and data-driven solutions in professional environments.',
    },
    {
      id: 'ibm-it-fundamentals',
      title: 'Information Technology Fundamentals',
      category: 'IBM',
      company: 'IBM',
      issuedBy: 'IBM SkillsBuild',
      date: 'February 25, 2026',
      image: 'assets/certificates/ibm-information-technology-fundamentals.jpg',
      credentialUrl: 'https://www.credly.com/badges/efafbaee-1de9-408c-9018-c709f5765cda',
      description:
        'The Information Technology Fundamentals certification provided me with a broad understanding of core IT concepts and practices. I learned about computer hardware, operating systems, networking, cybersecurity, and data management, gaining insight into how these elements work together to support modern digital environments. The program also emphasized troubleshooting, system maintenance, and the role of IT in business operations. This training strengthened my ability to apply foundational IT knowledge to real-world scenarios, preparing me to deliver effective technical support and contribute to the efficient use of technology in organizations.',
    },
    {
      id: 'ibm-web-dev-fundamentals',
      title: 'Web Development Fundamentals',
      category: 'IBM',
      company: 'IBM',
      issuedBy: 'IBM SkillsBuild',
      date: 'February 19, 2026',
      image: 'assets/certificates/ibm-web-development-fundamentals.jpg',
      credentialUrl: 'https://www.credly.com/badges/170cfe47-c19b-4d4f-adb4-9001178c15b2',
      description:
        'The Web Development Fundamentals certification provided me with essential knowledge of how websites are designed, built, and maintained. I learned the basics of front-end and back-end development, including HTML, CSS, and introductory JavaScript for creating interactive web pages. The program also covered core concepts such as responsive design, client-server communication, and the importance of usability and accessibility in modern web applications. This training strengthened my ability to understand web technologies, troubleshoot common issues, and apply development principles to create functional and user-friendly websites.',
    },
    {
      id: 'ibm-ai-fundamentals',
      title: 'Artificial Intelligence Fundamentals',
      category: 'IBM',
      company: 'IBM',
      issuedBy: 'IBM SkillsBuild',
      date: 'September 21, 2025',
      image: 'assets/certificates/ibm-artificial-intelligence-fundamentals.jpg',
      credentialUrl: 'https://www.credly.com/badges/5aecd2a7-d525-4b55-92c3-cb44019db635',
      description:
        'The Artificial Intelligence Fundamentals certification provided me with a strong foundation in understanding the core principles, techniques, and applications of AI. I learned about machine learning, natural language processing, computer vision, and the role of algorithms in enabling intelligent systems. The program also emphasized ethical considerations, data-driven decision-making, and the impact of AI on industries such as healthcare, finance, and business innovation. This training strengthened my ability to grasp how AI models are developed, applied, and evaluated, preparing me to contribute to projects that leverage artificial intelligence for solving real-world problems.',
    },
    {
      id: 'ileap-intellectual-property',
      title: 'iLEAP Course on Intellectual Property',
      category: 'iLaw',
      company: 'iLaw',
      issuedBy: 'iLaw and Education Partners',
      date: 'November 26, 2024',
      image: 'assets/certificates/ileap-intellectual-property.jpg',
      credentialUrl: 'https://ilaw.ipophil.gov.ph/mod/customcert/verify_certificate.php?contextid=129994&code=au6rlPSAPE&qrcode=1',
      description:
        'The iLEAP Course on Intellectual Property certification provided me with a comprehensive understanding of the principles and practices surrounding intellectual property rights. I learned about patents, copyrights, trademarks, and trade secrets, as well as their role in protecting innovation and creativity. The program also emphasized the importance of intellectual property in business strategy, research, and entrepreneurship, highlighting how organizations leverage IP to maintain competitive advantage. This training strengthened my ability to recognize, manage, and apply intellectual property concepts in professional and academic contexts, ensuring compliance and fostering innovation.',
    },
    {
      id: 'salesforce-virtual-internship-2025',
      title: 'Salesforce Supported Virtual Internship Program 2025',
      category: 'Salesforce',
      company: 'Salesforce',
      issuedBy: 'Salesforce and Program Partners',
      date: 'January 02, 2026',
      image: 'assets/certificates/salesforce-supported-virtual-internship-2025.jpg',
      credentialUrl: '',
      description:
        'Gaining hands-on experience with Salesforce CRM and cloud-based solutions through virtual tasks and simulations. Developing an understanding of business processes and customer relationship management while building skills in workflow automation, reporting, and Salesforce platform navigation. Applying learned concepts to support efficient and data-driven operations.\n\nSalesforce Fundamentals | Data and Security Modeling\nDeclarative Automation | Apex in Salesforce\nVisualforce Pages | Lightning Web Components\nAgentforce Essentials | Agentblazer Champion',
    },
    {
      id: 'salesforce-double-star-ranger',
      title: 'Salesforce Profile - DOUBLE STAR RANGER',
      category: 'Salesforce',
      company: 'Salesforce',
      issuedBy: 'Salesforce Trailhead',
      date: 'January 02, 2026',
      image: 'assets/certificates/salesforce-double-star-ranger.jpg',
      credentialUrl: 'https://www.salesforce.com/trailblazer/j7makgww4yx9airm1u',
      description:
        'The Salesforce Profile - DOUBLE STAR RANGER recognition highlights my active engagement and accomplishments within the Salesforce learning ecosystem. Achieving this level demonstrates consistent progress through Trailhead modules, hands-on projects, and knowledge checks across multiple Salesforce domains. It reflects my commitment to expanding expertise in CRM, cloud solutions, and digital transformation tools while applying best practices to real-world business scenarios. This achievement showcases both my technical proficiency and my dedication to continuous learning, positioning me as a motivated professional capable of leveraging Salesforce to drive organizational success.',
    },
    {
      id: 'microsoft-azure-ai-fundamentals',
      title: 'Microsoft Artificial Intelligence Course: Azure AI Fundamentals',
      category: 'TESDA',
      company: 'TESDA x Microsoft',
      issuedBy: 'TESDA and Microsoft',
      date: 'February 25, 2026',
      image: 'assets/certificates/microsoft-azure-ai-fundamentals.jpg',
      credentialUrl: '',
      description:
        'The Microsoft Artificial Intelligence Course: Azure AI Fundamentals certification provided me with foundational knowledge of AI concepts and how they are applied using Microsoft Azure. I learned about machine learning, computer vision, natural language processing, and conversational AI, as well as how these services integrate into cloud-based solutions. The program also emphasized responsible AI practices, including fairness, transparency, and security in deploying intelligent applications. This training strengthened my ability to understand AI workloads, explore Azure AI services, and support organizations in leveraging artificial intelligence to drive innovation and efficiency.',
    },
    {
      id: 'microsoft-security-compliance-identity',
      title: 'Microsoft Cybersecurity Course: Security, Compliance, and Identity Fundamentals',
      category: 'TESDA',
      company: 'TESDA x Microsoft',
      issuedBy: 'TESDA and Microsoft',
      date: 'March 05, 2026',
      image: 'assets/certificates/microsoft-security-compliance-identity.jpg',
      credentialUrl: '',
      description:
        'The Microsoft Cybersecurity Course: Security, Compliance, and Identity Fundamentals certification provided me with a solid understanding of how organizations protect digital assets and manage secure access. I learned about core concepts such as identity management, authentication, compliance standards, and the role of Microsoft security solutions in safeguarding data. The program also emphasized risk reduction, regulatory compliance, and best practices for implementing secure access controls across cloud and on-premises environments. This training strengthened my ability to support secure IT infrastructures, ensure compliance with industry standards, and apply identity-driven security strategies to protect organizational resources.',
    },
    {
      id: 'ux-design',
      title: 'Developing Designs for User Experience',
      category: 'TESDA',
      company: 'TESDA',
      issuedBy: 'TESDA',
      date: 'April 5, 2026',
      image: 'assets/certificates/developing-designs-user-experience.jpg',
      credentialUrl: '',
      description:
        'The Developing Designs for User Experience certification provided me with a comprehensive understanding of how to create user-centered digital products. I learned core concepts such as usability, accessibility, information architecture, user research, and user testing, along with the importance of designing intuitive flows and interactions. The program emphasized aligning design decisions with user needs, improving overall satisfaction, and applying best practices to enhance the end-to-end user journey. This training strengthened my ability to design experiences that are both functional and engaging, ensuring products meet the expectations of diverse audiences.',
    },
    {
      id: 'ui-design',
      title: 'Developing Designs for User Interface',
      category: 'TESDA',
      company: 'TESDA',
      issuedBy: 'TESDA',
      date: 'April 5, 2026',
      image: 'assets/certificates/developing-designs-user-interface.jpg',
      credentialUrl: '',
      description:
        'The Developing Designs for User Interface certification provided me with a strong foundation in creating intuitive and visually appealing digital interfaces. I learned core concepts such as layout design, typography, color theory, iconography, and accessibility principles, as well as the importance of wireframing and prototyping in the design process. The program emphasized usability, user-centered design, and best practices for building interfaces that balance aesthetics with functionality. This training strengthened my ability to design clear, efficient, and engaging user interfaces that enhance the overall user experience.',
    },
    {
      id: 'ai-essentials-theory-practice',
      title: 'AI Essentials: Theory and Practice',
      category: 'UP MODeL',
      company: 'AI Learning Provider',
      issuedBy: 'AI Learning Provider',
      date: 'June 19, 2025',
      image: 'assets/certificates/ai-essentials-theory-practice.jpg',
      credentialUrl: 'https://model.upou.edu.ph/completers/ai101_may2025/',
      description:
        'The AI Essentials: Theory and Practice certification provided me with a balanced understanding of both the theoretical foundations and practical applications of artificial intelligence. I learned about core AI concepts such as machine learning, deep learning, natural language processing, and computer vision, while also exploring how these technologies are implemented in real-world scenarios. The program emphasized hands-on practice with AI tools and frameworks, as well as ethical considerations in deploying intelligent systems. This training strengthened my ability to bridge theory with practice, enabling me to contribute to AI-driven projects that solve complex problems and drive innovation.',
    },
    {
      id: 'business-analytics-concepts-frameworks',
      title: 'Business Analytics Concepts and Frameworks',
      category: 'UP MODeL',
      company: 'Business Analytics Program',
      issuedBy: 'Business Analytics Program',
      date: 'May 31, 2025',
      image: 'assets/certificates/business-analytics-concepts-frameworks.jpg',
      credentialUrl: 'https://model.upou.edu.ph/completers/bafbana_may2025/',
      description:
        'The Business Analytics Concepts and Frameworks certification provided me with a comprehensive understanding of how organizations leverage data to drive strategic decisions. I learned about key analytical frameworks, data modeling, and performance measurement techniques, as well as the role of business intelligence tools in transforming raw data into actionable insights. The program also emphasized the importance of aligning analytics with organizational goals, evaluating KPIs, and applying structured approaches to problem-solving. This training strengthened my ability to interpret complex data, support evidence-based decision-making, and contribute to business growth through effective analytics strategies.',
    },
    {
      id: 'data-annotation-bpo-up-model',
      title: 'Data Annotation for Aspiring BPO Professionals',
      category: 'UP MODeL',
      company: 'UP MODeL x Concentrix',
      issuedBy: 'University of the Philippines Open University and Concentrix',
      date: 'March 22, 2026',
      image: 'assets/certificates/data-annotation-bpo-up-model.jpg',
      credentialUrl: 'https://model.upou.edu.ph/completers/ics-bpm201_feb2026/?fbclid=IwY2xjawREkhtleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEemK7AXuck4au5TMPSfDQlqGMp80ycMhX_TO-jGExMUIrLnf0L7T1gEdbY7K8_aem_qcCLv_e2b1iNG7wQXgRmxA',
      description:
        'The Data Annotation for Aspiring BPO Professionals program is a specialized training course designed to equip learners with the foundational skills required in the growing field of business process outsourcing (BPO). Delivered through the Massive Open Distance eLearning (MODeL) platform of the University of the Philippines Open University in partnership with Concentrix, the course provides a structured introduction to data annotation, a critical process in preparing datasets for artificial intelligence and machine learning applications.',
    },
    {
      id: 'excel-pro',
      title: 'Get Certified as an Excel Pro! - Microsoft Essentials',
      category: 'Other Certificates',
      company: 'Microsoft Essentials',
      issuedBy: 'Microsoft Essentials',
      date: 'September 20, 2025',
      image: 'assets/certificates/get-certified-as-an-excel-pro.jpg',
      credentialUrl: '',
      description:
        'The Get Certified as an Excel Pro! - Microsoft Essentials certification provided me with advanced skills in using Microsoft Excel for data analysis, reporting, and productivity. I learned how to apply formulas, functions, pivot tables, charts, and conditional formatting to organize and interpret data effectively. The program also emphasized automation techniques such as macros, data validation, and advanced filtering to streamline workflows. This training strengthened my ability to transform raw data into actionable insights, create professional reports, and support decision-making processes with accuracy and efficiency.',
    },
    {
      id: 'microsoft-365-pro-hacks',
      title: 'Master Microsoft 365 Certificate: Pro Hacks - Microsoft Essentials',
      category: 'Other Certificates',
      company: 'Microsoft Essentials',
      issuedBy: 'Microsoft Essentials',
      date: 'September 20, 2025',
      image: 'assets/certificates/master-microsoft-365-pro-hacks.jpg',
      credentialUrl: '',
      description:
        'The Master Microsoft 365 Certificate: Pro Hacks - Microsoft Essentials certification provided me with advanced skills in leveraging Microsoft 365 applications and services to maximize productivity and collaboration. I learned how to integrate tools such as Word, Excel, PowerPoint, Outlook, Teams, and OneDrive to streamline workflows and enhance efficiency. The program emphasized practical pro hacks for automation, cloud collaboration, and secure information management, enabling me to optimize daily tasks and team projects. This training strengthened my ability to use Microsoft 365 as a comprehensive productivity suite, supporting both individual performance and organizational success.',
    },
    {
      id: 'outlook-zero-to-hero',
      title: 'Outlook 101: Zero to Hero Certificate - Microsoft Essentials',
      category: 'Other Certificates',
      company: 'Microsoft Essentials',
      issuedBy: 'Microsoft Essentials',
      date: 'March 05, 2025',
      image: 'assets/certificates/outlook-101-zero-to-hero.jpg',
      credentialUrl: '',
      description:
        'The Outlook 101: Zero to Hero Certificate - Microsoft Essentials certification provided me with practical skills in managing email, calendars, contacts, and tasks using Microsoft Outlook. I learned how to organize communications efficiently, schedule and track meetings, and integrate productivity tools to streamline workflows. The program also emphasized best practices in inbox management, collaboration, and leveraging Outlook\'s advanced features for professional communication. This training strengthened my ability to use Outlook as a powerful productivity tool, enhancing both personal organization and team collaboration in business environments.',
    },
    {
      id: 'power-bi-mastering-data-skills',
      title: 'Power BI Certificate: Mastering Data Skills - Microsoft Essentials',
      category: 'Other Certificates',
      company: 'Microsoft Essentials',
      issuedBy: 'Microsoft Essentials',
      date: 'September 20, 2025',
      image: 'assets/certificates/power-bi-mastering-data-skills.jpg',
      credentialUrl: '',
      description:
        'The Power BI Certificate: Mastering Data Skills - Microsoft Essentials certification provided me with practical expertise in transforming raw data into meaningful insights using Microsoft Power BI. I learned how to connect to diverse data sources, clean and model data, and create interactive dashboards and reports. The program emphasized best practices in data visualization, storytelling with data, and applying analytical techniques to support business decision-making. This training strengthened my ability to design clear, impactful reports that drive data-driven strategies and improve organizational performance.',
    },
    {
      id: 'powerpoint-pro',
      title: 'PowerPoint Pro Certificate - Microsoft Essentials',
      category: 'Other Certificates',
      company: 'Microsoft Essentials',
      issuedBy: 'Microsoft Essentials',
      date: 'March 05, 2025',
      image: 'assets/certificates/powerpoint-pro-certificate.jpg',
      credentialUrl: '',
      description:
        'The PowerPoint Pro Certificate - Microsoft Essentials certification provided me with advanced skills in creating, designing, and delivering professional presentations. I learned how to effectively use PowerPoint features such as slide layouts, themes, animations, transitions, and multimedia integration to enhance communication. The program also emphasized best practices in visual storytelling, audience engagement, and structuring content for clarity and impact. This training strengthened my ability to design polished, dynamic presentations that support business, academic, and professional objectives with confidence and creativity.',
    },
    {
      id: 'microsoft-word-for-work',
      title: 'Microsoft Word for Work',
      category: 'Other Certificates',
      company: 'Microsoft Essentials',
      issuedBy: 'Microsoft Essentials',
      date: 'July 05, 2025',
      image: 'assets/certificates/microsoft-word-for-work.jpg',
      credentialUrl: '',
      description:
        'The Microsoft Word for Work certification provided me with practical skills in creating, formatting, and managing professional documents. I learned how to use Word\'s advanced features such as styles, templates, tables, mail merge, and collaboration tools to produce polished reports, letters, and business documents. The program also emphasized efficiency techniques, document organization, and best practices for professional communication. This training strengthened my ability to design clear, well-structured documents that enhance workplace productivity and support effective information sharing.',
    },
    {
      id: 'chatgpt-career-growth-ai',
      title: 'ChatGPT Certificate: Mastering Career Growth with AI',
      category: 'Other Certificates',
      company: 'AI Learning Provider',
      issuedBy: 'AI Learning Provider',
      date: 'March 5, 2025',
      image: 'assets/certificates/chatgpt-mastering-career-growth-ai.jpg',
      credentialUrl: '',
      description:
        'The ChatGPT Certificate: Mastering Career Growth with AI certification provided me with practical knowledge of how artificial intelligence can be leveraged to accelerate professional development. I learned strategies for using AI tools to enhance productivity, improve communication, and support decision-making in career planning. The program emphasized real-world applications such as resume optimization, interview preparation, skill development, and workplace problem-solving with AI assistance. This training strengthened my ability to integrate AI into everyday professional tasks, positioning me to use intelligent tools as a catalyst for career growth and long-term success.',
    },
  ];

  const categoryOrder = ['Cisco', 'IBM', 'Salesforce', 'iLaw', 'UP MODeL', 'TESDA', 'Other Certificates'];

  const designatedImageById = {
    'computer-hardware-basics': 'computer hardware basics - cisco.png',
    'cyber-threat-management': 'cyberthreat management - cisco.png',
    'exploring-networking-packet-tracer': 'exploring networking with cisco packet tracer - cisco.png',
    'getting-started-packet-tracer': 'getting started with cisco packet tracer.png',
    'hardware-upgrade-support': 'hardware and upgrade support - cisco.png',
    'intro-cybersecurity': 'introduction to cybersecurity - cisco.png',
    'intro-data-science': 'introduction to data science - cisco.png',
    'intro-iot': 'introduction to internet of things - cisco.png',
    'intro-modern-ai': 'introduction to modern ai - cisco.png',
    'it-customer-support-basics': 'it customer support - cisco.png',
    'network-support-security': 'netowork support and security - cisco.png',
    'networking-basics': 'networking basics - cisco.png',
    'os-basics': 'operating system basics - cisco.png',
    'os-support': 'operating system support - cisco.png',
    'security-connectivity-support': 'security and connectivity support - cisco.png',
    'ibm-cloud-computing-fundamentals': 'cloud - ibm.png',
    'ibm-cybersecurity-fundamentals': 'cybersecurity - ibm.png',
    'ibm-data-fundamentals': 'data fundamentals - ibm.png',
    'ibm-it-fundamentals': 'iformation technology fundametals - ibm.png',
    'ibm-web-dev-fundamentals': 'web development fundamentals - ibm.png',
    'ibm-ai-fundamentals': 'ai fundamentals - ibm.png',
    'ileap-intellectual-property': 'ilaw cert.png',
    'salesforce-virtual-internship-2025': 'salesforce - salesforce.png',
    'salesforce-double-star-ranger': 'salesforce profile.png',
    'microsoft-azure-ai-fundamentals': 'microsoft artificial intelligence course azure - tesda.png',
    'microsoft-security-compliance-identity': 'microsoft cybersecurity course - tesda.png',
    'ux-design': 'developing designs for user experience.png',
    'ui-design': 'developing designs for user interface - tesda.png',
    'ai-essentials-theory-practice': 'Ai essential - up.png',
    'business-analytics-concepts-frameworks': 'business analytics - up.png',
    'data-annotation-bpo-up-model': 'data annotation - up.png',
    'excel-pro': 'Excel pro - other certificate.png',
    'microsoft-365-pro-hacks': 'microsoft 365 - other cert.png',
    'outlook-zero-to-hero': 'outlook 101 - other cert.png',
    'power-bi-mastering-data-skills': 'power bi - other cer.png',
    'powerpoint-pro': 'powerpoint pro - other cert.png',
    'microsoft-word-for-work': 'microsoft word for work - other cert.png',
    'chatgpt-career-growth-ai': 'chatgpt certificate - other cert.png',
    'data-analytics-essentials': 'data-analytics-essentials.png'
  };

  certificateCatalog.forEach((certificate) => {
    certificate.image = '';
    const designatedFile = designatedImageById[certificate.id];
    if (designatedFile) {
      certificate.image = encodeURI(`certificate screenshot/${designatedFile}`);
    }
  });

  const catalogById = new Map(certificateCatalog.map((certificate) => [certificate.id, certificate]));

  const groupedCertificates = categoryOrder
    .map((category) => ({
      category,
      items: certificateCatalog.filter((certificate) => certificate.category === category),
    }))
    .filter((group) => group.items.length > 0);

  certificateGrid.innerHTML = groupedCertificates
    .map(
      (group) => `
        <div class="cert-category-group">
            <h3 class="cert-category-heading">
              <img class="cert-category-logo" src="${categoryLogoByName[group.category] || 'assets/icons/other cert.png'}" alt="${group.category} logo" loading="lazy" />
              <span>${group.category}</span>
            </h3>
          <div class="cert-grid">
            ${group.items
              .map((certificate) => {
                const fallbackImage = makePlaceholderImage(certificate.title, certificate.category);
                const imageModeClass = certificate.category === 'Salesforce' ? 'is-contain' : '';
                return `
                  <article class="cert-card">
                    <button class="cert-card-trigger" type="button" data-cert-id="${certificate.id}">
                      <div class="cert-card-image-wrap ${imageModeClass}">
                        <img src="${certificate.image || fallbackImage}" data-fallback-src="${fallbackImage}" alt="${certificate.title}" loading="lazy" />
                      </div>
                      <div class="cert-card-content">
                        <span class="cert-category-badge">${certificate.category}</span>
                        <h4 class="cert-card-title">${certificate.title}</h4>
                      </div>
                    </button>
                  </article>
                `;
              })
              .join('')}
          </div>
        </div>
      `
    )
    .join('');

  certificateGrid.querySelectorAll('img[data-fallback-src]').forEach((image) => {
    image.addEventListener('error', () => {
      image.src = image.getAttribute('data-fallback-src');
    });
  });

  const certificateModal = document.getElementById('certificateModal');

  if (certificateModal) {
    const titleElement = document.getElementById('certificateModalTitle');
    const categoryElement = document.getElementById('certificateModalCategory');
    const companyElement = document.getElementById('certificateModalCompany');
    const dateElement = document.getElementById('certificateModalDate');
    const issuedByElement = document.getElementById('certificateModalIssuedBy');
    const descriptionElement = document.getElementById('certificateModalDescription');
    const imageElement = document.getElementById('certificateModalImage');
    const credentialButton = document.getElementById('certificateCredentialBtn');
    const closeModalButtons = certificateModal.querySelectorAll('[data-modal-close], .modal-close');

    const closeCertificateModal = () => {
      certificateModal.classList.remove('is-open');
      certificateModal.setAttribute('aria-hidden', 'true');
    };

    const openCertificateModal = (certificate) => {
      const fallbackImage = makePlaceholderImage(certificate.title, certificate.category);
      titleElement.textContent = certificate.title;
      categoryElement.textContent = certificate.category;
      companyElement.textContent = certificate.company;
      dateElement.textContent = certificate.date;
      issuedByElement.textContent = certificate.issuedBy;
      descriptionElement.textContent = certificate.description;
      imageElement.src = certificate.image || fallbackImage;
      imageElement.alt = `${certificate.title} certificate`;
      imageElement.onerror = () => {
        imageElement.src = fallbackImage;
      };

      const canShowCredential = supportsCredentialButton(certificate.company);
      credentialButton.style.display = canShowCredential ? 'inline-flex' : 'none';

      if (canShowCredential && certificate.credentialUrl) {
        credentialButton.classList.remove('is-disabled');
        credentialButton.textContent = 'View Credential';
        credentialButton.href = certificate.credentialUrl;
        credentialButton.removeAttribute('aria-disabled');
      } else if (canShowCredential) {
        credentialButton.classList.add('is-disabled');
        credentialButton.textContent = 'Credential Link Coming Soon';
        credentialButton.removeAttribute('href');
        credentialButton.setAttribute('aria-disabled', 'true');
      }

      certificateModal.classList.add('is-open');
      certificateModal.setAttribute('aria-hidden', 'false');
    };

    imageElement.addEventListener('click', () => {
      if (!imageElement.src) {
        return;
      }

      openImageLightbox(imageElement.currentSrc || imageElement.src, imageElement.alt);
    });

    certificateGrid.addEventListener('click', (event) => {
      const cardTrigger = event.target.closest('[data-cert-id]');
      if (!cardTrigger) {
        return;
      }

      const certificate = catalogById.get(cardTrigger.getAttribute('data-cert-id'));
      if (certificate) {
        openCertificateModal(certificate);
      }
    });

    closeModalButtons.forEach((button) => {
      button.addEventListener('click', closeCertificateModal);
    });

    certificateModal.addEventListener('click', (event) => {
      if (event.target === certificateModal) {
        closeCertificateModal();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && certificateModal.classList.contains('is-open')) {
        closeCertificateModal();
      }
    });
  }
}

document.querySelectorAll('.project-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const items = [...carousel.querySelectorAll('.carousel-item')];

  if (!track || items.length === 0) {
    return;
  }

  const autoplayMs = Number(carousel.dataset.autoplayMs) > 0 ? Number(carousel.dataset.autoplayMs) : 5000;

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  const dotButtons = items.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `carousel-dot${index === 0 ? ' is-active' : ''}`;
    dot.setAttribute('aria-label', `Go to screenshot ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dots.appendChild(dot);
    return dot;
  });

  carousel.appendChild(dots);

  const getCurrentIndex = () => {
    const slideWidth = items[0]?.offsetWidth || 0;
    if (!slideWidth) {
      return 0;
    }

    return Math.round(track.scrollLeft / slideWidth);
  };

  const updateDots = (activeIndex) => {
    dotButtons.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex);
    });
  };

  const goToSlide = (index) => {
    const slideWidth = items[0]?.offsetWidth || track.clientWidth || 1;
    const nextIndex = Math.max(0, Math.min(index, items.length - 1));
    track.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' });
    updateDots(nextIndex);
  };

  const scrollByAmount = (direction) => {
    const current = getCurrentIndex();
    const candidate = current + direction;
    const wrapped = candidate < 0 ? items.length - 1 : candidate >= items.length ? 0 : candidate;
    goToSlide(wrapped);
  };

  previousButton?.addEventListener('click', () => scrollByAmount(-1));
  nextButton?.addEventListener('click', () => scrollByAmount(1));

  track.addEventListener('scroll', () => {
    updateDots(getCurrentIndex());
  });

  let autoNextTimer = window.setInterval(() => {
    scrollByAmount(1);
  }, autoplayMs);

  const resetAutoNext = () => {
    window.clearInterval(autoNextTimer);
    autoNextTimer = window.setInterval(() => {
      scrollByAmount(1);
    }, autoplayMs);
  };

  carousel.addEventListener('mouseenter', () => {
    window.clearInterval(autoNextTimer);
  });

  carousel.addEventListener('mouseleave', resetAutoNext);

  carousel.querySelectorAll('[data-expand-image]').forEach((button) => {
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      if (image) {
        openImageLightbox(image.currentSrc || image.src, image.alt);
      }
      resetAutoNext();
    });
  });

  previousButton?.addEventListener('click', resetAutoNext);
  nextButton?.addEventListener('click', resetAutoNext);
});

const modalBackdrop = document.getElementById('welcomeModal');

if (modalBackdrop) {
  const closeButtons = modalBackdrop.querySelectorAll('[data-modal-close], .modal-close');

  const openModal = () => {
    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('welcomeModalSeen', 'true');
  };

  closeButtons.forEach((button) => button.addEventListener('click', closeModal));

  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (sessionStorage.getItem('welcomeModalSeen') !== 'true') {
    window.setTimeout(openModal, 350);
  }
}
