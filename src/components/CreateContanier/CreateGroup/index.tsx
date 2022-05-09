import React from "react";
import AppLayout from "src/components/shared/layout";
import AppCreateLayout from "src/components/shared/createLayout";

function CreateGroup() {
  return (
    <AppLayout>
      <div className=" w-full h-screen bg-app-background flex gap-2">
        <AppCreateLayout>
          <div className=" m-10 w-full h-full p-2 bg-white shadow-md ">
            Create Teacher
          </div>
        </AppCreateLayout>
      </div>
    </AppLayout>
  );
}

export default CreateGroup;
