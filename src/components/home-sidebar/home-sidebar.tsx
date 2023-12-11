import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import SvgColor from 'src/components/svg-color';

const TABS = [
  {
    value: 'one',
    icon: <SvgColor src="/assets/icons/home/coffee.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Coffee',
  },
  {
    value: 'two',
    icon: <SvgColor src="/assets/icons/home/beverages.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Beverages',
  },
  {
    value: 'three',
    icon: <SvgColor src="/assets/icons/home/food.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Food',
  },
  {
    value: 'four',
    icon: <SvgColor src="/assets/icons/home/appetizer.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Appetizer',
  },
  {
    value: 'five',
    icon: <SvgColor src="/assets/icons/home/bread.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Bread',
  },
  {
    value: 'six',
    icon: <SvgColor src="/assets/icons/home/snack.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Snack',
  },
];

const HomeSidebar = ({ currentTab, handleChangeTab }: any) => {
  return (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      orientation="vertical"
      centered
      variant="standard"
    >
      {TABS.map((tab: any) => (
        <Tab
          sx={{
            mx: 'auto',
            my: '6px',
            px: '6px',
            py: '12px',
            fontSize: '12px',
            width: '77px',
            height: '78px',
            borderRadius: '8px',
            background:
              currentTab === tab.value
                ? 'linear-gradient(218.57deg, #FFAB18 -6.67%, #FF2197 137.69%)'
                : '',
            color: currentTab === tab.value ? 'white' : '',
          }}
          iconPosition="top"
          key={tab.value}
          icon={tab.icon}
          label={tab.label}
          value={tab.value}
        />
      ))}
    </Tabs>
  );
};

export default HomeSidebar;
