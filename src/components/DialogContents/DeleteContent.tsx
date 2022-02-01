import { Box, Grid, Typography, styled } from '@mui/material';

type DeleteContentProps = {
  title?: string;
  description?: string;
  src?: string;
};

const StyledImage = styled('img')({
  filter: 'drop-shadow(2px 2px 10px rgba(0,0,0,0.5))',
});

function DeleteContent(props: DeleteContentProps) {
  const {
    title = 'Deseja mesmo deletar?',
    description = 'Ao confirmar o seu registro será deletado!',
    src = '/remove-illustration.png',
  } = props;

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{ maxWidth: '400px' }}
    >
      <Grid item xs="auto">
        <StyledImage src={src} alt="Delete Illustration" height="250px" />
      </Grid>
      <Grid item xs={12}>
        <Typography
          color="textPrimary"
          align="center"
          sx={(theme) => ({
            fontSize: theme.spacing(4),
          })}
        >
          <Box fontWeight="fontWeightBold">{title}</Box>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">{description}</Typography>
      </Grid>
    </Grid>
  );
}

export default DeleteContent;
