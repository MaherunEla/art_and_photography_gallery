import { useEffect } from "react";
import { signOut } from "next-auth/react";

const LogoutOnClose = () => {
  useEffect(() => {
    const handleBeforeUnload = async (event: any) => {
      // Logout the user before closing the tab
      await signOut();

      // Some browsers require a return value to display a confirmation message
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default LogoutOnClose;
