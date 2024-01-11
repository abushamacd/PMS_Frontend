"use client";

import Loading from "@/app/loading";
import EmojiPicker from "@/components/UI/EmojiPicker";
import {
  useDeleteProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projectApi";
import { Box, Dialog, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import Divider from "@mui/material/Divider";
import { useTheme } from "next-themes";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";

type updateValues = {
  title: string;
  desc: string;
};

const Project = ({ params }: { params: any }) => {
  const { theme, setTheme } = useTheme();
  const { id } = params;
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetProjectQuery(id);
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const project: any = data;

  const defaultValues = {
    title: project?.title || "",
    desc: project?.desc || "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onIconChange = async (icon: any) => {
    try {
      await updateProject({ id: id, body: { icon: icon } }).unwrap();
      toast.success("Icon updated successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  const updateHandler: SubmitHandler<updateValues> = async (data: any) => {
    try {
      await updateProject({ id: id, body: data }).unwrap();
      toast.success("Project updated successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="">
      <div className="flex justify-between relative">
        <div className="md:flex justify-between items-start">
          {/* emoji picker */}
          <EmojiPicker icon={project?.icon} onChange={onIconChange} />
          <div className="">
            <h3 className="text-3xl text-light_primary dark:text-dark_primary italic capitalize mb-2">
              {project?.title}
            </h3>
            <p className="text-sm text-light_text dark:text-dark_text capitalize ">
              {project?.desc}
            </p>
            <p className="text-sm text-light_text dark:text-dark_text capitalize ">
              Manager: <span className="italic">{project?.manager?.name}</span>
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <IconButton color="primary">
            <MdOutlineModeEdit onClick={handleClickOpen} />
          </IconButton>
          <IconButton color="error">
            <MdDeleteForever onClick={() => deleteHandler(id)} />
          </IconButton>
        </div>
      </div>
      <Divider
        className="py-1"
        style={
          theme === "light"
            ? { borderBottom: `1px solid #2a7785` }
            : { borderBottom: `1px solid #259FD9` }
        }
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <div className="bg-light_secondary dark:bg-dark_secondary p-4 w-[300px] md:w-[400px]">
          <Form submitHandler={updateHandler} defaultValues={defaultValues}>
            <div className="my-[10px]">
              <FormInput
                name="title"
                type="text"
                placeholder="Type project title"
                label="Project Title"
                required
              />
            </div>
            <div className="my-[10px]">
              <FormInput
                name="desc"
                type="text"
                placeholder="Short description about project"
                label="Description"
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
    </div>
  );
};

export default Project;
