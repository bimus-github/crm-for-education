import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsCursor } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import AppLayout from "src/components/shared/layout";
import { createNote, deleteNote } from "src/lib/firebase/services/message";
import { Message, ROLE } from "src/models";
import { NoteActions } from "src/store/features/message";
import { notesSlice, NotesSliceActions } from "src/store/features/messages";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

function Notes() {
  const dispatch = useAppDispatch();

  const usersSlices = useAppSelector((u) => u.usersSlice);

  const notes = useAppSelector((n) => n.notesSlice);

  let t = Object.values(usersSlices)?.filter((t) => t.role === ROLE.TEACHER);

  let n = Object.values(notes);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const onSendMessage = async () => {
    if (name === "" || message === "") {
      return toast.error("Please, Fill All boxes!");
    }
    const data: Message = {
      id: "",
      message: message,
      name: name,
      school: t[0].school,
      date: Date.now(),
    };

    try {
      const noteId = await createNote(data);
      dispatch(NoteActions.setNote({ ...data, id: noteId }));
      dispatch(NotesSliceActions.addNote({ ...data, id: noteId }));
      toast.success("Note has successfully been added");
      setMessage("");
      setName("");
    } catch (error) {
      console.log(error);
      toast.error("There was error to add note");
    }
  };

  const onDeleteNote = (n: Message) => {
    deleteNote(n.id);
    dispatch(NotesSliceActions.deleteNote(n));
  };

  return (
    <AppLayout>
      <div className="w-full h-full p-7">
        <div className="w-full h-full bg-white p-4 flex flex-col">
          <div className="w-full snap-normal overflow-auto flex-[5] gap-10 border-b border-black p-2 flex flex-col items-start justify-start">
            {n &&
              n
                .sort((a, b) => {
                  return -Number(a.date) + Number(b.date);
                })
                .map((n) => (
                  <div
                    key={-n.date}
                    className={`
                    ${Date.now() - n.date < 86400000 / 2 ? "bg-green-300" : ""} 
                    ${
                      Date.now() - n.date < 86400000 &&
                      Date.now() - n.date > 86400000 / 2
                        ? "bg-green-200"
                        : ""
                    } 
                    ${
                      Date.now() - n.date > 86400000 &&
                      Date.now() - n.date < (86400000 * 3) / 2
                        ? "bg-green-100"
                        : ""
                    } 
                    ${
                      Date.now() - n.date > (86400000 * 3) / 2
                        ? "bg-blue-200"
                        : ""
                    } 

                    w-auto h-auto p-2 flex flex-col items-start justify-start font-serif font-bold border rounded-md shadow-md`}
                  >
                    <div
                      className={` capitalize flex-[1] m-1 pl-1 text-blue-400 text-xs mb-2 w-full flex justify-between h-[30px] items-center`}
                    >
                      {n?.name}
                      <div>
                        <MdDelete
                          onClick={() => onDeleteNote(n)}
                          className=" text-red-500 w-[20px] h-[20px] hover:w-[25px] hover:h-[25px] hover:relative"
                        />
                      </div>
                    </div>
                    <p className="flex-[5]">{n.message}</p>
                    <div className=" w-full pr-10 flex-[1] text-sm font-light gap-2 m-1 pl-5 flex justify-end items-center">
                      <p>{moment(n.date).format("LLLL")}</p>
                    </div>
                  </div>
                ))}
          </div>
          <div className="w-full flex-[1] flex items-center justify-center gap-2">
            <div className="flex-[2] h-full flex flex-col items-center justify-start">
              <p className="w-full text-left pl-2 text-base font-serif font-semibold relative">
                Name
              </p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
                className="shadow-md h-[50px] w-full pl-2 rounded-md border-yellow-400 border text-base font-serif font-semibold"
              />
            </div>
            <div className="flex-[5] h-full flex flex-col items-center justify-center">
              <p className="w-full text-left pl-2 text-base font-serif font-semibold relative">
                Message
              </p>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Message"
                className="shadow-md h-[100px] w-full pl-2 pt-2 rounded-md border-yellow-400 border text-base font-serif font-semibold"
              />
            </div>
            <div className="flex-[1] h-full flex flex-col items-center justify-start pt-[25px]">
              <button
                onClick={onSendMessage}
                className=" shadow-md flex items-center justify-center gap-2 text-base font-serif font-semibold text-white w-[200px] h-[50px] bg-app-secondary-lighter hover:bg-app-secondary rounded-md"
              >
                <BsCursor className="w-[30px] h-[30px] text-app-primary" />
                Sent message
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Notes;
