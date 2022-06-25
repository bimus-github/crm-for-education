import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { MdRestore } from "react-icons/md";
import { updateGroup } from "src/lib/firebase/services/group";
import { CASE, ROLE, User } from "src/models";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { GroupsSliceActions } from "src/store/features/groups";
import toast from "react-hot-toast";
import OpenInfoTeacher from "../teacher";

interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  item: any;
}

export default function OpenInfoGroup({ isOpen, setIsOpen, item }: Props) {
  const dispatch = useAppDispatch();

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  let groups = Object.values(groupsSlice)?.filter(
    (g) => g.school === schoolSlice.id
  );

  const [teacher, setTeacher] = useState<User>();
  const [openTeacherModal, setOpenTeacherModal] = useState<boolean>(false);

  const onInfoTeacher = (t: User) => {
    setTeacher(t);
    setOpenTeacherModal(true);
  };

  useEffect(() => {
    setIsOpenInfoTeacher(openTeacherModal);
  }, []);

  const setIsOpenInfoTeacher = (i: any) => {
    setOpenTeacherModal(i);
  };

  let Case = () => {
    let studentsExistent = Object.values(usersSlices)?.filter(
      (s) => s.role === ROLE.STUDENT && s.case === CASE.existent
    );

    let studentsNonExistent = Object.values(usersSlices)?.filter(
      (s) => s.role === ROLE.STUDENT && s.case === CASE.nonexistent
    );
    return { studentsExistent, studentsNonExistent };
  };

  let teachers = Object.values(usersSlices)?.filter(
    (s) => s.role === ROLE.TEACHER
  );

  let onRestore = () => {
    let restoredGroup: any = { ...item, case: CASE.existent, deletedTime: "" };

    try {
      updateGroup(restoredGroup);
      dispatch(GroupsSliceActions.deleteGroup(item));
      dispatch(GroupsSliceActions.addGroup(restoredGroup));
      setIsOpen(false);
      toast.success("Restoring has been successfully!");
    } catch (error) {
      toast.error("Something is wrong!");
      console.log(error);
    }
  };

  return (
    <>
      <OpenInfoTeacher
        isOpen={openTeacherModal}
        setIsOpen={(i: any) => setIsOpenInfoTeacher(i)}
        item={teacher}
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                    className="text-lg w-full text-center font-serif font-medium leading-6 text-gray-900"
                  >
                    {item?.case === CASE.existent ? (
                      <p>Group</p>
                    ) : (
                      <div className=" w-full flex items-center justify-between px-10 text-red-500">
                        <p>{`Group was deleted in ${moment(
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
                  <div className="mt-5  flex-[18] overflow-auto snap-normal w-full flex flex-col items-center justify-start gap-8 p-2">
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Name
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.name}
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
                            teachers.filter(
                              (t) => t.id === item?.teacher?.user
                            )[0]
                          )
                        }
                        className="w-[40%] gap-1 h-full flex items-center justify-center"
                      >
                        <img
                          src={
                            teachers?.filter(
                              (t) => t.id === item?.teacher?.user
                            )[0]?.img
                          }
                          className=" h-[30px] w-[30px] rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                        />
                        <p className="text-black font-serif font-normal capitalize">
                          {
                            teachers.filter(
                              (t) => t.id === item?.teacher?.user
                            )[0]?.firstName
                          }
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Start-End
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {`${item?.schedule?.time?.start}-${item?.schedule?.time?.end}`}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Days
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black flex items-center justify-center font-serif font-normal capitalize">
                          {item?.schedule?.days?.map((i: any) => {
                            console.log(i);

                            return <p className="mx-1">{i}</p>;
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Languages
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black flex items-center justify-center font-serif font-normal capitalize">
                          {item?.language?.name}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Opened Time
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {moment(Number(item?.startedTime)).format("LL")}
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
                          {item?.price}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Room
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.room}
                        </p>
                      </div>
                    </div>
                    <div className="w-[600px] h-[45px] flex justify-between border-b border-black">
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal">
                          Monthly Bill Percentage
                        </p>
                      </div>
                      <div className="w-[40%] h-full flex items-center justify-center">
                        <p className="text-black font-serif font-normal capitalize">
                          {item?.teacher?.monthlyBillPercentage}%
                        </p>
                      </div>
                    </div>
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
                                (student) => student.group === item?.id
                              )
                              ?.map((s) => {
                                return s.firstName;
                              })
                          )}
                          className="w-[40%] h-full flex items-center justify-center"
                        >
                          <p className="text-black font-serif font-normal capitalize">
                            {
                              Case().studentsExistent?.filter(
                                (s) => s.group === item?.id
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
                              (student) => student.group === item?.id
                            )
                            ?.map((s) => {
                              return s.firstName;
                            })
                        )}
                        className="w-[40%] h-full flex items-center justify-center"
                      >
                        <p className="text-red-500 font-serif font-normal capitalize">
                          {
                            Case().studentsNonExistent?.filter(
                              (s) => s.group === item?.id
                            )?.length
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 w-full text-left">
                    <button
                      type="button"
                      className="inline-flex self-start justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
