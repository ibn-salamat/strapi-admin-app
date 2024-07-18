import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
    title: string
    children: React.ReactElement
    handleClose: () => void;
}

export const CustomModal = ({ title, children, handleClose }: Props) => {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
            setOpen(false);
            handleClose()
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          {children}
        </Box>
      </Modal>
    </div>
  );
}