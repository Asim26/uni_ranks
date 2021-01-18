import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function Continents() {
  const continents = createStore({
    key: 'id',
    loadUrl: api + 'continents/get',
    insertUrl: api + 'continents/insert',
    updateUrl: api + 'continents/update',
    deleteUrl: api + 'continents/delete'
  });

  return (
    <Paper className="w-full">
      <DataGrid dataSource={continents} showBorders={true} rowAlternationEnabled={true} columnAutoWidth={true} allowColumnReordering={true}>
				<RemoteOperations />
				<SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="continents_table" />
				<Export enabled={true} fileName="Uniranks-Continents" allowExportSelectedData={true} />
        <Selection mode="multiple" />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
				<Column dataField="code" caption="Code">
          <RequiredRule />
        </Column>
				<Column dataField="name" caption="Name">
          <RequiredRule />
        </Column>
				<Column dataField="map" caption="Map" />
		    <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50, 100]} showInfo={true} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
