import { Box, ClickAwayListener, Grow, Paper, Popper, Tab, Tabs } from '@mui/material';
import { memo, useState } from 'react';

import AutocompleteFilter from './inputs/AutocompleteFilter';
import CPFFilter from './inputs/CPFFilter';
import DateFilter from './inputs/DateFilter';
import DateRangeFilter from './inputs/DateRangeFilter';
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

function FiltersModalComponent({ state, anchorEl, handleClose, filters }: FiltersModalProps) {
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
            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Box p={1}>
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
                    {filters.map((filter) => (
                      <Tab key={`tab-${filter.field}`} label={filter.title} />
                    ))}
                  </Tabs>

                  {filters.map((filter, index) => {
                    const key = `tabpanel-${filter.field}`;

                    switch (filter.type) {
                      case 'number':
                        return (
                          <NumericFilter
                            key={key}
                            name={filter.field}
                            precision={filter.precision}
                            decimalChar={filter.decimalChar}
                            thousandChar={filter.thousandChar}
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

                      case 'dateRange':
                        return (
                          <DateRangeFilter
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

                      case 'autocomplete':
                        return (
                          <AutocompleteFilter
                            key={key}
                            name={filter.field}
                            activeTab={activeTab}
                            index={index}
                            multiple={filter.multiple}
                            repository={filter.repository}
                            options={filter.options}
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
          </Box>
        </Grow>
      )}
    </Popper>
  );
}

export const FiltersModal = memo(FiltersModalComponent);
