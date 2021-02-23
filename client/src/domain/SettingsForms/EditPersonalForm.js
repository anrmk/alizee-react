import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import {
  Grid,
  TextField,
  Typography,
  Box,
  MenuItem,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import * as yup from "yup";

import {
  EMPTY_VALUE_ERROR,
  BIRTHDAY_LESS_200_ERROR,
  BIRTHDAY_GREATER_18_ERROR,
  VALUE_MIN_LENGTH,
  VALUE_MAX_LENGTH,
} from "../../constants/form_validations";
import { COUNTRIES } from "../../constants/countries";
import { DOCUMENTS_TYPE } from "../../constants/documents";

import { getYearFromCurrentDate, getDate, getBase64 } from "../../helpers/functions";

const NAME_INPUT_ID = "name";
const LASTNAME_INPUT_ID = "lastName";
const BIRTHDAY_INPUT_ID = "birthday";
const GENDER_INPUT_ID = "gender";

const DOCUMENT_TYPE_INPUT_ID = "docType";
const DOCUMENT_EXP_DATE_INPUT_ID = "expDate";

const DOCUMENT_ID = "doc";
const DOCUMENT_SELFIE_ID = "docSelfie";

const ADDR_COUNTRY_SELECT_ID = "country";
const ADDR_ADDRESS_INPUT_ID = "address";
const ADDR_CITY_INPUT_ID = "city";
const ADDR_STATE_INPUT_ID = "state";
const ADDR_POSTAL_INPUT_ID = "postal";

const DOCUMENT_PHOTO_TITLE = "Photo of your ID";
const DOCUMENT_PHOTO_DESC = "Please upload a photo of your picture ID Document (i.e. Passport or Driving License)";
const DOCUMENT_PHOTO_SELFIE_TITLE = "Photo of holding your ID";
const DOCUMENT_PHOTO_SELFIE_DESC = "Please upload a photo holding your ID (i.e. a selfie, ensuring your face is clearly visible)";

const PERSONAL_INFO_HEADER = "Personal Information";
const PERSONAL_INFO_HELPER = "Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.";

const schema = yup.object().shape({
  [NAME_INPUT_ID]: yup.string()
    .required(EMPTY_VALUE_ERROR)
    .min(2, VALUE_MIN_LENGTH(2))
    .max(49, VALUE_MAX_LENGTH(49)),
  [LASTNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(2, VALUE_MIN_LENGTH(2))
    .max(49, VALUE_MAX_LENGTH(49)),
  [BIRTHDAY_INPUT_ID]: yup
    .date()
    .required(EMPTY_VALUE_ERROR)
    .min(new Date(getYearFromCurrentDate(200), 0, 1), BIRTHDAY_GREATER_18_ERROR)
    .max(new Date(getYearFromCurrentDate(18), 0, 1), BIRTHDAY_LESS_200_ERROR),
  [GENDER_INPUT_ID]: yup.string().notRequired(),

  [DOCUMENT_TYPE_INPUT_ID]: yup.number().required(EMPTY_VALUE_ERROR),
  [DOCUMENT_EXP_DATE_INPUT_ID]: yup.date().required(EMPTY_VALUE_ERROR),

  [ADDR_COUNTRY_SELECT_ID]: yup.string().notRequired(),
  [ADDR_ADDRESS_INPUT_ID]: yup.string().nullable().notRequired(),
  [ADDR_CITY_INPUT_ID]: yup.string().nullable().notRequired(),
  [ADDR_STATE_INPUT_ID]: yup.string().nullable().notRequired(),
  [ADDR_POSTAL_INPUT_ID]: yup.string().nullable().notRequired().max(10),
});

function EditPersonalForm({
  name,
  lastName,
  birthday,
  gender,
  doc,
  docSelfie,
  docType,
  expDate,
  country,
  address,
  city,
  state,
  postal,

  isFetching,
  onSubmit,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    register({ name: DOCUMENT_ID });
    register({ name: DOCUMENT_SELFIE_ID });
  }, []);

  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [NAME_INPUT_ID]: name,
      [LASTNAME_INPUT_ID]: lastName,
      [BIRTHDAY_INPUT_ID]: getDate(birthday),
      [GENDER_INPUT_ID]: gender,

      [DOCUMENT_ID]: doc,
      [DOCUMENT_SELFIE_ID]: docSelfie,
      [DOCUMENT_TYPE_INPUT_ID]: docType || 0,
      [DOCUMENT_EXP_DATE_INPUT_ID]: getDate(expDate),

      [ADDR_COUNTRY_SELECT_ID]: country || "US",
      [ADDR_ADDRESS_INPUT_ID]: address,
      [ADDR_CITY_INPUT_ID]: city,
      [ADDR_STATE_INPUT_ID]: state,
      [ADDR_POSTAL_INPUT_ID]: postal,
    },
  });

   const watcherDoc = watch(DOCUMENT_ID, doc);
   useEffect(() => () => {
    if (watcherDoc) {
      URL.revokeObjectURL(watcherDoc);
    }
   }, [watcherDoc, doc]);

   const watcherDocSelfie = watch(DOCUMENT_SELFIE_ID, docSelfie);
   useEffect(() => () => {
      if (watcherDocSelfie) {
        URL.revokeObjectURL(watcherDocSelfie);
      }
    }, [watcherDocSelfie, docSelfie]);

  const handleFileUpload = (element, name) => {
    const files = element.currentTarget.files;
    if(files.length === 1) {
      getBase64(files[0]).then(data => {
        setValue(name, data);
      });
    }
  }

  const renderField = (name, label, type, select, children) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            id={name}
            label={label}
            fullWidth
            variant="outlined"
            type={type || "text"}
            select={select}
            value={value}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            InputLabelProps={{
              shrink: true,
            }}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          >
            {children}
          </TextField>
        )}
      />
    );
  };

  const renderSelectOptions = (list) => {
    return list.map((option) => (
      <MenuItem key={option.code} value={option.code}>
        {option.name}
      </MenuItem>
    ));
  };

  const renderDocument = (name, url, title, desc) => {
    return (
      <Card>
        <CardActionArea component="label">
          {url ? <CardMedia image={url} style={{height: "118px"}} /> : <Skeleton variant="rect" height={118} />}
          <CardContent>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {desc}
            </Typography>
          </CardContent>
          <input hidden type="file" name={name} onChange={(e) => handleFileUpload(e, name)} />
        </CardActionArea>
      </Card>
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {renderField(NAME_INPUT_ID, t("Name"))}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderField(LASTNAME_INPUT_ID, t("LastName"))} 
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderField(BIRTHDAY_INPUT_ID, t("Bithdate"), "date")}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderField(GENDER_INPUT_ID, t("Gender"))}
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6">Document</Typography>
      <Divider />
 
      <Box py={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {renderDocument(DOCUMENT_ID, watcherDoc, DOCUMENT_PHOTO_TITLE, DOCUMENT_PHOTO_DESC)}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderDocument(DOCUMENT_SELFIE_ID, watcherDocSelfie, DOCUMENT_PHOTO_SELFIE_TITLE, DOCUMENT_PHOTO_SELFIE_DESC)}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderField(DOCUMENT_TYPE_INPUT_ID, t("DocType"), "", true, renderSelectOptions(DOCUMENTS_TYPE))}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderField(DOCUMENT_EXP_DATE_INPUT_ID, t("ExpDate"), "date")}
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6">Address</Typography>
      <Divider />

      <Box py={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {renderField(ADDR_COUNTRY_SELECT_ID, t("Country"), "", true, renderSelectOptions(COUNTRIES))}
          </Grid>
          <Grid item xs={12}>
            {renderField(ADDR_ADDRESS_INPUT_ID, t("Address"))}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderField(ADDR_CITY_INPUT_ID, t("City"))}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderField(ADDR_STATE_INPUT_ID, t("State"))}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderField(ADDR_POSTAL_INPUT_ID, t("Postal"),)}
          </Grid>
        </Grid>
      </Box>
      
      <Button type="submit" variant="contained" color="primary" disableElevation disabled={isFetching}>
        Update
      </Button>
    </Box>
  );
}

export default EditPersonalForm;
