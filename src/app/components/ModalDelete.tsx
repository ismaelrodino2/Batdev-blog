import { DarkModeContext } from "@/contexts/DarkModeContext";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import {useContext} from 'react'

export const ModalDelete = ({ openDelete, handleCloseDelete, handleDelete }: any) => {
    const { darkModeValue } = useContext(DarkModeContext);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        minWidth: "280px",
        height: "30%",
        bgcolor: "background.paper",
        border: `2px solid ${darkModeValue ? "#f5f5f5" : "#222222"}`,
        boxShadow: 24,
        color: darkModeValue ? "#f5f5f5" : "#222222",
        p: 4,
      };

  return (
    <Modal
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col justify-between h-full">
          <h2 className="flex md:text-2xl text-lg">
            Are you sure you want to delete?
          </h2>
          <div className="flex justify-between">
            <Button
              color="primary"
              component="label"
              variant="contained"
              onClick={handleCloseDelete}
            >
              No
            </Button>
            <Button
              color="secondary"
              component="label"
              variant="contained"
              onClick={handleDelete}
            >
              Yes
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
