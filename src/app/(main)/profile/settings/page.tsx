import type { Metadata } from "next";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

export const metadata: Metadata = {
  title: "Profile settings",
  description: "Update your Inkline public profile, avatar, and payout information.",
};

export default function ProfileSettingsPage() {
  return (
    <AuthGuard>
      <EditProfileForm />
    </AuthGuard>
  );
}
