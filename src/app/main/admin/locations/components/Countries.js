import React, { useState } from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, Lookup, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper, Button, Icon } from '@material-ui/core';
import jwtService from 'app/services/jwtService';
import * as base from 'app/env';

const api = base.api;

export default function Countries() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileBox, setFileBox] = useState(false);

  const id = jwtService.getUserId();

  const countries = createStore({
    key: 'id',
    loadUrl: api + 'countries/get',
    insertUrl: api + 'countries/insert',
    updateUrl: api + 'countries/update',
    deleteUrl: api + 'countries/delete'
  });

  const continents = createStore({
    key: 'id',
    loadUrl: api + 'continents/get'
  });

  const subcontinents = createStore({
    key: 'id',
    loadUrl: api + 'subcontinents/get'
  });

  // const flag = (data) => {
  //   if(data.value) {
  //     return <img className="table_logo" src={data.value} alt="Country Flag" />;
  //   }
  // };
  //
  // const handleUpload = (e) => {
  //   const file = e.target.files[0];
  //
  //   if (!file) { return; }
  //   const reader = new FileReader();
  //
  //   reader.readAsText(file);
  //
  //   reader.onload = () => {
  //     setFile(file);
  //     setFileName(file.name);
  //     setFileBox(true);
  //   };
  //
  //   reader.onerror = function () {};
  // };
  //
  // const uploader = (data) => {
  //   return (
  //     <div className="flex">
  //       {data.value && <img className="table_logo mr-16" src={data.value} alt="Country Flag" />}
  //       <input accept="image/*" className="hidden" id="button-file" type="file" onChange={handleUpload} />
  //       <label htmlFor="button-file" className="cursor-pointer">
  //         <Button variant="contained" className="my-8 normal-case" component="span">
  //           <Icon className="mr-8">cloud_upload</Icon> Upload
  //         </Button>
  //       </label>
  //
  //       {fileBox &&
  //         <div className="flex flex-col">
  //           <Icon className="mt-16">insert_drive_file</Icon>
  //           <p>{fileName}</p>
  //         </div>
  //       }
  //     </div>
  //   );
  // };
  //
  // const onInitNewRow = () => {
  //   setFile(null);
  //   setFileName(null);
  //   setFileBox(false);
  // };
  //
  // const onRowInserted = (data) => {
  //   console.log(data);
  //   if (file !== null) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("key", data.key);
  //     formData.append("id", id);
  //     fetch(api + 'countries/flag', { method: 'PUT', body: formData }).then(res => { res.text() });
  //   }
  // };
  //
  // const onRowUpdated = (data) => {
  //   console.log(data);
  //   if (file !== null) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("key", data.key);
  //     formData.append("id", id);
  //     fetch(api + 'countries/flag', { method: 'PUT', body: formData }).then(res => { res.text() });
  //   }
  // };

  return (
    <Paper className="w-full">
      <DataGrid dataSource={countries} showBorders={true} allowColumnReordering={true}> {/*onInitNewRow={onInitNewRow} onRowInserted={onRowInserted} onRowUpdated={onRowUpdated}*/}
				<RemoteOperations />
				<SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="countries_table" />
				<Export enabled={true} fileName="Uniranks-Countries" allowExportSelectedData={true} />
        <Selection mode="multiple" />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
        <Column dataField="code" caption="Code">
          <RequiredRule />
        </Column>
        <Column dataField="continent_id_1" caption="Continent ID | 1">
          <Lookup dataSource={continents} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="continent_id_2" caption="Continent ID | 2">
          <Lookup dataSource={continents} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="continent_id_3" caption="Continent ID | 3">
          <Lookup dataSource={continents} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="subcontinent_id_1" caption="Sub Continent ID | 1">
          <Lookup dataSource={subcontinents} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="subcontinent_id_2" caption="Sub Continent ID | 2">
          <Lookup dataSource={subcontinents} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="subcontinent_id_3" caption="Sub Continent ID | 3">
          <Lookup dataSource={subcontinents} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="country_name" caption="Country Name">
          <RequiredRule />
        </Column>
        <Column dataField="local_name" caption="Local Name" />
        <Column dataField="url" caption="URL" />
        <Column dataField="latitude" caption="Latitude" />
        <Column dataField="longitude" caption="Longitude" />
        <Column width="80" dataField="flag" caption="Flag"> {/*editCellRender={uploader} cellRender={flag}*/}
          <RequiredRule />
        </Column>
        <Column dataField="map" caption="Map" />
        <Column dataField="subcontinent_id" caption="Sub Continent ID" />
		    <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50, 100]} showInfo={true} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
