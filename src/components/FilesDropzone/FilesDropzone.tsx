import React, { Fragment, useCallback, useState } from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "@/utils/axiosInstance";
import { getBase64 } from "@/helpers/file";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    outline: "none",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    cursor: "pointer",
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5,
  },
  image: {
    width: 130,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    marginTop: 8,
  },
  actions: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  myButton: {
    backgroundColor: "transparent",
    padding: "6px 16px",
    border: "1px solid #aaa",
    borderRadius: 4,
    display: "inline-flex",
  },
  itemImage: {
    position: "relative",
    "&:hover > * + *": {
      opacity: 1,
    },
  },

  uploading: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  iconDelete: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "#fff",
    cursor: "pointer",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    opacity: 0,
    transition: "300ms",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 4,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
    opacity: 0,
    transition: "300ms",
  },
}));

interface FilesDropzoneProps {
  className?: string;
  title: string;
  importImage?: any;
  files?: any;
  multiple?: boolean;
  disabled?: boolean;
  handleDeleteImport?: any;
  typeUpload: string;
}

const FilesDropzone: React.FunctionComponent<FilesDropzoneProps> = (props: FilesDropzoneProps) => {
  const { className, title, importImage, handleDeleteImport, files, multiple, typeUpload, disabled = false, ...rest } = props;
  const [progress, setProgress] = useState<any>(0);
  const classes = useStyles();

  const handleDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      importImage({ type: "background", files: acceptedFiles.map((item: any) => URL.createObjectURL(item)) });
      setProgress(1);
      const listBase64 = await Promise.all(acceptedFiles.map((item: any) => getBase64(item)));
      const listUrlImage = await Promise.all(
        listBase64.map((item: any, index) =>
          axios({
            url: `${process.env.REACT_APP_API_URL}/upload/upload_image`,
            method: "POST",
            data: { base64_image: item, fileName: acceptedFiles[index].name, typeUpload: typeUpload },
            onUploadProgress: function (progressEvent: any) {
              if (progressEvent.loaded === progressEvent.total) {
                setProgress(100);
              } else {
                setProgress(Math.floor((progressEvent.loaded / progressEvent.total) * 100));
              }
            },
          })
        )
      );
      importImage({ type: "image", files: listUrlImage.map((item: any) => item.data.location) });
      setTimeout(() => {
        setProgress(0);
      }, 150);
    } else {
      alert("Dung lượng tệp tin của bạn vượt quá giới hạn cho phép 10MB");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: handleDrop,
    multiple,
    maxSize: 10 * 1024 * 1024, // 10mb
  });

  return (
    <div {...rest} className={classNames(classes.root, className)}>
      {!disabled && (
        <div
          className={classNames({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive,
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <a className={classes.myButton}>
            <PublishRoundedIcon fontSize={"small"} />
            <p>{title}</p>
          </a>
        </div>
      )}
      {files?.length > 0 && (
        <Fragment>
          <Grid className={classes.list} container spacing={1}>
            {multiple ? (
              files.map((file: any, index: number) => (
                <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                  <div className={classes.itemImage}>
                    {progress > 0 && file.includes("blob") && (
                      <div className={classes.uploading}>
                        <CircularProgress size={24} style={{ color: "#fff" }} variant="static" value={progress} />
                      </div>
                    )}
                    <img
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        height: files?.length > 1 ? 150 : "auto",
                        maxHeight: files?.length > 1 ? "auto" : 150,
                      }}
                      alt=""
                      src={file}
                    />
                    <DeleteIcon className={classes.iconDelete} onClick={() => handleDeleteImport(index)} />
                    <div className={classes.overlay} />
                  </div>
                </Grid>
              ))
            ) : (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <div className={classes.itemImage}>
                  {progress > 0 && (
                    <div className={classes.uploading}>
                      <CircularProgress size={24} style={{ color: "#fff" }} variant="static" value={progress} />
                    </div>
                  )}
                  <img
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: files?.length > 1 ? 150 : "auto",
                      maxHeight: files?.length > 1 ? "auto" : 150,
                    }}
                    alt=""
                    src={files}
                  />
                  <DeleteIcon className={classes.iconDelete} onClick={() => handleDeleteImport()} />
                  <div className={classes.overlay} />
                </div>
              </Grid>
            )}
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

export default FilesDropzone;
