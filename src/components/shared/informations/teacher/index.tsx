import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { MdRestore } from "react-icons/md";
import { updateUser } from "src/lib/firebase/services/user";
import { CASE, ROLE } from "src/models";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { FormatPhoneNumber } from "../../formatPhoneNumber";
import { AllMonthlyBill } from "../../monthlyBill";
import { UserSliceActions } from "src/store/features/users";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  item: any;
}
export default function OpenInfoTeacher({ isOpen, setIsOpen, item }: Props) {
  const dispatch = useAppDispatch();
  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  // const [groups, setGroups] = useState<any>();
  // const [students, setStudents] = useState<any>();

  let Case = () => {
    let groups = Object.values(groupsSlice)?.filter(
      (g) => g.school === schoolSlice.id && g?.case === CASE.existent
    );

    let studentsExistent = Object.values(usersSlices)?.filter(
      (s) => s.role === ROLE.STUDENT && s?.case === CASE.existent
    );

    let studentsNonExistent = Object.values(usersSlices)?.filter(
      (s) => s.role === ROLE.STUDENT && s?.case === CASE.nonexistent
    );

    return { groups, studentsExistent, studentsNonExistent };
  };

  let onRestore = () => {
    let restoredTeacher: any = {
      ...item,
      case: CASE.existent,
      deletedTime: "",
    };

    try {
      updateUser(restoredTeacher);
      dispatch(UserSliceActions.removeUser(item));
      dispatch(UserSliceActions.addUser(restoredTeacher));
      setIsOpen(false);
      toast.success("Restoring has been successfully!");
    } catch (error) {
      toast.error("Something is wrong!");
      console.log(error);
    }
  };

  return (
    <>
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
                    className="text-lg  flex-[1] w-full font-serif text-center font-medium leading-6 text-gray-900"
                  >
                    {item?.case === CASE.existent ? (
                      <p>Teacher</p>
                    ) : (
                      <div className=" w-full flex items-center justify-between px-10 text-red-500">
                        <p>{`Teacher was deleted in ${moment(
                          Number(item?.deletedTime)
                        ).format("LLL")}`}</p>
                        <MdRestore
                          onDoubleClick={onRestore}
                          title="Restore"
                          size={24}
                          className="hover:text-app-secondary-lighter hover:h-[30px] hover:w-[30px]"
                        />
                      </div>
                    )}
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
                          Languages
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center gap-1">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.languages.map((lang: any) => {
                            return lang;
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Email
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.email}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Password
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.password}
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
                          Started Time
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {moment(Number(item?.startedTime)).format("LL")}
                        </p>
                      </div>
                    </div>
                    {item?.case === CASE.nonexistent && (
                      <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                        <div className="w-[40%] h-full flex items-center justify-center">
                          <p className="text-red-500 font-serif font-normal">
                            Deleted Time
                          </p>
                        </div>
                        <div className="w-[40%] h-full flex items-center justify-center">
                          <p className="text-red-500 font-serif font-normal capitalize">
                            {moment(Number(item?.deletedTime)).format("LL")}
                          </p>
                        </div>
                      </div>
                    )}
                    {item?.case === CASE.existent && (
                      <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                        <div className="w-[40%] h-full flex items-center justify-center">
                          <p className="text-black font-serif font-normal">
                            Number of Groups
                          </p>
                        </div>
                        <div
                          title={String(
                            Case()
                              .groups?.filter(
                                (group: any) => group.teacher.user === item?.id
                              )
                              ?.map((g: any) => {
                                return g.name;
                              })
                          )}
                          className="w-[40%] h-full flex items-center justify-center"
                        >
                          <p className="text-black font-serif font-normal capitalize">
                            {
                              Case().groups?.filter(
                                (group: any) => group.teacher.user === item?.id
                              )?.length
                            }
                          </p>
                        </div>
                      </div>
                    )}
                    {item?.case === CASE.existent && (
                      <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                        <div className="w-[40%] h-full flex items-center justify-center">
                          <p className="text-black font-serif font-normal">
                            Number of Students
                          </p>
                        </div>
                        <div
                          title={String(
                            Case()
                              .studentsExistent?.filter(
                                (student: any) => student.teacher === item?.id
                              )
                              ?.map((s: any) => {
                                return s.firstName;
                              })
                          )}
                          className="w-[40%] h-full flex items-center justify-center"
                        >
                          <p className="text-black font-serif font-normal capitalize">
                            {
                              Case().studentsExistent?.filter(
                                (student: any) => student.teacher === item?.id
                              )?.length
                            }
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-red-500 font-serif font-normal">
                          Number of deleted Students
                        </p>
                      </div>
                      <div
                        title={String(
                          Case()
                            .studentsNonExistent?.filter(
                              (student: any) => student.teacher === item?.id
                            )
                            ?.map((s: any) => {
                              return s.firstName;
                            })
                        )}
                        className="w-[40%] h-full flex items-center justify-center"
                      >
                        <p className="text-red-500 font-serif font-normal capitalize">
                          {
                            Case().studentsNonExistent?.filter(
                              (student: any) => student.teacher === item?.id
                            )?.length
                          }
                        </p>
                      </div>
                    </div>
                    {item?.case === CASE.existent && (
                      <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                        <div className="w-[40%] h-full flex items-center justify-center">
                          <p className="text-black font-serif font-normal">
                            Salary
                          </p>
                        </div>
                        <div className="w-[40%] h-full flex items-center justify-center">
                          <p className="text-black font-serif font-normal capitalize">
                            {
                              AllMonthlyBill(
                                Case().studentsExistent?.filter(
                                  (student: any) => student.teacher === item?.id
                                ),
                                Object.values(groupsSlice).filter(
                                  (g) => g.school === schoolSlice.id
                                )
                              )?.salary
                            }
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-red-500 font-serif font-normal">
                          Amount Lost
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-red-500 font-serif font-normal capitalize">
                          {
                            AllMonthlyBill(
                              Case().studentsNonExistent?.filter(
                                (student: any) => student.teacher === item?.id
                              ),
                              Object.values(groupsSlice).filter(
                                (g) => g.school === schoolSlice.id
                              )
                            )?.salary
                          }
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
