import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { useRouter } from 'next/router';

export default function NewEntityButton() {
  const router = useRouter();

  function redirect() {
    router.push(router.pathname + '/new');
  }

  return (
    <Fab
      onClick={redirect}
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
