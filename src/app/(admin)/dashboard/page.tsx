"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import PageHeading from "@/components/UI/PageHeading";
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import { projectSchema } from "@/schemas/project";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "@mui/material";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCreate } from "react-icons/io5";

type projectFormValues = {
  title: string;
  desc: string;
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [createProject] = useCreateProjectMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProjectHandle: SubmitHandler<projectFormValues> = async (
    data: any
  ) => {
    try {
      await createProject(data).unwrap();
      toast.success("Project create successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  return (
    <div className="dashboard">
      <div className="flex justify-between">
        <PageHeading title="Dashboard" />
        <button
          onClick={handleClickOpen}
          className="text-dark_text dark:text-dark_bg bg-light_primary dark:bg-dark_primary border-0 py-2 px-6  rounded text-lg hover:opacity-80 duration-300 flex gap-2 items-center"
        >
          <IoCreate
            size="24"
            className="dark:text-dark_secondary text-light_secondary duration-300"
          />
          Add New
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <div className="bg-light_secondary dark:bg-dark_secondary p-4 w-[300px] md:w-[400px]">
          <Form
            submitHandler={createProjectHandle}
            resolver={yupResolver(projectSchema)}
          >
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
              Create
            </button>
          </Form>
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;
