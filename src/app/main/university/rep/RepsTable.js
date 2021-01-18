import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, Lookup, RequiredRule, EmailRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import jwtService from 'app/services/jwtService';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const id = jwtService.getUserId();

const api = base.api;

export default function RepsTable() {
  const representativesData = createStore({
    key: 'id',
    loadUrl: api + 'representatives/getUniReps?id=' + id,
    insertUrl: api + 'representatives/insertUniReps?id=' + id,
    updateUrl: api + 'representatives/update',
    deleteUrl: api + 'representatives/delete'
  });

  const genderDataSource = [
    { id: 1, gender: 'Male' },
    { id: 2, gender: 'Female' }
  ];

  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={representativesData}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
				<RemoteOperations />
				<SearchPanel visible={true} width={240} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="form" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="representativesTable" />
				<Export enabled={true} fileName="Representatives" allowExportSelectedData={true} />
        <Selection mode="multiple" />
				<Column dataField="name" caption="Name">
          <RequiredRule />
        </Column>
				<Column dataField="title" caption="Title" visible={false} />
        <Column dataField="email" caption="Email">
          <RequiredRule />
          <EmailRule />
        </Column>
        <Column dataField="phone" caption="Phone" visible={false} />
        <Column dataField="address" caption="Address" visible={false} />
        <Column dataField="gender" caption="Gender" visible={false}>
          <Lookup dataSource={genderDataSource} valueExpr="id" displayExpr="gender" />
        </Column>
        <Column dataField="age" datatype="number" caption="Age" visible={false} />
        <Column dataField="password" caption="Password" visible={false}>
          <RequiredRule />
        </Column>
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={5} />
      </DataGrid>
    </Paper>
  );
}
