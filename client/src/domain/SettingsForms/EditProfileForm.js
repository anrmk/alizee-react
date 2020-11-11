import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask'

import { Avatar } from "../../components/Avatar";
import ChipsInput from "../../components/ChipsInput";
import { SITE_REGEX, PHONE_REGEX } from "../../constants/regexs";
import { getDate } from "../../helpers/functions";

import "./SettingsForms.scss";

function EditProfileForm({
  avatarUrl,
  name,
  username,
  bio,
  phoneNumber,
  birthday,
  gender,
  sites,
  loading,

  onSubmit
}) {
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    errors, 
    control 
  } = useForm({
    defaultValues: {
      avatarUrl,
      name,
      username,
      bio,
      phoneNumber,
      birthday: getDate(birthday),
      gender,
      sites
    }
  });

  useEffect(() => {
    register({ name: 'avatarUrl' });
    register({ name: 'avatarFile' });
    register({ name: 'sites' });
  }, [])

  const watcherAvatarUrl = watch("avatarUrl", avatarUrl);
  const fileInputEl = useRef(null);
  const chipsInputFilters = [
    val => {
      return !(SITE_REGEX.test(val)) ? 
        `${val} is not a valid address.` : 
        false;
    },
  ]

  useEffect(() => () => {
    if (watcherAvatarUrl) {
      URL.revokeObjectURL(watcherAvatarUrl);
    }
  }, [watcherAvatarUrl, avatarUrl])

  useEffect(() => {
    setValue("avatarUrl", avatarUrl);
  }, [avatarUrl])

  const handleAvatarUrlChange = () => {
    const files = fileInputEl.current.files;

    if (files.length === 1) {
      const fileURL = URL.createObjectURL(files[0]);
      setValue("avatarFile", files[0]);
      setValue("avatarUrl", fileURL);
    }
  }

  const handleSitesChange = data => {
    setValue("sites", data);
  }

  return (
    <div className="c-form">
      <div className="row">
        <div className="col-lg-3">
          <Avatar url={watcherAvatarUrl} />
        </div>
        <div className="col-lg-9">
          <p className="m-lg-0 m-md-0 h4 font-weight-light">{username}</p>
          <label>
            <p className="c-link">Change Profile Photo</p>
            <input 
              type="file" 
              ref={fileInputEl} 
              name="avatarUrl" 
              className="d-none" 
              onChange={handleAvatarUrlChange} />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="name" className="col-lg-3 col-form-label font-weight-bold">Name</label>
          <div className="col-lg-9">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter name"
              ref={register({ required: true })} />
            {errors.name && <div className="c-invalid-feedback">Please enter a name.</div>}
            <small className="form-text text-muted" name="nameHelp">
              Help people discover your account by using the name you're know by: 
              either your full name, username or business name.
            </small>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="username" className="col-lg-3 col-form-label font-weight-bold">Username</label>
          <div className="col-lg-9">
            <input
              type="text"
              className={`form-control c-form-control ${errors.username && "c-form-control--invalid"}`}
              name="username"
              placeholder="Enter username"
              ref={register({ required: true })} />
            {errors.username && <div className="c-invalid-feedback">Please enter a username.</div>}
          </div>
        </div>

        <div className="form-group row">
          <label 
            htmlFor="username" 
            className="col-lg-3 col-form-label font-weight-bold d-flex align-items-center">
            Sites
          </label>
          <div className="col-lg-9">
            <ChipsInput 
              className="form-control c-form-control" 
              max={4}
              items={sites}
              filters={chipsInputFilters} 
              onChange={handleSitesChange} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="bio" className="col-lg-3 col-form-label font-weight-bold">Bio</label>
          <div className="col-lg-9">
            <textarea
              type="text"
              className="form-control c-form-control"
              name="bio"
              maxLength="255"
              ref={register({ maxLength: 255 })} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="birthday" className="col-lg-3 col-form-label font-weight-bold">Birthday</label>
          <div className="col-lg-9">
            <input
              type="date"
              className="form-control c-form-control"
              name="birthday"
              ref={register()} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="phoneNumber" className="col-lg-3 col-form-label font-weight-bold">Phone Number</label>
          <div className="col-lg-9">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <MaskedInput
                  mask={PHONE_REGEX}
                  className="form-control"
                  placeholder="Enter a phone number"
                  guide={true}
                  id="my-input-id"
                  value={value}
                  onBlur={onBlur}
                  onChange={e => onChange(e.target.value.replace(/\D+/g, ''))}
                />
              )} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="gender" className="col-lg-3 col-form-label font-weight-bold">Gender</label>
          <div className="col-lg-9">
            <input
              type="text"
              className="form-control c-form-control"
              name="gender"
              ref={register()} />
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-grow spinner-grow-sm mr-2 p-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;
