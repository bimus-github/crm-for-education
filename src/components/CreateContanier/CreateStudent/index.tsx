import React from 'react';
import AppLayout from 'src/components/shared/layout';
import AppCreateLayout from 'src/components/shared/createLayout';

function CreateStudent() {
  return (
    <AppLayout>
      <AppCreateLayout>
        <div className='w-full h-full bg-white shadow-md'>Create Student</div>
      </AppCreateLayout>
    </AppLayout>
  );
}

export default CreateStudent;
