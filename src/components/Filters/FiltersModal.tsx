import {
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Tab,
  Tabs,
} from '@mui/material';
import { memo, useState } from 'react';

import CPFFilter from './inputs/CPFFilter';
import DateFilter from './inputs/DateFilter';
import EnumFilter from './inputs/EnumFilter';
import NumericFilter from './inputs/NumericFilter';
import TextFilter from './inputs/TextFilter';
import { Filter } from './types';

interface FiltersModalProps {
  state: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose(event: Event | React.SyntheticEvent): void;
  filters: Filter[];
}

function FiltersModalComponent({
  state,
  anchorEl,
  handleClose,
  filters,
}: FiltersModalProps) {
  const [activeTab, setActiveTab] = useState(0);

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  return (
    <Popper
      open={state}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
      style={{ zIndex: 10 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper elevation={6}>
            <ClickAwayListener onClickAway={handleClose}>
              <Box maxWidth={700}>
                <Tabs
                  variant="scrollable"
                  value={activeTab}
                  onChange={handleChangeTab}
                  sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    maxHeight: 400,
                  }}
                >
                  {filters.map((filter) => {
                    return (
                      <Tab key={`tab-${filter.field}`} label={filter.title} />
                    );
                  })}
                </Tabs>

                {filters.map((filter, index) => {
                  const key = `tabpanel-${filter.field}`;

                  switch (filter.type) {
                    case 'number':
                      return (
                        <NumericFilter
                          key={key}
                          name={filter.field}
                          precision={0}
                          activeTab={activeTab}
                          index={index}
                        />
                      );

                    case 'date':
                      return (
                        <DateFilter
                          key={key}
                          name={filter.field}
                          activeTab={activeTab}
                          index={index}
                        />
                      );

                    case 'enum':
                      return (
                        <EnumFilter
                          key={key}
                          name={filter.field}
                          activeTab={activeTab}
                          index={index}
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          options={filter.enums!}
                        />
                      );

                    case 'cpf':
                      return (
                        <CPFFilter
                          key={key}
                          name={filter.field}
                          activeTab={activeTab}
                          index={index}
                        />
                      );

                    default:
                      return (
                        <TextFilter
                          key={key}
                          name={filter.field}
                          activeTab={activeTab}
                          index={index}
                        />
                      );
                  }
                })}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export const FiltersModal = memo(FiltersModalComponent);
