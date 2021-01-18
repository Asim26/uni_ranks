import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function WorkshopsTable() {
  const user = useSelector(({ auth }) => auth.user);
  const id = user.displayName;

  const workshopsData = createStore({
    key: 'id',
    loadUrl: api + 'workshops/getHost?id=' + id,
    insertUrl: api + 'workshops/insertHost?id=' + id,
    updateUrl: api + 'workshops/updateHost?id=' + id,
    deleteUrl: api + 'workshops/delete'
  });

  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={workshopsData}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
				<RemoteOperations />
				<SearchPanel visible={true} width={240} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="row" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="workshopsTable" />
				<Export enabled={true} fileName="WorkshopsTable" allowExportSelectedData={true} />
        <Selection mode="multiple" />
				<Column dataField="workshopName" caption="Name">
          <RequiredRule />
        </Column>
        <Column dataField="start" dataType="datetime" caption="Start Time">
          <RequiredRule />
        </Column>
        <Column dataField="topic" caption="Topic">
          <RequiredRule />
        </Column>
        <Column dataField="link" caption="Workshop Link">
          <RequiredRule />
        </Column>
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={5} />
      </DataGrid>
    </Paper>
  );
}
