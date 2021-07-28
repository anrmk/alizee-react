import React, { useEffect, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

import { getMediaType, getWithoutRepeats } from "../../helpers/functions";
import { MEGABYTE } from "../../constants/units";
import {
  getErrorMaxFileSize,
  getErrorMaxFilesCount,
} from "../../constants/errors";
import {
  FILE_UPLOADER_MAX_FILES_COUNT,
  FILE_UPLOADER_MAX_FILE_SIZE,
} from "../../constants/components";

import Thumb from "./Tumb";

import "./FileUploader.scss";

const getColor = (events) => {
  if (events.isDragAccept) {
    return "#00e676";
  }
  if (events.isDragReject) {
    return "#ff1744";
  }
  if (events.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const getStyle = (props) => ({ borderColor: getColor(props) });

const FileUploader = React.forwardRef(
  ({ filters, mbSize, filesCount, className, onChange, onItemDrop }, ref) => {
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [localFilters, setLocalFilters] = useState([
      (file) =>
        file.size > mbSize * MEGABYTE &&
        getErrorMaxFileSize(file.name, `${mbSize}mb`),
    ]);

    const handleDropdownDrop = (passedFiles) => {
      onItemDrop && onItemDrop(passedFiles);

      const nonDuplicateFiles = getWithoutRepeats(
        [...files, ...passedFiles],
        "name"
      );
      if (nonDuplicateFiles.length > filesCount) {
        return setErrors([getErrorMaxFilesCount(filesCount)]);
      }

      const { filteredFiles, errorsWithFiles } =
        getFilteredFiles(nonDuplicateFiles);

      setErrors(errorsWithFiles);

      if (filteredFiles.length) {
        setFiles(filteredFiles);
      }
    };

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: "image/*, video/*",
      noClick: !!files.length,
      onDrop: handleDropdownDrop,
    });

    useEffect(() => {
      setLocalFilters([...localFilters, ...filters]);
    }, []);

    useEffect(() => {
      onChange && onChange(files);

      return () => {
        files.forEach((file) => URL.revokeObjectURL(file.previewUrl));
      };
    }, [files]);

    const handleDeleteBtnClick = (name) => {
      const nonRemovedFiles = files.filter((file) => file.name !== name);

      setFiles(nonRemovedFiles);
      setErrors([]);
    };

    const getFilteredFiles = (list) => {
      const filteredFiles = [];
      let errorsWithFiles = [];

      list.forEach((file) => {
        const errorsWithFile = [];
        localFilters.forEach((filter) => {
          const filterError = filter(file, list);
          if (filterError) {
            errorsWithFile.push(filterError);
          }
        });

        if (!errorsWithFile.length) {
          const extendedFileData = extendFileData(file);

          filteredFiles.push(extendedFileData);
        } else {
          errorsWithFiles = [...errorsWithFiles, ...errorsWithFile];
        }
      });

      return {
        filteredFiles,
        errorsWithFiles,
      };
    };

    const extendFileData = (file) => {
      let fileType = "";
      let previewUrl = "";
      let originFile = {};

      if (file?.originFile) {
        fileType = file.originFile.type.substring(
          0,
          file.originFile.type.indexOf("/")
        );
        previewUrl = URL.createObjectURL(file.originFile);
        originFile = file.originFile;
      } else {
        fileType = file.type.substring(0, file.type.indexOf("/"));
        previewUrl = URL.createObjectURL(file);
        originFile = file;
      }

      return {
        originFile,
        name: file.name,
        mediaType: getMediaType(fileType),
        stringType: fileType,
        previewUrl,
      };
    };

    useImperativeHandle(ref, () => ({
      resetData() {
        setFiles([]);
        setErrors([]);
      },
    }));

    return (
      <section>
        <div
          {...getRootProps({
            className: `drop-zone ${className}`,
            style: getStyle({
              isDragActive,
              isDragAccept,
              isDragReject,
              files,
            }),
          })}>
          <input {...getInputProps()} />
          {!files.length && (
            <p className="m-0">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
          <div className="thumbs-list">
            {files.length > 0 &&
              files.map((file) => (
                <Thumb
                  key={file.name}
                  previewUrl={file.previewUrl}
                  mediaType={file.mediaType}
                  onDeleteClick={handleDeleteBtnClick}
                />
              ))}
          </div>
        </div>
        {errors.length > 0 &&
          errors.map((error) => (
            <p className="m-0 text-danger">
              <small>{error}</small>
            </p>
          ))}
      </section>
    );
  }
);

FileUploader.propTypes = {
  filters: PropTypes.array,
  mbSize: PropTypes.number,
  filesCount: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onItemDrop: PropTypes.func,
};

FileUploader.defaultProps = {
  filters: [],
  mbSize: FILE_UPLOADER_MAX_FILE_SIZE,
  filesCount: FILE_UPLOADER_MAX_FILES_COUNT,
  className: "",
  onChange: undefined,
  onItemDrop: undefined,
};

export default FileUploader;
