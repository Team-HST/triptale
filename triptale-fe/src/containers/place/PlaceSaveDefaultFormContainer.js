import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioWrapper: {
    marginTop: theme.spacing(2),
  },
  radioGroup: {
    justifyContent: 'center',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-16 19:15:21
 * @modify date 2021-01-18 22:26:44
 * @desc [일차 별 장소등록 기본 폼]
 */
function PlaceSaveDefaultFormContainer() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        기본정보
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <TextField required label="장소명" fullWidth autoComplete="given-name" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label="장소설명"
            multiline
            rows={2}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid className={classes.radioWrapper} item xs={12} sm={12}>
          <FormLabel component="legend">타입선택 *</FormLabel>
          <RadioGroup className={classes.radioGroup} area-label="placeType" name="placeType" row>
            <FormControlLabel value="1" control={<Radio />} label="장소" />
            <FormControlLabel value="2" control={<Radio />} label="숙소" />
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
}

export default PlaceSaveDefaultFormContainer;
