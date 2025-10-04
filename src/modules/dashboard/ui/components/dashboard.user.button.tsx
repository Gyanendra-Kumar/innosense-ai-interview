import { authClient } from "../../../../lib/auth-client";

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return null;
  }

  return <div>user button</div>;
};

export default DashboardUserButton;
