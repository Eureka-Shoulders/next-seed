import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useFormixContext } from '@euk-labs/formix';
import {
  FXCheckboxGroup,
  FXDatePicker,
  FXMaskedField,
  FXNumericField,
  FXTextField,
} from '@euk-labs/formix-mui';

import Trans from '../Trans';
import FiltersStore from './filters.store';

interface Props {
  filtersStore: FiltersStore;
}

function FiltersList({ filtersStore }: Props) {
  return (
    <>
      {filtersStore.filters.map((filter) => {
        let field;

        switch (filter.type) {
          case 'number':
            field = (
              <FXNumericField
                name={filter.field}
                label={filter.title}
                precision={filter.precision}
                decimalChar={filter.decimalChar}
                thousandChar={filter.thousandChar}
              />
            );
            break;

          case 'date':
            field = (
              <FXDatePicker
                name={filter.field}
                label={filter.title}
                inputFormat="dd/MM/yyyy"
              />
            );
            break;

          case 'enum':
            field = (
              <FXCheckboxGroup
                label={filter.title}
                options={filter.enums!.map((option) => ({
                  name: `${filter.field}.${option.value}`,
                  label: option.title,
                }))}
              />
            );
            break;

          case 'cpf':
            field = (
              <FXMaskedField
                name={filter.field}
                label={filter.title}
                mask="999.999.999-99"
              />
            );
            break;

          default:
            field = <FXTextField name={filter.field} label={filter.title} />;
        }

        return (
          <Grid key={filter.field} item xs={12}>
            {field}
          </Grid>
        );
      })}
    </>
  );
}

function AllFiltersModal({ filtersStore }: Props) {
  const formix = useFormixContext();

  return (
    <Dialog
      open={filtersStore.isAllFiltersModalOpen}
      onClose={filtersStore.closeAllFilters}
    >
      <DialogTitle>
        <Trans id="filters.all" />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={0}>
          <FiltersList filtersStore={filtersStore} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={filtersStore.closeAllFilters}>
          <Trans id="actions.goBack" />
        </Button>
        <Button variant="contained" onClick={formix.submitForm}>
          <Trans id="actions.filters.submit" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default observer(AllFiltersModal);
