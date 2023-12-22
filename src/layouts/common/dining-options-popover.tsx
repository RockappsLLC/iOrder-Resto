import React from 'react';
import { m } from 'framer-motion';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Stack, Button, Checkbox } from '@mui/material';

import { DineIn, TakeAway, Reservation } from 'src/assets/icons';

import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { useDiningOptionsContext } from 'src/sections/dining-options';

// ----------------------------------------------------------------------

const data = [
  { label: 'Dine in', name: 'dine-in', icon: <DineIn />, isChecked: false },
  { label: 'Take away', name: 'takeaway', icon: <TakeAway />, isChecked: false },
  { label: 'Reservation', name: 'reservation', icon: <Reservation />, isChecked: false },
];

export default function DiningOptionsPopover() {
  const popover = usePopover();
  const { diningOption, setDiningOption } = useDiningOptionsContext();

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={popover.open ? 'inherit' : 'default'}
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && {
            bgcolor: (theme) => theme.palette.action.selected,
          }),
          bgcolor: (theme) => theme.palette.primary.light,
          color: (theme) => theme.palette.primary.main,
          borderRadius: 58,
          width: 144,
          height: 36,
          marginLeft: 3,
        }}
      >
        <Typography variant="body2" fontWeight={600}>
          Dining Options
        </Typography>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 320, p: 2 }}>
        <Scrollbar>
          {data.map((button, index) => {
            const isChecked = button.name === diningOption;
            return (
              <Button
                key={index}
                variant="outlined"
                color="error"
                fullWidth
                startIcon={React.cloneElement(button.icon, {
                  color: isChecked ? '#FF5C00' : '#828487',
                })}
                sx={{
                  borderColor: isChecked ? '#FF5C00' : '#E4E4E4',
                  backgroundColor: isChecked ? '#FFF5EE' : '#FFF',
                  mb: index === data.length - 1 ? 1.5 : 1,
                }}
                onClick={() => setDiningOption(button.name)}
              >
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  width="100%"
                  alignItems="center"
                >
                  <Typography color={isChecked ? '#FF5C00' : '#828487'}>{button.label}</Typography>

                  <Checkbox sx={{ borderRadius: '50%' }} checked={isChecked} />
                </Stack>
              </Button>
            );
          })}
        </Scrollbar>
      </CustomPopover>
    </>
  );
}

//  {
//    _contacts.map((contact) => (
//      <MenuItem key={contact.id} sx={{ p: 1 }}>
//        <Badge
//          variant={contact.status as 'alway' | 'online' | 'busy' | 'offline'}
//          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//          sx={{ mr: 2 }}
//        >
//          <Avatar alt={contact.name} src={contact.avatarUrl} />
//        </Badge>
//        <ListItemText
//          primary={contact.name}
//          secondary={contact.status === 'offline' ? fToNow(contact.lastActivity) : ''}
//          primaryTypographyProps={{ typography: 'subtitle2' }}
//          secondaryTypographyProps={{
//            typography: 'caption',
//            color: 'text.disabled',
//          }}
//        />
//      </MenuItem>
//    ));
//  }
