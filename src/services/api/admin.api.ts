import apiClient from "@/services/api/client";
import {
  normalizeAdminWithdrawalsResult,
  normalizeWithdrawalRequest,
} from "@/lib/wallet";
import type { ApiResponse } from "@/types/api.types";
import type {
  AdminDashboardMetrics,
  AdminPostItem,
  AdminPostsResult,
  AdminTransactionItem,
  AdminTransactionsResult,
  AdminUserListItem,
  AdminUsersResult,
  ContentAgentConfig,
  ContentAgentConfigsResult,
  ContentAgentRunDetail,
  ContentAgentRunsResult,
  CreateContentAgentConfigPayload,
  UpdateContentAgentConfigPayload,
} from "@/types/admin.types";
import type {
  AdminWithdrawalsResult,
  WithdrawalRequest,
} from "@/types/wallet.types";

function toNumber(value: number | string | null | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    return Number(value);
  }

  return 0;
}

function normalizeAdminUser(item: AdminUserListItem): AdminUserListItem {
  return {
    ...item,
    wallet: item.wallet
      ? {
          balance: toNumber(item.wallet.balance),
          totalEarned: toNumber(item.wallet.totalEarned),
          totalSpent: toNumber(item.wallet.totalSpent),
        }
      : null,
  };
}

function normalizeAdminTransaction(item: AdminTransactionItem): AdminTransactionItem {
  return {
    ...item,
    amount: toNumber(item.amount),
  };
}

function normalizeAdminPost(item: AdminPostItem): AdminPostItem {
  return {
    ...item,
    viewCount: toNumber(item.viewCount),
  };
}

export const adminApi = {
  async getDashboard() {
    const response = await apiClient.get<ApiResponse<AdminDashboardMetrics>>("/admin/dashboard");
    return {
      ...response.data.data,
      revenue: toNumber(response.data.data.revenue),
    };
  },

  async getUsers() {
    const response = await apiClient.get<ApiResponse<AdminUsersResult>>("/admin/users");
    return {
      items: response.data.data.items.map((item) => normalizeAdminUser(item)),
    };
  },

  async banUser(userId: string, reason?: string) {
    const response = await apiClient.post<ApiResponse<{ banned: boolean }>>(
      `/admin/users/${userId}/ban`,
      {
        reason,
      },
    );

    return response.data.data;
  },

  async unbanUser(userId: string) {
    const response = await apiClient.post<ApiResponse<{ banned: boolean }>>(
      `/admin/users/${userId}/unban`,
      {},
    );

    return response.data.data;
  },

  async getTransactions() {
    const response = await apiClient.get<ApiResponse<AdminTransactionsResult>>("/admin/transactions");
    return {
      items: response.data.data.items.map((item) => normalizeAdminTransaction(item)),
    };
  },

  async getPosts() {
    const response = await apiClient.get<ApiResponse<AdminPostsResult>>("/admin/posts");
    return {
      items: response.data.data.items.map((item) => normalizeAdminPost(item)),
    };
  },

  async approvePost(postId: string) {
    const response = await apiClient.patch<ApiResponse<AdminPostItem>>(
      `/admin/posts/${postId}/approve`,
      {},
    );

    return normalizeAdminPost(response.data.data);
  },

  async rejectPost(postId: string) {
    const response = await apiClient.patch<ApiResponse<AdminPostItem>>(
      `/admin/posts/${postId}/reject`,
      {},
    );

    return normalizeAdminPost(response.data.data);
  },

  async getWithdrawals() {
    const response = await apiClient.get<ApiResponse<AdminWithdrawalsResult>>("/admin/withdrawals");
    return normalizeAdminWithdrawalsResult(response.data.data);
  },

  async approveWithdrawal(withdrawalId: string) {
    const response = await apiClient.patch<ApiResponse<WithdrawalRequest>>(
      `/admin/withdrawals/${withdrawalId}/approve`,
      {},
    );

    return normalizeWithdrawalRequest(response.data.data);
  },

  async rejectWithdrawal(withdrawalId: string) {
    const response = await apiClient.patch<ApiResponse<WithdrawalRequest>>(
      `/admin/withdrawals/${withdrawalId}/reject`,
      {},
    );

    return normalizeWithdrawalRequest(response.data.data);
  },

  async getContentAgentConfigs() {
    const response = await apiClient.get<ApiResponse<ContentAgentConfigsResult>>(
      "/admin/content-agent/configs",
    );

    return response.data.data;
  },

  async createContentAgentConfig(payload: CreateContentAgentConfigPayload) {
    const response = await apiClient.post<ApiResponse<ContentAgentConfig>>(
      "/admin/content-agent/configs",
      payload,
    );

    return response.data.data;
  },

  async updateContentAgentConfig(configId: string, payload: UpdateContentAgentConfigPayload) {
    const response = await apiClient.patch<ApiResponse<ContentAgentConfig>>(
      `/admin/content-agent/configs/${configId}`,
      payload,
    );

    return response.data.data;
  },

  async triggerContentAgentRun(configId: string) {
    const response = await apiClient.post<ApiResponse<ContentAgentRunDetail>>(
      `/admin/content-agent/configs/${configId}/trigger`,
      {},
    );

    return response.data.data;
  },

  async getContentAgentRuns(configId?: string, limit = 10) {
    const response = await apiClient.get<ApiResponse<ContentAgentRunsResult>>(
      "/admin/content-agent/runs",
      {
        params: {
          configId,
          limit,
        },
      },
    );

    return response.data.data;
  },

  async getContentAgentRun(runId: string) {
    const response = await apiClient.get<ApiResponse<ContentAgentRunDetail>>(
      `/admin/content-agent/runs/${runId}`,
    );

    return response.data.data;
  },

  async retryContentAgentRun(runId: string) {
    const response = await apiClient.post<ApiResponse<ContentAgentRunDetail>>(
      `/admin/content-agent/runs/${runId}/retry`,
      {},
    );

    return response.data.data;
  },
};
