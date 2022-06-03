import AppLayout from "src/components/shared/layout";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { Group, ROLE, User } from "src/models";

function CashRegister() {
  const dispatch = useAppDispatch();

  const usersSlices = useAppSelector((u) => u.usersSlice);

  const students = Object.values(usersSlices).filter(
    (s) => s.role === ROLE.STUDENT
  );

  return (
    <AppLayout>
      <div className="w-screen h-screen flex items-center justify-center p-10 bg-app-background">
        <div className="w-full h-full bg-white shadow-md"></div>
      </div>
    </AppLayout>
  );
}

export default CashRegister;
