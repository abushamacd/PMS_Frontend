import { setTask } from "@/redux/feature/siteSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Dialog, IconButton } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import FormTextArea from "../Forms/FormTextArea";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/api/taskApi";

type updateValues = {
  title: string;
};

const TaskModal = () => {
  const dispatch = useAppDispatch();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { task } = useAppSelector((state) => state.site);

  const closeTask = () => {
    dispatch(setTask({ data: null, state: false }));
  };

  const defaultValues = {
    title: task?.data?.title || "",
    desc: task?.data?.desc || "",
  };

  const updateHandler: SubmitHandler<updateValues> = async (data: any) => {
    try {
      await updateTask({ id: task?.data?.id, body: data }).unwrap();
      toast.success("Task updated successfully");
      dispatch(setTask({ data: null, state: false }));
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      dispatch(setTask({ data: null, state: false }));
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  return (
    <div className="">
      <Dialog
        open={task?.taskState}
        onClose={closeTask}
        aria-labelledby="customized-dialog-title"
      >
        <div className="bg-light_secondary dark:bg-dark_secondary p-4 w-[300px] md:w-[600px]">
          <div className="absolute right-0 top-0">
            <IconButton color="error">
              <MdDeleteForever
                className=""
                onClick={() => deleteHandler(task?.data?.id)}
              />
            </IconButton>
          </div>
          <p className="text-md text-light_primary dark:text-dark_primary italic capitalize mb-2 border-b ">
            Task of:{" "}
            {moment(task?.data?.createdAt).format("DD_MM_YYYY, h:mm A")}
          </p>
          <Form submitHandler={updateHandler} defaultValues={defaultValues}>
            <div className="my-[10px]">
              <FormInput
                name="title"
                type="text"
                placeholder="Type section title"
                label="Task Title"
                required
              />
            </div>
            <div className="my-[10px]">
              <FormTextArea name="desc" label="Description" rows={4} required />
            </div>
            <div className="my-[10px]"></div>
            <button
              type="submit"
              className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
            >
              Update
            </button>
          </Form>
        </div>
      </Dialog>
    </div>
  );
};

export default TaskModal;
