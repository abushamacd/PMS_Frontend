"use client";

import Loading from "@/app/loading";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import PageHeading from "@/components/UI/PageHeading";
import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "@/redux/api/projectApi";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import { projectSchema } from "@/schemas/project";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, Dialog, Divider, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCreate } from "react-icons/io5";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

type projectFormValues = {
  title: string;
  desc: string;
};

const userTabelColumn = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Access Level",
    flex: 1,
  },
];

const projectTabelColumn = [
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "desc",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "onGoing",
    headerName: "Status",
    flex: 1,
  },
];

const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [createProject] = useCreateProjectMutation();
  const { data: userData, isLoading: userLoading } = useGetUsersQuery({});

  // @ts-ignore
  const users: any = userData?.users;

  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useGetProjectsQuery({ query });

  // @ts-ignore
  const projects: any = data?.projects;

  const onGoing = projects?.filter(
    (item: { onGoing: boolean }) => item.onGoing === true
  );
  const finished = projects?.filter(
    (item: { onGoing: boolean }) => item.onGoing === false
  );

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

  if (isLoading || userLoading) return <Loading />;

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
            <p className="text-3xl">
              {users?.length < 9 ? `0${users?.length}` : users?.length}
            </p>
          </Card>
        </div>
        <div className="md:py-2 md:px-2 md:w-1/3">
          <Card className="border-b p-[10px] mb-[10px] dark:!bg-dark_secondary dark:!text-dark_text dark:!border-b-dark_primary !bg-light_secondary !text-light_text !border-b-light_primary text-center">
            <h3 className="text-4xl mb-4 text-light_primary dark:text-dark_primary">
              Running Project
            </h3>
            <p className="text-3xl">
              {onGoing?.length < 9 ? `0${onGoing?.length}` : onGoing?.length}
            </p>
          </Card>
        </div>
        <div className="py-2 md:w-1/3">
          <Card className="border-b p-[10px] mb-[10px] dark:!bg-dark_secondary dark:!text-dark_text dark:!border-b-dark_primary !bg-light_secondary !text-light_text !border-b-light_primary text-center">
            <h3 className="text-4xl mb-4 text-light_primary dark:text-dark_primary">
              Finished Project
            </h3>
            <p className="text-3xl">
              {finished?.length < 9 ? `0${finished?.length}` : finished?.length}
            </p>
          </Card>
        </div>
      </div>

      {/* data visualizaion */}
      <h3 className="text-2xl mt-4 text-light_primary dark:text-dark_primary border-b">
        User List
      </h3>
      <div className="">
        <Box
          height="70vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              color: `${theme === "light" ? `#000` : `#fff`}`,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: `${theme === "light" ? `#2a7785` : `#259FD9`}`,
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              // backgroundColor: `${theme === "light" ? `#2a7785` : `#259FD9`}`,
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: `${theme === "light" ? `#2a7785` : `#259FD9`}`,
            },
            "& .MuiCheckbox-root": {
              color: `${theme === "light" ? `#000` : `#fff`} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${
                theme === "light" ? `#000 !important` : `#fff !important`
              }`,
            },
          }}
        >
          <DataGrid
            className="dark:myclass"
            checkboxSelection
            rows={users}
            // @ts-ignore
            columns={userTabelColumn}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </div>
      <div className="projects_table mt-10">
        <h3 className="text-2xl mt-4 text-light_primary dark:text-dark_primary border-b">
          Project List
        </h3>
        <div className="">
          <Box
            height="70vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                color: `${theme === "light" ? `#000` : `#fff`}`,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `${theme === "light" ? `#2a7785` : `#259FD9`}`,
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                // backgroundColor: `${theme === "light" ? `#2a7785` : `#259FD9`}`,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: `${theme === "light" ? `#2a7785` : `#259FD9`}`,
              },
              "& .MuiCheckbox-root": {
                color: `${theme === "light" ? `#000` : `#fff`} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${
                  theme === "light" ? `#000 !important` : `#fff !important`
                }`,
              },
            }}
          >
            <DataGrid
              className="dark:myclass"
              checkboxSelection
              rows={projects}
              // @ts-ignore
              columns={projectTabelColumn}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
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
