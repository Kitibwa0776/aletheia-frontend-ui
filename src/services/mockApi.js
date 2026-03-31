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
  },

  async register(userData) {
    const API_URL = "http://127.0.0.1:8000/api/v1/auth/register/";

    console.log("🔗 Calling registration API:", API_URL);
    console.log("📤 Payload being sent:", {
      first_name: userData.name.split(" ")[0],
      last_name: userData.name.split(" ")[1] || "",
      email: userData.email,
      username: userData.name.toLowerCase().replace(/\s+/g, "_"),
      password: "***",
      role: userData.role
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: userData.name.split(" ")[0],
          last_name: userData.name.split(" ")[1] || "",
          email: userData.email,
          username: userData.name.toLowerCase().replace(/\s+/g, "_"),
          password: userData.password,
          role: userData.role
        })
      });

      console.log("📥 API Response status:", response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error("❌ API Error response:", error);
        throw new Error(error.detail || error.email?.[0] || "Registration failed");
      }

      const data = await response.json();
      console.log("✅ Registration successful! API returned:", {
        user: data.user,
        access: "***JWT***",
        refresh: "***JWT***"
      });

      return {
        user: data.user,
        access: data.access,
        refresh: data.refresh
      };
    } catch (error) {
      console.error("💥 API fetch error:", error.message);
      throw new Error(error.message || "Failed to connect to registration service");
    }
  }
};
