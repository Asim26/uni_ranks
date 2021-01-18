import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, Lookup, EmailRule, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper, Button, Icon, Typography } from '@material-ui/core';
// import * as base from 'app/env';

// const api = base.api;

export default function SuperAdmin() {
  // const admins = createStore({
  //   key: 'id',
  //   // loadUrl: api + 'admins/get',
  //   // insertUrl: api + 'admins/insert',
  //   // updateUrl: api + 'admins/update',
  //   // deleteUrl: api + 'admins/delete'
  // });

  const users = [
  	{
  		id: 1,
  		first_name: 'Majdi',
  		last_name: 'Hussin',
  		email: 'admin@uniranks.com',
      phone: 123456,
      country: 'UAE',
      city: 'Dubai',
  		password: 'admin',
  		confirmation: 'admin',
  		logo: 'assets/images/avatars/profile.jpg'
  	},
  	{
  		id: 2,
      first_name: 'Mohamad',
  		last_name: 'Noman',
  		email: 'noman@uniranks.com',
      phone: 123456,
      country: 'UAE',
      city: 'Dubai',
  		password: 'noman',
  		confirmation: 'noman',
  		logo: 'assets/images/avatars/profile.jpg'
  	},
  	{
  		id: 3,
      first_name: 'Hassan',
  		last_name: 'Ali',
  		email: 'hassan@uniranks.com',
      phone: 123456,
      country: 'UAE',
      city: 'Dubai',
  		password: 'hassan',
  		confirmation: 'hassan',
  		logo: 'assets/images/avatars/profile.jpg'
  	},
  	{
  		id: 4,
      first_name: 'Dragoljub',
  		last_name: 'Randjelovic',
  		email: 'drago@uniranks.com',
      phone: 123456,
      country: 'UAE',
      city: 'Dubai',
  		password: 'drago',
  		confirmation: 'drago',
  		logo: 'assets/images/avatars/cicak.jpg'
  	}
  ];

  const countries = [
    { id: 1, country: 'UAE' },
    { id: 2, country: 'Pakistan' },
    { id: 3, country: 'Serbia' }
  ];

  const cities = [
    { id: 1, city: 'Dubai' },
    { id: 2, city: 'Islamabad' },
    { id: 3, city: 'Belgrade' }
  ];

  const logo = (data) => {
    if(data.value) {
      return <img className="table_logo" src={data.value} alt="User Avatar" />;
    }
  };

  const handleUpload = (e) => {
    const upFile = e.target.files[0];

    if (!upFile) { return; }
    const reader = new FileReader();

    reader.readAsText(upFile);

    reader.onload = () => {

    };

    reader.onerror = function () {};
  };

  const uploader = (data) => {
    return (
      <div className="table_uploader flex">
        {data.value && <img className="table_logo mr-16" src={data.value} alt="User Avatar" />}
        <input accept=".png, .jpg, .jpeg, .webp" className="hidden" type="file" onChange={handleUpload} />
        <label htmlFor="button-file" className="cursor-pointer">
          <Button variant="contained" className="my-8 normal-case" component="span">
            <Icon className="mr-8">cloud_upload</Icon> Upload
          </Button>
        </label>
      </div>
    );
  };

  const passwordModifier = (e) => {
    if(e.dataField === "password" || e.dataField === "confirmation") {
      e.editorOptions.mode = 'password';
    }
  };

  return (
    <Paper className="w-full">
      <DataGrid dataSource={users} showBorders={true} rowAlternationEnabled={true} columnAutoWidth={true} allowColumnReordering={true} onEditorPreparing={passwordModifier}>
				<RemoteOperations />
				<SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="admins_table" />
				<Export enabled={true} fileName="Uniranks-SuperAdmins" allowExportSelectedData={true} />
        <Selection mode="multiple" />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
				<Column dataField="first_name" caption="First name">
          <RequiredRule />
        </Column>
				<Column dataField="last_name" caption="Last name">
          <RequiredRule />
        </Column>
        <Column dataField="email" caption="Email">
          <EmailRule />
          <RequiredRule />
        </Column>
        <Column dataField="phone" dataType="number" caption="Phone">
          <RequiredRule />
        </Column>
        <Column dataField="country" caption="Country">
          <RequiredRule />
          <Lookup dataSource={countries} valueExpr="id" displayExpr="country" />
        </Column>
        <Column dataField="city" caption="City">
          <Lookup dataSource={cities} valueExpr="id" displayExpr="city" />
        </Column>
        <Column dataField="password" caption="Password">
          <RequiredRule />
        </Column>
        <Column dataField="password" caption="Confirm Password" visible={false}>
          <RequiredRule />
        </Column>
				<Column width="80" dataField="logo" caption="Logo" cellRender={logo} editCellRender={uploader} /> {/* TODO: make uploader work */}
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50, 100]} showInfo={true} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
      <Typography className="text-16 mt-16 ml-16 pb-16" color="textSecondary"><b>Note: </b>Accepted image file formats are: <u>png</u>, <u>jpg</u>, <u>jpeg</u> and <u>webp</u> with file size not bigger then <u>150KB</u>.</Typography>
    </Paper>
  );
}
