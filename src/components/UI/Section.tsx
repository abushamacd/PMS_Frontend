import { Card, Dialog, Divider, IconButton, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import FormInput from "../Forms/FormInput";
import Form from "../Forms/Form";
import { Key, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sectionSchema } from "@/schemas/project";
import toast from "react-hot-toast";
import {
  useCreateSectionMutation,
  useDeleteSectionMutation,
  useUpdateSectionMutation,
} from "@/redux/api/sectionApi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  MdDeleteForever,
  MdOutlineModeEdit,
  MdOutlineAddBox,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEdit, setTask } from "@/redux/feature/siteSlice";
import {
  useCreateTaskMutation,
  useUpdateTaskPositionMutation,
} from "@/redux/api/taskApi";
import TaskModal from "./TaskModal";
import { getUserInfo } from "@/services/auth.service";

type sectionFormValues = {
  title: string;
  desc: string;
};

type updateValues = {
  title: string;
};

const Section = ({ project }: { project: any }) => {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { edit, task } = useAppSelector((state) => state.site);
  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [updateTaskPosition] = useUpdateTaskPositionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const [createTask] = useCreateTaskMutation();

  const userInfo: any = getUserInfo();

  const sections = project?.sections;

  const defaultValues = {
    title: edit?.data?.title || "",
  };

  const createHandler: SubmitHandler<sectionFormValues> = async (data: any) => {
    data.projectId = project?.id;
    try {
      await createSection(data).unwrap();
      toast.success("Section create successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const updateHandler: SubmitHandler<updateValues> = async (data: any) => {
    try {
      await updateSection({ id: edit?.data?.id, body: data }).unwrap();
      toast.success("Section updated successfully");
      dispatch(setEdit({ data: null, state: false }));
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      await deleteSection(id);
      toast.success("Section deleted successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const createTaskHandle = async (section: any) => {
    const data: any = {};
    data.sectionId = section?.id;
    data.assignId = userInfo?.id;
    try {
      await createTask(data).unwrap();
      toast.success("Task create successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const openEdit = (section: any) => {
    dispatch(setEdit({ data: section, state: true }));
  };

  const openTask = (section: any) => {
    dispatch(setTask({ data: section, state: true }));
  };

  const closeEdit = () => {
    dispatch(setEdit({ data: null, state: false }));
  };

  const handleCreateModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const onDragEnd = async ({
    source,
    destination,
  }: {
    source: any;
    destination: any;
  }) => {
    const data = sections;

    if (!destination) {
      return;
    }

    const sourceColIndex = data.findIndex(
      (e: any) => e.id === source.droppableId
    );
    const destinationColIndex = data.findIndex(
      (e: any) => e.id === destination.droppableId
    );

    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];
    const sourceSectionId = sourceCol.id;
    const destinationSectionId = destinationCol.id;
    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
    }

    const body: any = {
      resourceList: sourceTasks,
      destinationList: destinationTasks,
      resourceSectionId: sourceSectionId,
      destinationSectionId: destinationSectionId,
    };

    try {
      await updateTaskPosition(body).unwrap();
      toast.success("Position update successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-2">
        <p
          onClick={handleCreateModal}
          className="text-light_primary dark:text-dark_primary text-sm cursor-pointer"
        >
          Add Section
        </p>
        <p className="text-light_text dark:text-dark_text text-sm">
          {project?.sections?.length} Sections
        </p>
      </div>

      <Divider
        className="py-1"
        style={
          theme === "light"
            ? { borderBottom: `1px solid #2a7785` }
            : { borderBottom: `1px solid #259FD9` }
        }
      />

      {/* show section */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start overflow-auto w-[100vh-300px]">
          {sections?.map((section: any) => (
            <div key={section.id} style={{ width: "300px" }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    className="w-[300px] py-4 pr-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="flex justify-between items-center mb-[10px] border p-2 dark:border-dark_primary border-light_primary rounded-md">
                      <p className="text-md text-light_primary dark:text-dark_primary italic capitalize mb-2 border-b ">
                        {section?.title}
                      </p>
                      <div className="">
                        <IconButton
                          onClick={() => {
                            createTaskHandle(section);
                          }}
                          color="success"
                        >
                          <MdOutlineAddBox />
                        </IconButton>
                        <IconButton
                          onClick={() => openEdit(section)}
                          color="primary"
                        >
                          <MdOutlineModeEdit />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteHandler(section?.id)}
                          color="error"
                        >
                          <MdDeleteForever className="" />
                        </IconButton>
                      </div>
                    </div>

                    {/* tasks */}
                    {section?.tasks?.map((task: any, index: any) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            className="border-b p-[10px] mb-[10px] dark:!bg-dark_secondary dark:!text-dark_text dark:!border-b-dark_primary !bg-light_secondary !text-light_text !border-b-light_primary"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important",
                            }}
                            onClick={() => openTask(task)}
                          >
                            <Typography>
                              {task.title === "" ? "Untitled" : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      {/* Create section model */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
      >
        <div className="bg-light_secondary dark:bg-dark_secondary p-4 w-[300px] md:w-[400px]">
          <Form
            submitHandler={createHandler}
            resolver={yupResolver(sectionSchema)}
          >
            <div className="my-[10px]">
              <FormInput
                name="title"
                type="text"
                placeholder="Ex: To do, Running, Done"
                label="Section Title"
                required
              />
            </div>
            <button
              type="submit"
              className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
            >
              Create
            </button>
          </Form>
        </div>
      </Dialog>
      {/* Update section model */}
      <Dialog
        open={edit?.editState}
        onClose={closeEdit}
        aria-labelledby="customized-dialog-title"
      >
        <div className="bg-light_secondary dark:bg-dark_secondary p-4 w-[300px] md:w-[400px]">
          <Form submitHandler={updateHandler} defaultValues={defaultValues}>
            <div className="my-[10px]">
              <FormInput
                name="title"
                type="text"
                placeholder="Type section title"
                label="Section Title"
                required
              />
            </div>
            <button
              type="submit"
              className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300"
            >
              Update
            </button>
          </Form>
        </div>
      </Dialog>
      {/* Task modal */}
      <TaskModal />
    </>
  );
};

export default Section;
