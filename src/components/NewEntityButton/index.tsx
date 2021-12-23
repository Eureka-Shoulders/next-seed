import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

interface NewEntityButtonProps {
  pathname: string;
}

export default function NewEntityButton({ pathname }: NewEntityButtonProps) {
  return (
    <Fab
      href={`${pathname}/new`}
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
      }}
    >
      <AddIcon />
    </Fab>
  );
}
