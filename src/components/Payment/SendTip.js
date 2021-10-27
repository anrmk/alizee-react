import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  FormHelperText,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { formatCurrency } from "../../helpers/functions";

import Avatar from "../Avatar";
import { TAX_PERCENTAGE } from "../../constants/payment";

const MESSAGE_MAX_LENGTH = 255;
const AMOUNT_MIN_SIZE = 1;
const AMOUNT_MAX_SIZE = 50;
const AMOUNT_INPUT_ID = "amount";
const MESSAGE_INPUT_ID = "message";
const USER_ID = "userName";
const EMPTY_VALUE_ERROR = "It is a required filed";
const INVALID_AMOUNT_MAX_ERROR = "Maximum $50 USD";

const schema = yup.object().shape({
  [AMOUNT_INPUT_ID]: yup
    .number()
    .min(AMOUNT_MIN_SIZE)
    .max(AMOUNT_MAX_SIZE)
    .required(EMPTY_VALUE_ERROR),
  [MESSAGE_INPUT_ID]: yup.string().max(MESSAGE_MAX_LENGTH),
  [USER_ID]: yup.string(),
});

function SendTip({
  formId,
  user,
  isDonate,

  onSubmit,
}) {
  const { errors, control, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [AMOUNT_INPUT_ID]: "",
      [MESSAGE_INPUT_ID]: "",
      [USER_ID]: user?.userName,
    },
  });

  useEffect(() => {
    register({ name: USER_ID });
  }, []);

  const handleFormSubmit = (data) => {
    onSubmit && onSubmit({ ...data, postId: user.id }, isDonate);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        title={user.name}
        subheader={user.userName}
      />
      <CardContent
        component="form"
        id={formId}
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off">
        <Controller
          name={AMOUNT_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <>
              <TextField
                id={AMOUNT_INPUT_ID}
                name={AMOUNT_INPUT_ID}
                fullWidth
                variant="outlined"
                label="Amount"
                type="number"
                value={value}
                error={!!errors[AMOUNT_INPUT_ID]}
                helperText={errors[AMOUNT_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={onChange}
                InputProps={{
                  inputProps: {
                    min: AMOUNT_MIN_SIZE,
                    max: AMOUNT_MAX_SIZE,
                  },
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      + {value && formatCurrency(value * TAX_PERCENTAGE)} (GTS)
                    </InputAdornment>
                  ),
                }}
              />
              {isDonate && (
                <Box display="flex" mt={0.5} mb={0.5}>
                  <ButtonGroup
                    size="small"
                    color="primary"
                    aria-label="large outlined primary button group">
                    <Button type="button" onClick={() => onChange(10)}>
                      10$
                    </Button>
                    <Button type="button" onClick={() => onChange(20)}>
                      20$
                    </Button>
                    <Button type="button" onClick={() => onChange(30)}>
                      30$
                    </Button>
                    <Button type="button" onClick={() => onChange(40)}>
                      40$
                    </Button>
                    <Button type="button" onClick={() => onChange(50)}>
                      50$
                    </Button>
                  </ButtonGroup>
                </Box>
              )}

              <Box display="flex" alignItems="between">
                <Box flexGrow={1}>
                  <FormHelperText>{INVALID_AMOUNT_MAX_ERROR}</FormHelperText>
                </Box>
                <Box>
                  <FormHelperText>
                    Total:{" "}
                    {value &&
                      formatCurrency(value * 1 + value * TAX_PERCENTAGE)}
                  </FormHelperText>
                </Box>
              </Box>
            </>
          )}
        />

        <Controller
          name={MESSAGE_INPUT_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              variant="outlined"
              fullWidth
              multiline
              maxRows="3"
              id={MESSAGE_INPUT_ID}
              name={MESSAGE_INPUT_ID}
              label="Message"
              type="text"
              value={value}
              error={!!errors[MESSAGE_INPUT_ID]}
              helperText={errors[MESSAGE_INPUT_ID]?.message}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
              InputProps={{
                inputProps: {
                  maxLength: MESSAGE_MAX_LENGTH,
                },
              }}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}

export default SendTip;
