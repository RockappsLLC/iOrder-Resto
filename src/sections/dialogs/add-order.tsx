import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AddOrderDialog({ value, hide }: any) {
  return (
    <Dialog fullWidth open={value} onClose={hide}>
      <DialogTitle>Add Order</DialogTitle>
      <Divider />
      <DialogContent>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            bgcolor: '#F8F9FD',
            px: 2,
            my: 3,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '74px', borderRadius: '12px' }}
            component="img"
            height="74px"
            image="/assets/images/food.png"
            alt="food"
          />
          <CardContent sx={{ width: '100%', pr: 0 }}>
            <Typography fontSize={16} fontWeight={600} gutterBottom component="div">
              Steak medium
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color="#9C9C9C"
                  sx={{ mb: 0 }}
                  component="div"
                >
                  Price
                </Typography>
                <Typography fontSize={16} fontWeight={600} variant="body2" color="#F15F34">
                  $ 213
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Fab size="small" color="default" aria-label="add">
                  <Iconify icon="tabler:minus" width={22} />
                </Fab>
                <Typography fontSize={16} fontWeight={600}>
                  1
                </Typography>
                <Fab size="small" color="inherit" aria-label="add">
                  <Iconify icon="tabler:plus" width={22} />
                </Fab>
              </div>
            </div>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>
        <Typography fontSize={16} fontWeight={600}>
          Additional
        </Typography>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: 16,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '44px', borderRadius: '12px' }}
            component="img"
            height="44px"
            image="/assets/images/food.png"
            alt="food"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize={14}
              fontWeight={600}
            >
              Rice
            </Typography>
            <Typography fontSize={14} variant="body2">
              $ 213
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Fab size="small" color="default" aria-label="add">
              <Iconify icon="tabler:minus" width={20} />
            </Fab>
            <Typography fontSize={16} fontWeight={600}>
              1
            </Typography>
            <Fab size="small" color="inherit" aria-label="add">
              <Iconify icon="tabler:plus" width={20} />
            </Fab>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: 16,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '44px', borderRadius: '12px' }}
            component="img"
            height="44px"
            image="/assets/images/food.png"
            alt="food"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize={14}
              fontWeight={600}
            >
              Rice
            </Typography>
            <Typography fontSize={14} variant="body2">
              $ 213
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Fab size="small" color="default" aria-label="add">
              <Iconify icon="tabler:minus" width={20} />
            </Fab>
            <Typography fontSize={16} fontWeight={600}>
              1
            </Typography>
            <Fab size="small" color="inherit" aria-label="add">
              <Iconify icon="tabler:plus" width={20} />
            </Fab>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: 16,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '44px', borderRadius: '12px' }}
            component="img"
            height="44px"
            image="/assets/images/food.png"
            alt="food"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize={14}
              fontWeight={600}
            >
              Rice
            </Typography>
            <Typography fontSize={14} variant="body2">
              $ 213
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Fab size="small" color="default" aria-label="add">
              <Iconify icon="tabler:minus" width={20} />
            </Fab>
            <Typography fontSize={16} fontWeight={600}>
              1
            </Typography>
            <Fab size="small" color="inherit" aria-label="add">
              <Iconify icon="tabler:plus" width={20} />
            </Fab>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={hide}
          sx={{ borderRadius: '58px', px: 6, py: 1.5, ':hover': { bgcolor: '#f2734e' } }}
          color="primary"
          variant="contained"
        >
          Add to order
        </Button>
      </DialogActions>
    </Dialog>
  );
}
