import React, { useState } from 'react';
import DataGrid, { RemoteOperations, Sorting, Editing, StateStoring, Column, Lookup } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Icon, Typography, Button } from '@material-ui/core';
import jwtService from 'app/services/jwtService';
import * as base from 'app/env';
import clsx from 'clsx';

const useStyles = makeStyles({
  uploader_cell: {
    display: 'flex'
  },
  button: {
    background: '#039be5',
    color: '#fff',
    '&:hover': {
      background: '#039be5',
      color: '#fff'
    }
  }
});

export default function MaterialsTable() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [icon, setIcon] = useState(false);

  const api = base.api;

  const id = jwtService.getUserId();

  const materialsDataSource = createStore({
    key: 'id',
    loadUrl: api + 'materials/get?id=' + id,
    insertUrl: api + 'materials/insert?id=' + id,
    updateUrl: api + 'materials/update',
    deleteUrl: api + 'materials/delete'
  });

  const typeDataSource = [
    { id: 1, type: 'Document' },
    { id: 2, type: 'Video' }
  ];

  const classes = useStyles();

  const handleUpload = (e) => {
    const upFile = e.target.files[0];

    if (!upFile) { return; }
    const reader = new FileReader();

    reader.readAsText(upFile);

    reader.onload = () => {
      setFile(upFile);
      setFileName(upFile.name);
      setIcon(true);
    };

    reader.onerror = function () {};
  };

  const fileUploader = (data) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", data.key);
      formData.append("id", id);
      fetch(api + 'uploadDoc', { method: 'PUT', body: formData }).then(res => { res.text() });
    }

    return (
      <div className={classes.uploader_cell}>
        <input accept=".png, .pdf, .ppt, .doc, .docx, .csv, .txt, image/*, video/*" className="hidden" id="button-file" type="file" onChange={handleUpload} />
        <label htmlFor="button-file" className="cursor-pointer">
          <Button variant="contained" className={clsx(classes.button, 'm-16 normal-case')} component="span">
            <Icon>attach_file</Icon>
          </Button>
        </label>

        {icon &&
          <div className="flex flex-col">
            <Icon className="mt-16">insert_drive_file</Icon>
            <p>{fileName}</p>
          </div>
        }
      </div>
    );
  };

  const onInitNewRow = () => {
    setFile(null);
    setFileName(null);
    setIcon(false);
  };

  const onRowInserted = (data) => {
    const key = data.key;

    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", key);
      formData.append("id", id);
      fetch(api + 'uploadDoc', { method: 'PUT', body: formData }).then(res => { res.text() });
    }
  };

  const onRowUpdated = (data) => {
    const key = data.key;

    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", key);
      formData.append("id", id);
      fetch(api + 'uploadDoc', { method: 'PUT', body: formData }).then(res => { res.text() });
    }
  };

  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={materialsDataSource}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
        onInitNewRow={onInitNewRow}
        onRowInserted={onRowInserted}
        onRowUpdated={onRowUpdated}
      >
				<RemoteOperations />
				<Sorting mode="multiple" />
				<Editing mode="row"	allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="materialsTable" />
				<Column dataField="type" caption="Type">
          <Lookup dataSource={typeDataSource} valueExpr="id" displayExpr="type" />
        </Column>
				<Column dataField="title" caption="Material Title">
        </Column>
        <Column dataField="url" caption="File" width={200} editCellRender={fileUploader} />
      </DataGrid>
      <Typography className="text-16 mt-16 ml-16 pb-16" color="textSecondary"><b>Note: </b>Video(s) upload is currently available only by uploading file(s), <u>not</u> links.</Typography>
    </Paper>
  );
}
