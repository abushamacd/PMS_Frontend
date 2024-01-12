import { Box, Dialog, Divider } from "@mui/material";
import { useTheme } from "next-themes";
import FormInput from "../Forms/FormInput";
import Form from "../Forms/Form";
import { Key, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sectionSchema } from "@/schemas/project";
import toast from "react-hot-toast";
import { useCreateSectionMutation } from "@/redux/api/sectionApi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type sectionFormValues = {
  title: string;
  desc: string;
};

const Section = ({ project }: { project: any }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [createSection] = useCreateSectionMutation();

  console.log(project.sections);
  const sections = project?.sections;

  const createHandler: SubmitHandler<sectionFormValues> = async (data: any) => {
    data.projectId = project?.id;
    try {
      await createSection(data).unwrap();
      toast.success("Section create successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
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
    // if (!destination) return
    // const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
    // const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
    // const sourceCol = data[sourceColIndex]
    // const destinationCol = data[destinationColIndex]
    // const sourceSectionId = sourceCol.id
    // const destinationSectionId = destinationCol.id
    // const sourceTasks = [...sourceCol.tasks]
    // const destinationTasks = [...destinationCol.tasks]
    // if (source.droppableId !== destination.droppableId) {
    //   const [removed] = sourceTasks.splice(source.index, 1)
    //   destinationTasks.splice(destination.index, 0, removed)
    //   data[sourceColIndex].tasks = sourceTasks
    //   data[destinationColIndex].tasks = destinationTasks
    // } else {
    //   const [removed] = destinationTasks.splice(source.index, 1)
    //   destinationTasks.splice(destination.index, 0, removed)
    //   data[destinationColIndex].tasks = destinationTasks
    // }
    // try {
    //   await taskApi.updatePosition(boardId, {
    //     resourceList: sourceTasks,
    //     destinationList: destinationTasks,
    //     resourceSectionId: sourceSectionId,
    //     destinationSectionId: destinationSectionId
    //   })
    //   setData(data)
    // } catch (err) {
    //   alert(err)
    // }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "calc(100vw - 300px)",
            // width: "calc(100vw)",
            overflowX: "auto",
          }}
        >
          {sections?.map((section: any) => (
            <div key={section.id} style={{ width: "300px" }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <p className="">{section?.title}</p>
                      {/* <TextField
                          value={section.title}
                          onChange={(e) => updateSectionTitle(e, section.id)}
                          placeholder='Untitled'
                          variant='outlined'
                          sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                            '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '700' }
                          }}
                        /> */}
                      {/* <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'green' }
                          }}
                          onClick={() => createTask(section.id)}
                        >
                          <AddOutlinedIcon />
                        </IconButton> */}
                      {/* <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'red' }
                          }}
                          onClick={() => deleteSection(section.id)}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton> */}
                    </Box>
                    {/* tasks */}

                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
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
                placeholder="Type section title"
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
    </>
  );
};

export default Section;
