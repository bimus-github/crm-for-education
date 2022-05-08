import { RadioGroup } from '@headlessui/react';
import { ROLE } from 'src/models';

const plans = [
  {
    name: 'School owner(Admin)',
    subTitle: 'Sign up as admin of the school',
    role: ROLE.ADMIN,
  },
  {
    name: 'Teacher',
    subTitle: 'Sign up as teacher of the school',
    role: ROLE.TEACHER,
  },
  //   {
  //     name: 'Student',
  //     ram: '32GB',
  //     cpus: '12 CPUs',
  //     disk: '1024 GB SSD disk',
  //   },
];

interface Props {
  selected: ROLE;
  setSelected: (role: ROLE) => void;
}

export const SelectRole = ({ selected, setSelected }: Props) => {
  return (
    <div className='w-full px-4 py-16'>
      <p className='text-lg font-bold text-center mb-4'>Choose your role</p>
      <div className='mx-auto w-full max-w-md'>
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
          <div className='space-y-2'>
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan.role}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked
                      ? 'bg-app-secondary bg-opacity-75 text-white'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='text-sm'>
                          <RadioGroup.Label
                            as='p'
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as='span'
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>{plan.subTitle}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className='shrink-0 text-white'>
                          <CheckIcon className='h-6 w-6' />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
      <path
        d='M7 13l3 3 7-7'
        stroke='#fff'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
