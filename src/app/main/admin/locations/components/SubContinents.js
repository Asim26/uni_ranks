import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Selection, Column, Lookup, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function SubContinents() {
  const subcontinents = createStore({
    key: 'id',
    loadUrl: api + 'subcontinents/get',
    insertUrl: api + 'subcontinents/insert',
    updateUrl: api + 'subcontinents/update',
    deleteUrl: api + 'subcontinents/delete'
  });

  const continents = createStore({
    key: 'id',
    loadUrl: api + 'continents/get'
  });

  return (
    <Paper className="w-full">
      <DataGrid dataSource={subcontinents} showBorders={true} rowAlternationEnabled={true} columnAutoWidth={true} allowColumnReordering={true}>
				<RemoteOperations />
				<SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="subcontinents_table" />
        <Selection mode="multiple" />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
        <Column dataField="continent_id" caption="Continent ID">
          <Lookup dataSource={continents} valueExpr="id" displayExpr="continent_name" />
          <RequiredRule />
        </Column>
        <Column dataField="name" caption="Sub-Continent Name">
          <RequiredRule />
        </Column>
        <Column dataField="map" caption="Map" />
		    <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50, 100]} showInfo={true} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
