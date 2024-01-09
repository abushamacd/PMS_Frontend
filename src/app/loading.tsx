import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <CircularProgress
        sx={{ color: "unset", height: "50px", width: "50px" }}
        className="!text-light_primary dark:!text-dark_primary"
      />
    </div>
  );
};

export default Loading;
