import getCurrentUser from "@/actions/getCurrentUser";
import CreateForm from "components/shared/CreateForm";

// This is a server-side function
const Page = async () => {
  const currentUser = await getCurrentUser();

  // If no current user is found, redirect to login page or display a message
  if (!currentUser) {
    return <div>Failed to load user data. Please log in.</div>;
  }

  return <CreateForm user={currentUser} />;
};

export default Page;