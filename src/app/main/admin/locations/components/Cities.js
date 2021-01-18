import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, Lookup, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function Cities() {
  const cities = createStore({
    key: 'id',
    loadUrl: api + 'cities/get',
    insertUrl: api + 'cities/insert',
    updateUrl: api + 'cities/update',
    deleteUrl: api + 'cities/delete'
  });

  const countries = createStore({
    key: 'id',
    loadUrl: api + 'countries/get'
  });

  const regions = createStore({
    key: 'id',
    loadUrl: api + 'regions/get'
  });

  return (
    <Paper className="w-full">
      <DataGrid dataSource={cities} showBorders={true} rowAlternationEnabled={true} columnAutoWidth={true} allowColumnReordering={true}>
				<RemoteOperations />
				<SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="cities_table" />
				<Export enabled={true} fileName="Uniranks-Cities" allowExportSelectedData={true} />
        <Selection mode="multiple" />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
				<Column dataField="country_id" caption="Country">
          <Lookup dataSource={countries} valueExpr="id" displayExpr="country_name" />
          <RequiredRule />
        </Column>
				<Column dataField="name" caption="Name">
          <RequiredRule />
        </Column>
				<Column dataField="local_name" caption="Local Name" />
        <Column dataField="administrative_region_id" caption="Administrative Region">
          <Lookup dataSource={regions} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="latitude" caption="Latitude" />
        <Column dataField="longitude" caption="Longitude" />
	      <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50, 100]} showInfo={true} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
