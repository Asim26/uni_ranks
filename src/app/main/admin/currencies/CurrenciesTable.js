import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, GroupPanel, StateStoring, Export, Column, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function CurrenciesTable() {
  const currencies = createStore({
    key: 'id',
    loadUrl: api + 'currencies/get',
    insertUrl: api + 'currencies/insert',
    updateUrl: api + 'currencies/update',
    deleteUrl: api + 'currencies/delete'
  });

  return (
    <Paper className="w-full">
      <DataGrid dataSource={currencies} showBorders={true} columnAutoWidth={true}>
				<RemoteOperations />
        <SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={false} />
				<StateStoring enabled={true} type="localStorage" storageKey="currencies_table" />
				<Export enabled={true} fileName="Uniranks-Currencies" allowExportSelectedData={true} />
				<GroupPanel visible={false} />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
        <Column dataField="currency" caption="Currency">
					<RequiredRule />
				</Column>
				<Column dataField="description" caption="Description" />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
