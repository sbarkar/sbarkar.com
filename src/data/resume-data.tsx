import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Sergej Barkar",
  initials: "SB",
  location: "Zürich, Switzerland, CET",
  locationLink: "https://www.google.com/maps/place/Zürich",
  about:
    "I solve important problems with data.",
  summary:
    "An innovative tech entrepreneur and visionary leader, driving global sustainability through cutting-edge data-centric solutions and cultivating a culture of innovation and excellence. I have over 12 years of experience in technology and leadership working with companies in the UK, Europe, Australia and the US.",
  avatarUrl: "https://avatars.githubusercontent.com/u/47544355?v=4",
  personalWebsiteUrl: "https://sbarkar.com",
  contact: {
    email: "contact@sbarkar.com",
    tel: "+41798758379",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/sbarkar",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sbarkar/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://twitter.com/sbarkar_",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "City, University of London",
      degree: "Bachelor's Degreee in Computer Science with Artificial Intelligence",
      start: "2011",
      end: "2014",
    },
  ],
  work: [
    {
      company: "Transparency as a Service AG",
      link: "https://taas-ag.com",
      badges: ["Zürich, Switzerland"],
      title: "Founder & CEO",
      /*logo: ParabolLogo,*/
      start: "2023",
      end: "2024",
      description:
        "Spearheaded the creation and expansion of a blockchain-based platform for enhancing supply chain transparency and quality control, driving the company to serve over 40 companies globally within a year, while fostering a culture of innovation and securing full compliance with major data protection and sustainability standards.",
    },
    {
      company: "InterWorks",
      link: "https://interworks.com",
      badges: ["Zürich & Sydney"],
      title: "Region Lead",
      /*logo: ParabolLogo,*/
      start: "2021",
      end: "2023",
      description:
        "Drove significant growth in the APAC and EMEA markets through leadership in cloud architecture and team management, directly contributing to a notable increase in revenue and client satisfaction by pioneering automation solutions and strategic project leadership in key industries.",
    },
    {
      company: "InterWorks",
      link: "https://interworks.com",
      badges: ["Sydney, Australia"],
      title: "Solutions Lead",
      /*logo: ParabolLogo,*/
      start: "2021",
      end: "2021",
      description: "Championed the development and implementation of comprehensive business intelligence strategies, driving seamless integration of cross-platform analytics solutions to deliver consistent, high-impact user experiences and fortify client business outcomes in a competitive market.",
    },
    {
      company: "InterWorks",
      link: "https://interworks.com",
      badges: ["Sydney, Australia"],
      title: "Platforms Architect",
      /*logo: ParabolLogo,*/
      start: "2020",
      end: "2021",
      description: "Pioneered advanced analytics infrastructure, harmonising on-premise and cloud ecosystems to elevate performance, security, and data accessibility, while optimising high-availability and disaster recovery strategies to support scalable growth and future-proofing the analytics landscape.",
    },
    {
      company: "InterWorks",
      link: "https://interworks.com",
      badges: ["Sydney, Australia"],
      title: "Senior Analytics Consultant",
      /*logo: ParabolLogo,*/
      start: "2018",
      end: "2020",
      description: "Orchestrated a convergence of data analytics and business strategy, fostering a culture of data-driven decision making, enhancing BI platform adoption, and spearheading change management to ensure agile and impactful analytics practices.",
    },
    {
      company: "Javelin Group (part of Accenture Strategy)",
      link: "https://www.javelingroup.com/",
      badges: ["London, UK"],
      title: "Senior Analytics Consultant",
      /*logo: ParabolLogo,*/
      start: "2016",
      end: "2018",
      description: "Strategically guided cross-platform analytics integration, tailored education and community building within teams, and implemented comprehensive data analytics platforms, driving transformative business intelligence solutions and user experience optimisation for the largest retailers on the planet.",
    },
    {
      company: "InterWorks",
      link: "https://interworks.com",
      badges: ["London, UK"],
      title: "Senior Analytics Consultant",
      /*logo: ParabolLogo,*/
      start: "2015",
      end: "2016",
      description: "Led advanced data analysis initiatives, devising comprehensive business intelligence solutions and Tableau visualisations, overseeing data governance, and articulating data-driven strategies to stakeholders, facilitating organisation-wide upskilling in data literacy.",
    },
    {
      company: "InterWorks",
      link: "https://interworks.com",
      badges: ["London, UK"],
      title: "Analytics Consultant",
      /*logo: ParabolLogo,*/
      start: "2014",
      end: "2015",
      description: "Synthesised complex datasets into strategic insights using Tableau, crafting interactive dashboards for informed decision-making, while ensuring database accuracy and contributing to the organisation's data strategy.",
    },
    {
      company: "BarkOne Consulting",
      link: "https://barkone.co.uk",
      badges: ["London, UK"],
      title: "Foudner & CEO",
      /*logo: ParabolLogo,*/
      start: "2013",
      end: "2014",
      description: "Established and led an IT consultancy, delivering bespoke software solutions and driving business growth through strategic leadership.",
    },
  ],
  skills: [
    "Leadership",
    "Communication",
    "Team Management",
    "Sales",
    "Strategy",
    "Supply Chain",
    "Marketing",
    "Cloud",
    "Architecture",
    "Change Management",
    "Business Intelligence",
    "Data Governance",
    "Data Literacy",
    "Data Visualisation",
    "Data Warehousing",
    "ETL",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",
    "Data Engineering",
    "Analytics",
    "Enablement",
  ],
  languages: [
    "English - C2",
    "Slovak - Native",
    "Czech - Native",
    "Russian - C1",
    "German - B1",
  ],
  projects: [
    {
      title: "Transparency as a Service AG",
      techStack: ["Startup", "Sales", "GTM", "Blockchain", "Supply Chain", "Sustainability", "Marketing"],
      description:
        "Platform to automate gathering of sustainability data from agricultural supply chains and fighting counterfeit products",
      link: {
        label: "taas-ag.com",
        href: "https://taas-ag.com/",
      },
    },
    {
      title: "InterWorks Translate",
      techStack: [
        "Python",
        "Lambda",
        "API Gateway",
        "Tableau",
      ],
      description: "A serverless application that translates Tableau workbooks and dashboards",
      link: {
        label: "GitHub",
        href: "https://github.com/sbarkar/InterWorks-Translate",
      },
    },
    {
      title: "Tableau Server Remote",
      techStack: ["Side Project", "AWS", "Swift", "Tableau"],
      description:
        "iOS app that allows to control Tableau Server from your iPhone",
    },
    {
      title: "sbarkar.com",
      techStack: ["Side Project", "Next.js", "Vercel"],
      description:
        "My personal CV website",
      link: {
        label: "sbarkar.com",
        href: "https://sbarkar.com/",
      },
    },
    {
      title: "CircleMeal",
      techStack: ["Side Project", "Next.js", "Typescript", "Vercel", "TailwindCSS", "PostgreSQL"],
      description:
        "Platform for curated 1 on 1 meals with interesting people",
      link: {
        label: "CircleMeal",
        href: "https://circlemeal.com/",
      },
    },
    {
      title: "WebOS",
      techStack: ["Side Project", "JavaScript", "Typescript", "CSS", "HTML", "GLSL"],
      description:
        "Fully functioning desktop environment in the browser and yes you can play DOOM in it",
      link: {
        label: "X Barkar Dev",
        href: "https://x.barkar.dev/",
      },
    },
    {
      title: "b33group.com",
      techStack: ["Side Project", "JavaScript", "Wordpress"],
      description:
        "A website for an interior design studio",
      link: {
        label: "B33 Group",
        href: "https://b33group.com/",
      },
    },
  ],
} as const;
