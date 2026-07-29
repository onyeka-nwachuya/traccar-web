import { Paper } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import LogoImage from './LogoImage';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(3),
    backgroundImage:
      'url("https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    width: '100%',
    maxWidth: 1100,
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[24],
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(8, 20, 45, 0.94)'
        : 'rgba(250, 251, 253, 0.96)',
    backdropFilter: 'blur(24px)',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    display: 'grid',
    gridTemplateColumns: '1.05fr 1fr',
    gap: theme.spacing(3),
    minHeight: 560,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(180deg, rgba(2, 44, 78, 0.96), rgba(10, 100, 163, 0.96))',
    color: theme.palette.common.white,
    boxShadow: '0 20px 70px rgba(3, 19, 56, 0.35)',
    overflow: 'hidden',
  },
  panelInner: {
    display: 'grid',
    gap: theme.spacing(3),
    minHeight: 0,
  },
  brand: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  form: {
    width: '100%',
    display: 'grid',
    gap: theme.spacing(2),
  },
}));

const LoginLayout = ({ children, panel }) => {
  const { classes } = useStyles();
  const theme = useTheme();

  const defaultPanel = (
    <div className={classes.panelInner}>
      <div className={classes.brand}>
        <LogoImage color={theme.palette.secondary.main} />
      </div>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
          Access your fleet with a secure GPS tracking experience. Scan the code or sign in with your credentials for instant insights.
        </p>
      </div>
    </div>
  );

  return (
    <main className={classes.root}>
      <Paper className={classes.paper} elevation={8}>
        <div className={classes.panel}>{panel ?? defaultPanel}</div>
        <div className={classes.formWrapper}>
          <div className={classes.brand}>
            <LogoImage color={theme.palette.primary.main} />
          </div>
          <form className={classes.form}>{children}</form>
        </div>
      </Paper>
    </main>
  );
};

export default LoginLayout;
