import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, Lookup, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function Degrees() {
  const degrees = createStore({
    key: 'id',
    loadUrl: api + 'degrees/get',
    insertUrl: api + 'degrees/insert',
    updateUrl: api + 'degrees/update',
    deleteUrl: api + 'degrees/delete'
  });

  return (
    <Paper className="w-full">
      <DataGrid dataSource={degrees} showBorders={true} rowAlternationEnabled={true} columnAutoWidth={true} allowColumnReordering={true}>
				<RemoteOperations />
				<SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="degrees_table" />
				<Export enabled={true} fileName="Uniranks-Degrees" allowExportSelectedData={true} />
        <Selection mode="multiple" />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
				<Column dataField="first_name" caption="First name">
          <RequiredRule />
        </Column>
		    <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50, 100]} showInfo={true} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
