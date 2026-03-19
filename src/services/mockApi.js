import {
  analytics,
  demoUsers,
  helpArticles,
  notifications,
  projects,
  teamMembers
} from "../data/mockData";

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectApi = {
  async getAll() {
    await delay();
    return projects;
  },
  async getById(id) {
    await delay();
    return projects.find((project) => project.id === id) ?? null;
  },
  async getDashboardStats() {
    await delay();
    const compliant = projects.filter((item) => item.status === "Compliant").length;
    const critical = projects.filter((item) => item.status === "Critical").length;
    const average =
      Math.round(
        projects.reduce((total, item) => total + item.complianceScore, 0) /
          projects.length
      ) || 0;

    return {
      totalProjects: projects.length,
      averageCompliance: average,
      compliantProjects: compliant,
      criticalProjects: critical,
      pendingActions: projects.reduce((total, item) => total + item.pendingActions, 0)
    };
  }
};

export const dashboardApi = {
  async getNotifications() {
    await delay();
    return notifications;
  },
  async getTeam() {
    await delay();
    return teamMembers;
  },
  async getAnalytics() {
    await delay();
    return analytics;
  },
  async getHelpArticles() {
    await delay();
    return helpArticles;
  }
};

export const authApi = {
  async getPresetUsers() {
    await delay(150);
    return demoUsers;
  }
};
