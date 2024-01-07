import ProtectedRoute from "@/utils/ProtectedRoute";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      {children}
      {/* <ProtectedRoute>
        {children}
      </ProtectedRoute> */}
    </div>
  );
};
export default ProfileLayout;
