import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
import { addTask } from "../../services/task/addTask";

const NewProject = ({ onAdd, onCancel }) => {
  const modal = useRef(null);
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  async function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    //here i validate
    await onSave({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }
  
  //Sending the task to my db
  async function onSave(payload) {
    const { title, description, dueDate } = payload;
    const status = await addTask(payload);
    if (status === 201) {
      onAdd({
        title,
        description,
        dueDate,
      });
    }
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Input invalida
        </h2>
        <p className="text-stone-600 mb-4">Falta un valor</p>
        <p className="text-stone-600 mb-4">
          Provee un valor valido para cada input
        </p>
      </Modal>

      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              {" "}
              Cancel
            </button>
          </li>

          <li>
            <button
              onClick={handleSave}
              className="px-6 y-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />

          <Input ref={description} label="Description " textarea />

          <Input type="date" ref={dueDate} label="Date" />
        </div>
      </div>
    </>
  );
};
export default NewProject;
