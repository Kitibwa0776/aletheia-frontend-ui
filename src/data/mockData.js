export const demoUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "2300810607@std.kyu.ac.ug",
    role: "admin",
    company: "Aletheia AI"
  },
  {
    id: 2,
    name: "Compliance Officer",
    email: "officer@mining.ug",
    role: "compliance_officer",
    company: "Uganda Mining Corp"
  },
  {
    id: 3,
    name: "Project Manager",
    email: "manager@mining.ug",
    role: "project_manager",
    company: "East Africa Minerals"
  },
  {
    id: 4,
    name: "External Auditor",
    email: "auditor@mining.ug",
    role: "auditor",
    company: "Regional Audit Partners"
  }
];

export const projects = [
  {
    id: "PRJ-001",
    name: "Karamoja Gold Mine",
    company: "Uganda Mining Corp",
    location: "Moroto, Uganda",
    phase: "Exploration",
    mineral: "Gold",
    complianceScore: 87,
    status: "Compliant",
    riskLevel: "Low",
    reports: 5,
    pendingActions: 2,
    lastUpdated: "2026-03-10",
    owner: "Compliance Officer",
    summary:
      "Active exploration project with strong documentation coverage and timely report submissions.",
    keyFindings: [
      "Environmental baseline report submitted",
      "Site mapping records are complete",
      "Quarterly compliance review passed"
    ]
  },
  {
    id: "PRJ-002",
    name: "Tororo Phosphate Project",
    company: "East Africa Minerals",
    location: "Tororo, Uganda",
    phase: "Feasibility",
    mineral: "Phosphate",
    complianceScore: 65,
    status: "Needs Review",
    riskLevel: "Medium",
    reports: 3,
    pendingActions: 5,
    lastUpdated: "2026-03-14",
    owner: "Project Manager",
    summary:
      "The project is progressing, but several compliance documents need revision before approval.",
    keyFindings: [
      "Community engagement log missing signatures",
      "One land access document is outdated",
      "Waste handling checklist needs re-submission"
    ]
  },
  {
    id: "PRJ-003",
    name: "Kilembe Copper Mine",
    company: "Uganda Copper Ltd",
    location: "Kasese, Uganda",
    phase: "Development",
    mineral: "Copper",
    complianceScore: 48,
    status: "Critical",
    riskLevel: "High",
    reports: 1,
    pendingActions: 9,
    lastUpdated: "2026-03-17",
    owner: "Admin User",
    summary:
      "This project requires urgent follow-up due to low compliance score and unresolved action points.",
    keyFindings: [
      "Health and safety evidence incomplete",
      "Drill site records not fully uploaded",
      "Inspection response overdue"
    ]
  },
  {
    id: "PRJ-004",
    name: "Hoima Limestone Block",
    company: "Nile Extractives",
    location: "Hoima, Uganda",
    phase: "Licensing",
    mineral: "Limestone",
    complianceScore: 74,
    status: "In Progress",
    riskLevel: "Medium",
    reports: 4,
    pendingActions: 3,
    lastUpdated: "2026-03-12",
    owner: "External Auditor",
    summary:
      "Licensing package is close to completion with only a few regulatory clarifications remaining.",
    keyFindings: [
      "Geological summary accepted",
      "Permit history tracked correctly",
      "Transport plan needs clarification"
    ]
  }
];

export const notifications = [
  {
    id: 1,
    title: "Compliance alert raised",
    message: "Kilembe Copper Mine moved into critical status after the latest review.",
    time: "10 minutes ago",
    category: "alert"
  },
  {
    id: 2,
    title: "New report uploaded",
    message: "Karamoja Gold Mine uploaded a fresh quarterly report for review.",
    time: "1 hour ago",
    category: "update"
  },
  {
    id: 3,
    title: "Team comment added",
    message: "A project manager added a note to Tororo Phosphate Project.",
    time: "Today",
    category: "team"
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Admin User",
    role: "Administrator",
    department: "Platform Operations",
    status: "Available"
  },
  {
    id: 2,
    name: "Compliance Officer",
    role: "Compliance Officer",
    department: "Field Compliance",
    status: "Reviewing"
  },
  {
    id: 3,
    name: "Project Manager",
    role: "Project Manager",
    department: "Exploration Programs",
    status: "Available"
  },
  {
    id: 4,
    name: "External Auditor",
    role: "Auditor",
    department: "Independent Assurance",
    status: "Remote"
  }
];

export const analytics = [
  { label: "Compliant", value: 42 },
  { label: "Needs Review", value: 28 },
  { label: "In Progress", value: 18 },
  { label: "Critical", value: 12 }
];

export const helpArticles = [
  "How to upload a mining report",
  "Understanding compliance score bands",
  "How role permissions work",
  "Preparing documents before review",
  "Tracking action items after an audit"
];
