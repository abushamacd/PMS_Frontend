import { setTask } from "@/redux/feature/siteSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Dialog, IconButton } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef } from "react";

// import '../../css/custom-editor.css'

const modalStyle = {
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
  height: "80%",
};

type updateValues = {
  title: string;
};

const TaskModal = () => {
  const dispatch = useAppDispatch();

  const { task } = useAppSelector((state) => state.site);

  const editorWrapperRef = useRef();

  useEffect(() => {
    // setTask(props.task)
    // setTitle(props.task !== undefined ? props.task.title : '')
    // setContent(props.task !== undefined ? props.task.content : '')
    // if (props.task !== undefined) {
    //   isModalClosed = false

    updateEditorHeight();
    // }
  }, [task.data]);

  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current;
        // @ts-ignore
        box.querySelector(".ck-editor__editable_inline").style.height =
          // @ts-ignore
          box.offsetHeight - 50 + "px";
      }
    }, 500);
  };

  const closeTask = () => {
    dispatch(setTask({ data: null, state: false }));
  };

  const defaultValues = {
    title: task?.data?.title || "",
    desc: task?.data?.desc || "",
  };

  const updateHandler: SubmitHandler<updateValues> = async (data: any) => {
    console.log(data);
    // try {
    //   await updateSection({ id: edit?.data?.id, body: data }).unwrap();
    //   toast.success("Section updated successfully");
    // } catch (err: any) {
    //   toast.error(`${err.data?.message}`);
    // }
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
                // onClick={() => deleteHandler(section?.id)}
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
