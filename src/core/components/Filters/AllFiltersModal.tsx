import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { Formix } from '@euk-labs/formix';
import {
  FXDatePicker,
  FXMaskedField,
  FXNumericField,
  FXTextField,
} from '@euk-labs/formix-mui';

import When from '../Utility/When';
import FiltersStore from './filters.store';
import { getFilterValue } from './utils';

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

          case 'date':
            field = <FXDatePicker name={filter.field} label={filter.title} />;

          // case 'enum':
          //   return (
          //     <EnumFilter {...defaultProps} options={filter.enums!} />
          //   );

          case 'cpf':
            field = (
              <FXMaskedField
                name={filter.field}
                label={filter.title}
                mask="999.999.999-99"
              />
            );

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
  // FIXME: duplicated code
  function handleSubmit(values: Record<string, unknown>) {
    const newFilters: Record<string, unknown> = {};

    filtersStore.filters.forEach((filter) => {
      if (values[filter.field] !== '')
        newFilters[filter.field] = getFilterValue(filter, values);
    });

    filtersStore.setValues(newFilters);
    filtersStore.closeAllFilters();
  }

  // TODO: keep values in sync
  return (
    <When is={!!filtersStore.initialValues}>
      <Formix
        initialValues={filtersStore.initialValues!}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2} mt="0px">
          <FiltersList filtersStore={filtersStore} />
        </Grid>
      </Formix>
    </When>
  );
}

export default observer(AllFiltersModal);
