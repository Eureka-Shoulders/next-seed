import { Page } from '@config/pages';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Router from 'next/router';
import React, { Fragment, useState } from 'react';

interface DrawerItemProps {
  page: Page;
  isDrawerOpen: boolean;
}

export const DrawerItem = ({ page, isDrawerOpen }: DrawerItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = (link: string, haveSub?: boolean) => {
    return () => {
      if (haveSub) {
        if (!isDrawerOpen) {
          // TODO: open drawer if its closed
        }

        return setExpanded(!expanded);
      }

      return Router.push(link);
    };
  };

  return (
    <Fragment key={page.link}>
      <ListItemButton
        key={page.link}
        sx={{ minHeight: 48 }}
        onClick={handleClick(page.link, !!page.sub)}
      >
        <ListItemIcon
          sx={{
            minWidth: isDrawerOpen ? 48 : 0,
          }}
        >
          <page.Icon />
        </ListItemIcon>
        <ListItemText hidden={!isDrawerOpen} primary={page.label} />
        {!!page.sub && isDrawerOpen ? (
          expanded ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItemButton>
      <Collapse in={isDrawerOpen && expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {page.sub?.map((subPage) => (
            <ListItemButton sx={{ pl: 4 }} key={subPage.link}>
              <ListItemIcon>
                <subPage.Icon />
              </ListItemIcon>
              <ListItemText hidden={!isDrawerOpen} primary={subPage.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};
