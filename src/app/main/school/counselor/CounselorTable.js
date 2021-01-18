import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, Lookup, RequiredRule, EmailRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import jwtService from 'app/services/jwtService';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const id = jwtService.getUserId();

const api = base.api;

export default function CounselorTable() {
  const counselorsData = createStore({
    key: 'id',
    loadUrl: api + 'counselors/getSchoolCounselors?id=' + id,
    insertUrl: api + 'counselors/insertSchoolCounselors?id=' + id,
    updateUrl: api + 'counselors/update',
    deleteUrl: api + 'counselors/delete'
  });

  const genderDataSource = [
    { id: 1, gender: 'Male' },
    { id: 2, gender: 'Female' }
  ];

  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={counselorsData}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
				<RemoteOperations />
				<SearchPanel visible={true} width={240} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="form" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="counselorsTable" />
				<Export enabled={true} fileName="Counselors" allowExportSelectedData={true} />
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
