import { CircularProgress } from "@mui/material";

export const Loading = ({ isLoading }: {isLoading:boolean}) => {
  return (
    <div>
      {isLoading && (
        <div className="w-full h-full fixed top-0 bottom-0 left-0 right-0 z-[9999] backdrop-brightness-95	">
          <div className="absolute top-[calc(50%-40px)] left-[calc(50%-40px)] z-[9999]">
            <CircularProgress />
          </div>
        </div>
      )}
    </div>
  );
};
