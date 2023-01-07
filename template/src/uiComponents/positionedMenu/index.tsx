import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Icon,
  PopoverOrigin
} from '@mui/material';
import {FormattedMessage} from 'react-intl';
import { ThemeProvider, createTheme, Theme} from '@mui/material/styles';
import { defaultTheme as BasicTheme } from '@/styles'; 
import _ from 'lodash';

export type PositionedMenuProps = {
  options:PositionedMenuOptions;
  overrideTheme?: Theme;
  onChange?(data:PositionedMenuItem):void
}

export type PositionedMenuOptions = {
  data: PositionedMenuItem[],
  defaultValue?: string | number;
  disabledIcon?:boolean
  icon?: {
    up: string;
    down: string;
  }
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
}

export type PositionedMenuItem = {
  value: string | number;
  label: string;
  [key:string]:any
}

export const PositionedMenu:React.FC<PositionedMenuProps> = (props) => {
  const {options, overrideTheme, onChange} = props;
  const defaultTheme = createTheme(_.defaultsDeep( BasicTheme))
  const theme = createTheme(_.defaultsDeep({
    components: {
    }
  }, overrideTheme || defaultTheme));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<PositionedMenuItem>();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (item:PositionedMenuItem) => {
    setSelectedItem(item);
    setAnchorEl(null);
    if(typeof onChange === 'function') {
      onChange(item)
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  
  React.useEffect(() => {
    const defaultItem = options.data.find((item) => item.value === options.defaultValue)
    setSelectedItem(defaultItem)
  }, [options])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          id="positioned-button"
          aria-controls={open ? 'positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="inherit"
        >
          {
            selectedItem &&
            <FormattedMessage id={selectedItem.label} defaultMessage={selectedItem.label}/>
          }
          {
            !options.disabledIcon && <Icon>{open ? (options.icon && options.icon.up) || 'arrow_drop_up' : (options.icon && options.icon.down) || 'arrow_drop_down'}</Icon>
          }
        </Button>
        <Menu
          id="positioned-menu"
          aria-labelledby="positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={ options.anchorOrigin || {
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={ options.transformOrigin || {
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {
            options.data.map((item:PositionedMenuItem) => {
              return (
                <MenuItem key={item.value} selected={item.value === (selectedItem && selectedItem.value)} onClick={() => {
                  if(item.value !== (selectedItem && selectedItem.value)) {
                    handleSelect(item)
                  }
                }}><FormattedMessage id={item.label} defaultMessage={item.label}/></MenuItem>
              )
            })
          }
        </Menu>
      </div>
    </ThemeProvider>
  );
}

export default PositionedMenu;