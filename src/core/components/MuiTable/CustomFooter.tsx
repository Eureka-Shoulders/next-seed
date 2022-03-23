import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Pagination, Typography } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { differenceInSeconds, formatDistanceToNowStrict } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import useTranslation from '@core/hooks/useTranslation';

const ONE_MINUTE = 60 * 1000;

function CustomFooter() {
  const { translate, dateFnsLocale } = useTranslation();
  const apiRef = useGridApiContext();
  const [date, setDate] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState('');

  function updateLastUpdatedText() {
    const distance = differenceInSeconds(new Date(), date);

    if (distance < 60) {
      return setLastUpdated(translate('common.updatedJustNow'));
    }

    const formattedDateDistance = formatDistanceToNowStrict(date, {
      roundingMethod: 'ceil',
      addSuffix: true,
      locale: dateFnsLocale,
    });

    setLastUpdated(`${translate('common.updated')} ${formattedDateDistance}`);
  }

  useEffect(() => {
    const rowsListener = apiRef.current.subscribeEvent('rowsSet', () => {
      setDate(new Date());
    });
    const lastUpdatedInterval = setInterval(() => {
      updateLastUpdatedText();
    }, ONE_MINUTE);

    return () => {
      rowsListener();
      clearInterval(lastUpdatedInterval);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    updateLastUpdatedText();
  }, [date]); // eslint-disable-line

  return (
    <Box
      p={1}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" alignItems="center" gap={1}>
        <RefreshIcon color="disabled" />
        <Typography color="text.secondary" variant="body2">
          {lastUpdated}
        </Typography>
      </Box>

      <Pagination
        color="standard"
        count={apiRef.current.state.pagination.pageCount}
        page={apiRef.current.state.pagination.page + 1}
        onChange={(_event, value) => apiRef.current.setPage(value - 1)}
      />
    </Box>
  );
}

export default observer(CustomFooter);
