'use strict';

/**
 * Nhlamulo Gemini Hlatywayo - Portfolio Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  /*-----------------------------------*\
    #ELEMENT TOGGLE HELPER
  \*-----------------------------------*/
  const elementToggleFunc = (elem) => {
    elem.classList.toggle('active');
  };

  /*-----------------------------------*\
    #SIDEBAR COLLAPSE FOR MOBILE
  \*-----------------------------------*/
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  const sidebarMore = document.querySelector('[data-sidebar-more]');

  if (sidebarBtn && sidebarMore) {
    sidebarBtn.addEventListener('click', () => {
      sidebarBtn.classList.toggle('active');
      sidebarMore.classList.toggle('active');
    });
  }

  /*-----------------------------------*\
    #PAGE NAVIGATION & TABS
  \*-----------------------------------*/
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pageSections = document.querySelectorAll('[data-page]');

  const activateTab = (targetPageName) => {
    if (targetPageName === 'experience') targetPageName = 'resume';
    let found = false;
    navLinks.forEach((link) => {
      const pageAttr = link.getAttribute('data-nav-link');
      if (pageAttr === targetPageName) {
        link.classList.add('active');
        found = true;
      } else {
        link.classList.remove('active');
      }
    });

    pageSections.forEach((section) => {
      const pageAttr = section.getAttribute('data-page');
      if (pageAttr === targetPageName) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    if (found) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetPage = link.getAttribute('data-nav-link');
      if (targetPage) {
        activateTab(targetPage);
        history.replaceState(null, '', `#${targetPage}`);
      }
    });
  });

  // Check URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    activateTab(hash);
  }

  /*-----------------------------------*\
    #PROJECT FILTERING
  \*-----------------------------------*/
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const projectCards = document.querySelectorAll('[data-filter-item]');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-filter-btn').toLowerCase().trim();

        projectCards.forEach((card) => {
          const cardCategory = (card.getAttribute('data-category') || '').toLowerCase().trim();
          if (selectedCategory === 'all' || cardCategory.includes(selectedCategory)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  /*-----------------------------------*\
    #PROJECT DETAILS DATA & MODAL
  \*-----------------------------------*/
  const projectDetails = {
    'dha-biometric': {
      title: 'DHA Biometric Integration Platform (FNB OCEP)',
      category: 'Enterprise Banking & Gov Integration',
      image: './assets/images/project-1.jpg',
      description: 'A mission-critical enterprise biometric authentication gateway built under FNB\'s OCEP architecture. Seamlessly integrates with the South African Department of Home Affairs (DHA) for real-time customer identity verification, anti-fraud compliance, and high-availability digital onboarding.',
      features: [
        'Integrated DHA national biometric database with strict SLA latency (<1.2s).',
        'Implemented enterprise Java 17 and Spring Boot microservices with Spring Security.',
        'High-availability reactive pipeline handling high-volume customer onboarding requests.',
        'Structured RESTful API verification with Insomnia and comprehensive test suites.',
        'Built compliant UI workflows in Angular for enterprise branch and mobile operations.'
      ],
      techs: ['Java 17', 'Spring Boot', 'Kotlin', 'Angular', 'Apache Kafka', 'MySQL', 'Microsoft Azure', 'Insomnia'],
      demoLink: 'https://github.com/nhlamulo-gemini',
      codeLink: 'https://github.com/nhlamulo-gemini'
    },
    'banking-ets': {
      title: 'Banking Electronic Transaction System (ETS Pipeline)',
      category: 'High-Throughput Streaming & Banking',
      image: './assets/images/project-2.png',
      description: 'An enterprise-scale financial transaction streaming engine designed for high throughput, zero data loss, and real-time reconciliation. Built using Kotlin, Spring Boot, and Apache Kafka for asynchronous event streaming.',
      features: [
        'Engineered distributed Kafka event streaming pipeline for transaction processing.',
        'Optimized MySQL relational database indexing, reducing query latencies by 35%.',
        'Built end-to-end unit and integration tests using IntelliJ IDEA and JUnit/Mockito.',
        'Configured cross-platform deployment targeting Windows, macOS, and Linux servers.',
        'Monitored and resolved critical production bugs through Agile sprint cycles.'
      ],
      techs: ['Kotlin', 'Java', 'Spring Boot', 'Apache Kafka', 'MySQL', 'IntelliJ IDEA', 'Docker'],
      demoLink: 'https://github.com/nhlamulo-gemini',
      codeLink: 'https://github.com/nhlamulo-gemini'
    },
    'enterprise-ikms': {
      title: 'Enterprise Knowledge Management System (IKMS)',
      category: 'Enterprise Web Applications',
      image: './assets/images/project-7.png',
      description: 'A modular enterprise information portal engineered during the Geeks4learning / FNB programme to streamline internal documentation, code knowledge bases, and core business process workflows.',
      features: [
        'Developed end-to-end modules connecting Java backend services to responsive Angular frontends.',
        'Integrated IKMS core business logic module with role-based security permissions.',
        'Created rich analytical summaries for team performance, code updates, and ticket resolution.',
        'Established structured Agile code reviews and git collaboration best practices.'
      ],
      techs: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'HTML5', 'CSS3', 'Agile'],
      demoLink: 'https://github.com/nhlamulo-gemini',
      codeLink: 'https://github.com/nhlamulo-gemini'
    },
    'cyberguard-security': {
      title: 'CyberGuard Threat & Incident Response Platform',
      category: 'Cybersecurity & Cloud',
      image: './assets/images/project-6.png',
      description: 'A comprehensive cybersecurity risk monitoring and incident tracking platform inspired by Cisco CCNA CyberOps principles and Ethical Hacking methodologies developed during Go Fourth Learning.',
      features: [
        'Continuous risk evaluation and vulnerability tracking with automated alert triggers.',
        'Incident response management workflow to log, isolate, and remediate security events.',
        'Cloud infrastructure monitoring deployed with Microsoft Azure security controls.',
        'Network data integrity auditing based on Cisco Networking Essentials standards.'
      ],
      techs: ['Python', 'Microsoft Azure', 'Cisco CyberOps', 'REST APIs', 'Network Security', 'Postman'],
      demoLink: 'https://github.com/nhlamulo-gemini',
      codeLink: 'https://github.com/nhlamulo-gemini'
    },
    'fintrack-analytics': {
      title: 'FinTrack Wealth & Expense Management Dashboard',
      category: 'Full-Stack Web Development',
      image: './assets/images/project-5.png',
      description: 'A modern, interactive personal finance management dashboard enabling users to track expenditures, analyze cash flow trends, and set algorithmic budget alerts.',
      features: [
        'Modern reactive user interface with dynamic charts and visual budget tracking.',
        'RESTful API services for multi-account syncing and categorization.',
        'Fully responsive design optimized for mobile smartphones, tablets, and high-res desktops.',
        'Cross-browser tested with zero layout shifts and accessibility compliance.'
      ],
      techs: ['Angular', 'JavaScript', 'TypeScript', 'CSS3', 'RESTful APIs', 'UI/UX Design'],
      demoLink: 'https://github.com/nhlamulo-gemini',
      codeLink: 'https://github.com/nhlamulo-gemini'
    },
    'azure-microservices': {
      title: 'Azure Cloud Microservices & Task Orchestrator',
      category: 'Cloud Ecosystem & APIs',
      image: './assets/images/project-8.jpg',
      description: 'A scalable cloud-native microservices architecture hosted on Microsoft Azure featuring automated task scheduling, background worker orchestration, and API gateways.',
      features: [
        'Designed microservice endpoints using C# / ASP.NET Core and Java Spring Boot.',
        'Comprehensive API test suites configured in Insomnia and Postman.',
        'Continuous delivery pipeline with automated container builds and health checks.',
        'Standardized incident reporting and observability metrics.'
      ],
      techs: ['C#', 'ASP.NET Core', 'Microsoft Azure', 'Java', 'Insomnia', 'Postman'],
      demoLink: 'https://github.com/nhlamulo-gemini',
      codeLink: 'https://github.com/nhlamulo-gemini'
    }
  };

  const modalBackdrop = document.querySelector('[data-project-modal]');
  const modalCloseBtn = document.querySelector('[data-modal-close]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalCat = document.querySelector('[data-modal-cat]');
  const modalDesc = document.querySelector('[data-modal-desc]');
  const modalFeatures = document.querySelector('[data-modal-features]');
  const modalTechs = document.querySelector('[data-modal-techs]');
  const modalDemo = document.querySelector('[data-modal-demo]');
  const modalCode = document.querySelector('[data-modal-code]');

  const openProjectModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data || !modalBackdrop) return;

    if (modalImg) modalImg.src = data.image;
    if (modalImg) modalImg.alt = data.title;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCat) modalCat.textContent = data.category;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    }

    if (modalTechs) {
      modalTechs.innerHTML = data.techs.map(t => `<span class="project-tech">${t}</span>`).join('');
    }

    if (modalDemo) modalDemo.href = data.demoLink;
    if (modalCode) modalCode.href = data.codeLink;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach modal trigger to buttons
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-open-modal');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /*-----------------------------------*\
    #TOAST NOTIFICATION & CLIPBOARD COPY
  \*-----------------------------------*/
  const showToast = (message) => {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  const copyBtns = document.querySelectorAll('[data-copy]');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  const fallbackCopy = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied: ${text}`);
  };

  /*-----------------------------------*\
    #CONTACT FORM HANDLER
  \*-----------------------------------*/
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[name="fullname"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const msgInput = contactForm.querySelector('textarea[name="message"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
        showToast('Please fill out all fields before sending.');
        return;
      }

      showToast(`Thank you, ${nameInput.value}! Your message has been received.`);
      contactForm.reset();
    });
  }

});