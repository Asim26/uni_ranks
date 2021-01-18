import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, GroupPanel, Column, RequiredRule, Lookup } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import Paper from '@material-ui/core/Paper';
import * as base from 'app/env';

const api = base.api;

const fairsDataSource = createStore({
  key: 'id',
  loadUrl: api + 'fairs/get',
  insertUrl: api + 'fairs/insert',
  updateUrl: api + 'fairs/update',
  deleteUrl: api + 'fairs/delete'
});

const schoolDataSource = createStore({
  key: 'id',
  loadUrl: api + 'schools/get'
});

export default function FairsTable() {
  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={fairsDataSource}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
				<RemoteOperations />
				<SearchPanel visible={true} width={240} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="form"	allowUpdating={true} allowDeleting={false} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="fairsTable" />
				<Export enabled={true} fileName="Virtual Fairs" allowExportSelectedData={true} />
        <Selection mode="multiple" />
				<GroupPanel visible={true} />
				<Column dataField="name" caption="Name">
          <RequiredRule />
        </Column>
				<Column dataField="start" dataType="datetime" caption="Start Time">
          <RequiredRule />
        </Column>
				<Column dataField="end" dataType="datetime" caption="End Time">
          <RequiredRule />
        </Column>
				<Column dataField="g12" dataType="number" caption="Number of G12 Students" visible={false}>
          <RequiredRule />
        </Column>
				<Column dataField="g11" dataType="number" caption="Number of G11 Students" visible={false}>
          <RequiredRule />
        </Column>
				<Column dataField="max" dataType="number" caption="Max # of Universities">
          <RequiredRule />
        </Column>
        <Column dataField="school" caption="School">
          <Lookup dataSource={schoolDataSource} valueExpr="id" displayExpr="name" />
          <RequiredRule />
        </Column>
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={5} />
      </DataGrid>
    </Paper>
  );
}
