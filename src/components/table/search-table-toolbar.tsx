// @mui
import { Stack, Theme, Button, SxProps, TextField, InputAdornment } from '@mui/material';

// components
import Iconify from '../iconify';
// ----------------------------------------------------------------------
type Props = {
  filterName: string;
  isFiltered: boolean;
  onResetFilter: VoidFunction;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};
export default function TableToolbar({
  filterName,
  isFiltered,
  onFilterName,
  onResetFilter, // optionsService,
  sx,
}: Props) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3, ...sx }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        // placeholder={`${translate('content.searchNationalPlaceholder')}`}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ width: '344px' }}
      />
      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
