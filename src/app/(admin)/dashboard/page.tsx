"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import PageHeading from "@/components/UI/PageHeading";
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import { projectSchema } from "@/schemas/project";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Dialog, Divider } from "@mui/material";
import { useTheme } from "next-themes";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCreate } from "react-icons/io5";

type projectFormValues = {
  title: string;
  desc: string;
};

const Dashboard = () => {
  const { theme, setTheme } = useTheme();
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
      <Divider
        className="py-1"
        style={
          theme === "light"
            ? { borderBottom: `1px solid #2a7785` }
            : { borderBottom: `1px solid #259FD9` }
        }
      />

      <div className="statistics md:flex flex-wrap">
        <div className="py-2 md:w-1/3">
          <Card className="border-b p-[10px] mb-[10px] dark:!bg-dark_secondary dark:!text-dark_text dark:!border-b-dark_primary !bg-light_secondary !text-light_text !border-b-light_primary text-center">
            <h3 className="text-4xl mb-4 text-light_primary dark:text-dark_primary">
              Total User
            </h3>
            <p className="text-3xl">03</p>
          </Card>
        </div>
        <div className="md:py-2 md:px-2 md:w-1/3">
          <Card className="border-b p-[10px] mb-[10px] dark:!bg-dark_secondary dark:!text-dark_text dark:!border-b-dark_primary !bg-light_secondary !text-light_text !border-b-light_primary text-center">
            <h3 className="text-4xl mb-4 text-light_primary dark:text-dark_primary">
              Running Project
            </h3>
            <p className="text-3xl">03</p>
          </Card>
        </div>
        <div className="py-2 md:w-1/3">
          <Card className="border-b p-[10px] mb-[10px] dark:!bg-dark_secondary dark:!text-dark_text dark:!border-b-dark_primary !bg-light_secondary !text-light_text !border-b-light_primary text-center">
            <h3 className="text-4xl mb-4 text-light_primary dark:text-dark_primary">
              Finished Project
            </h3>
            <p className="text-3xl">03</p>
          </Card>
        </div>
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
