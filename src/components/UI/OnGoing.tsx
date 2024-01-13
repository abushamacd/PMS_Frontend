"use client";
import Loading from "@/app/loading";
import {
  useGetProjectsQuery,
  useUpdateProjectPositionMutation,
} from "@/redux/api/projectApi";
import { useDebounced } from "@/redux/hooks";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";

const OnGoing = () => {
  const { theme, setTheme } = useTheme();

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
  query["onGoing"] = true;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const [updateProjectPosition] = useUpdateProjectPositionMutation();
  const { data, isLoading } = useGetProjectsQuery({ ...query });
  // @ts-ignore
  const projects: any = data?.projects;

  const onDragEnd = async ({
    source,
    destination,
  }: {
    source: any;
    destination: any;
  }) => {
    const newOrderd = [...projects];
    const [removed] = newOrderd.splice(source.index, 1);
    newOrderd.splice(destination.index, 0, removed);

    try {
      await updateProjectPosition(newOrderd).unwrap();
      toast.success("Position update successfully");
    } catch (err: any) {
      toast.error(`${err.data?.message}`);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="">
      <div className="text-sm pl-2 text-light_primary dark:text-dark_primary duration-300 mt-2">
        Running ({projects?.length})
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable-key"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {projects?.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      component={Link}
                      href={`/project/${item.id}`}
                      sx={{
                        cursor: snapshot.isDragging
                          ? "grab"
                          : "pointer!important",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          padding: {
                            xs: "8px",
                            md: "8px 16px",
                          },
                        }}
                        style={
                          theme === "light"
                            ? { borderBottom: `1px solid #2a7785` }
                            : { borderBottom: `1px solid #259FD9` }
                        }
                      >
                        <ListItemIcon sx={{ marginLeft: "-5px" }}>
                          {item?.icon}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ fontSize: "15px" }}
                          primary={item?.title}
                        />
                      </ListItemButton>
                    </ListItemButton>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default OnGoing;
