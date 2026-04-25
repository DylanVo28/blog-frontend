import type { BackendTransactionRecord, TransactionStatus, TransactionType } from "@/types/wallet.types";
import type { PostStatus } from "@/types/post.types";
import type { UserProfile, UserRole } from "@/types/user.types";

export interface AdminDashboardMetrics {
  users: number;
  posts: number;
  questions: number;
  revenue: number;
}

export interface AdminUserWalletSummary {
  balance: number;
  totalEarned: number;
  totalSpent: number;
}

export interface AdminUserSummary {
  id: string;
  email: string | null;
  username?: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  role: UserRole;
}

export interface AdminUserListItem extends UserProfile {
  wallet: AdminUserWalletSummary | null;
}

export interface AdminUsersResult {
  items: AdminUserListItem[];
}

export interface AdminTransactionItem
  extends Omit<BackendTransactionRecord, "amount" | "type" | "status"> {
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  sender: AdminUserSummary | null;
  receiver: AdminUserSummary | null;
}

export interface AdminTransactionsResult {
  items: AdminTransactionItem[];
}

export interface AdminPostItem {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  contentPlain: string | null;
  coverImage: string | null;
  status: PostStatus;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: AdminUserSummary | null;
}

export interface AdminPostsResult {
  items: AdminPostItem[];
}

export type ContentAgentPublishMode = "draft_only" | "auto_publish" | "review_required";

export type ContentAgentRunStatus =
  | "queued"
  | "researching"
  | "generating"
  | "validating"
  | "draft_created"
  | "skipped"
  | "failed";

export type ContentAgentTriggerSource = "schedule" | "manual";

export interface ContentAgentCitation {
  title: string;
  url: string;
  domain: string;
}

export interface ContentAgentConfig {
  id: string;
  name: string;
  enabled: boolean;
  timezone: string;
  scheduleHour: number;
  scheduleMinute: number;
  topics: string[];
  sourceAllowlist: string[];
  publishMode: ContentAgentPublishMode;
  systemAuthorId: string | null;
  defaultCategoryId: string | null;
  defaultTagIds: string[];
  writingStyle: string | null;
  maxArticleAgeHours: number;
  maxResearchItems: number;
  lastScheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContentAgentConfigsResult {
  items: ContentAgentConfig[];
}

export interface ContentAgentRunSummary {
  id: string;
  configId: string;
  scheduledFor: string;
  triggerSource: ContentAgentTriggerSource;
  status: ContentAgentRunStatus;
  failureReason: string | null;
  selectedResearchItemId: string | null;
  draftPostId: string | null;
  draftTitle: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContentAgentRunsResult {
  items: ContentAgentRunSummary[];
}

export interface ContentAgentResearchItem {
  id: string;
  runId: string;
  sourceType: string;
  sourceUrl: string;
  canonicalUrl: string;
  sourceDomain: string;
  title: string;
  summary: string | null;
  contentText: string | null;
  topic: string | null;
  publishedAt: string | null;
  finalScore: number;
  rankingReasons: Record<string, unknown>;
  isSelected: boolean;
  createdAt: string;
}

export interface ContentAgentRunDetail {
  run: ContentAgentRunSummary & {
    idempotencyKey: string;
    draftExcerpt: string | null;
    draftContent: Record<string, unknown> | null;
    draftContentPlain: string | null;
    citations: ContentAgentCitation[];
    validationResult: Record<string, unknown>;
    metadata: Record<string, unknown>;
  };
  researchItems: ContentAgentResearchItem[];
}

export interface UpdateContentAgentConfigPayload {
  name?: string;
  enabled?: boolean;
  timezone?: string;
  scheduleHour?: number;
  scheduleMinute?: number;
  topics?: string[];
  sourceAllowlist?: string[];
  publishMode?: ContentAgentPublishMode;
  systemAuthorId?: string | null;
  defaultCategoryId?: string | null;
  defaultTagIds?: string[];
  writingStyle?: string | null;
  maxArticleAgeHours?: number;
  maxResearchItems?: number;
}

export interface CreateContentAgentConfigPayload extends UpdateContentAgentConfigPayload {
  name: string;
}
