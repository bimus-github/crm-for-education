import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CASE, Group, ROLE, User } from "src/models";
import teachers from "src/store/features/teachers";
import { useAppSelector } from "src/store/hooks";
import { FormatPhoneNumber } from "../../formatPhoneNumber";
import { AllMonthlyBill, monthlyBill } from "../../monthlyBill";
import OpenInfoGroup from "../group";
import OpenInfoTeacher from "../teacher";

interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  item: any;
}
export default function OpenInfoStudent({ isOpen, setIsOpen, item }: Props) {
  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  const [teacher, setTeacher] = useState<User>();
  const [openTeacherModal, setOpenTeacherModal] = useState<boolean>(false);

  const [group, setGroup] = useState<Group>();
  const [openInfoGroup, setOpenInfoGroup] = useState<boolean>(false);

  const onInfoTeacher = (t: User) => {
    setTeacher(t);
    setOpenTeacherModal(true);
  };

  const openModaInfoGroup = (i: Group) => {
    setGroup(i);
    setOpenInfoGroup(true);
  };

  useEffect(() => {
    setIsOpenInfoTeacher(openTeacherModal);
    setIsOpenInfoGroup(openInfoGroup);
  }, []);

  const setIsOpenInfoTeacher = (i: any) => {
    setOpenTeacherModal(i);
  };

  const setIsOpenInfoGroup = (i: any) => {
    setOpenInfoGroup(i);
  };

  let groups = Object.values(groupsSlice)?.filter(
    (g) => g.school === schoolSlice.id
  );

  let students = Object.values(usersSlices)?.filter(
    (s) => s.role === ROLE.STUDENT && s.case === CASE.existent
  );

  let teachers = Object.values(usersSlices)?.filter(
    (s) => s.role === ROLE.TEACHER
  );

  return (
    <>
      <OpenInfoTeacher
        isOpen={openTeacherModal}
        setIsOpen={(i: any) => setIsOpenInfoTeacher(i)}
        item={teacher}
      />
      <OpenInfoGroup
        isOpen={openInfoGroup}
        setIsOpen={(i: any) => setIsOpenInfoGroup(i)}
        item={group}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" flex flex-col items-start justify-start w-[700px] h-[600px] transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  flex-[1] w-full text-center font-medium leading-6 text-gray-900"
                  >
                    Student
                  </Dialog.Title>
                  <div className="mt-5  flex-[18] overflow-auto snap-normal w-full flex flex-col items-center justify-start gap-6 p-2">
                    <div className="w-[600px] h-[45px] flex items-center justify-center">
                      <img
                        src={item?.img}
                        className="h-[45px] w-[45px] shadow-md  rounded-full hover:relative hover:shadow-xl  hover:w-[200px] hover:h-[200px] hover:top-[70px]"
                      />
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          First Name
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.firstName}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Last Name
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Teacher
                        </p>
                      </div>
                      <div
                        onDoubleClick={() =>
                          onInfoTeacher(
                            teachers?.filter((t) => t?.id === item?.teacher)[0]
                          )
                        }
                        className="w-[40%] h-full flex items-center justify-center"
                      >
                        <img
                          src={
                            teachers?.filter((t) => t?.id === item?.teacher)[0]
                              ?.img
                          }
                          className=" h-[30px] w-[30px] rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                        />
                        <p className="text-black font-serif font-normal capitalize">
                          {
                            teachers?.filter((t) => t?.id === item?.teacher)[0]
                              ?.firstName
                          }
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Group
                        </p>
                      </div>
                      <div
                        onDoubleClick={() =>
                          openModaInfoGroup(
                            groups.filter((t) => t?.id === item?.group)[0]
                          )
                        }
                        className="w-[40%] h-full flex items-center justify-center"
                      >
                        <p className="text-black font-serif font-normal capitalize">
                          {
                            groups?.filter((t) => t?.id === item?.group)[0]
                              ?.name
                          }
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Phone
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex flex-col items-center justify-center">
                        <p>
                          {`${
                            FormatPhoneNumber(
                              Math.floor(Number(item?.phone) / 1000000000)
                            ).code
                          } 
                                ${
                                  FormatPhoneNumber(
                                    Math.floor(Number(item?.phone) / 1000000000)
                                  ).oneThree
                                } 
                                ${
                                  FormatPhoneNumber(
                                    Math.floor(Number(item?.phone) / 1000000000)
                                  ).fourFive
                                } 
                                ${
                                  FormatPhoneNumber(
                                    Math.floor(Number(item?.phone) / 1000000000)
                                  ).sixSeven
                                } 
                                `}
                        </p>
                        <p>
                          {`${
                            FormatPhoneNumber(
                              Number(item?.phone) -
                                Math.floor(Number(item?.phone) / 1000000000) *
                                  1000000000
                            ).code
                          } 
                            ${
                              FormatPhoneNumber(
                                Number(item?.phone) -
                                  Math.floor(Number(item?.phone) / 1000000000) *
                                    1000000000
                              ).oneThree
                            } 
                            ${
                              FormatPhoneNumber(
                                Number(item?.phone) -
                                  Math.floor(Number(item?.phone) / 1000000000) *
                                    1000000000
                              ).fourFive
                            } 
                            ${
                              FormatPhoneNumber(
                                Number(item?.phone) -
                                  Math.floor(Number(item?.phone) / 1000000000) *
                                    1000000000
                              ).sixSeven
                            } 
                            `}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          About
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.about}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Discount
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {monthlyBill(item, groups)?.discount}%
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Price
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {monthlyBill(item, groups)?.price}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Paid
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {monthlyBill(item, groups)?.paid}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Debt
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {monthlyBill(item, groups)?.debt}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-[1]">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Go Back
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
