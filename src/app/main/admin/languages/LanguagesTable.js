import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, GroupPanel, StateStoring, Export, Column, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function LanguagesTable() {
  const languages = createStore({
    key: 'id',
    loadUrl: api + 'languages/get',
    insertUrl: api + 'languages/insert',
    updateUrl: api + 'languages/update',
    deleteUrl: api + 'languages/delete'
  });

  return (
    <Paper className="w-full">
      <DataGrid dataSource={languages} showBorders={true} columnAutoWidth={true}>
				<RemoteOperations />
        <SearchPanel visible={true} width={200} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={false} />  {/* TODO: enable adding on stage 2 */}
				<StateStoring enabled={true} type="localStorage" storageKey="languages_table" />
				<Export enabled={true} fileName="Uniranks-Languages" allowExportSelectedData={true} />
				<GroupPanel visible={false} />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
        <Column dataField="name" caption="Language">
					<RequiredRule />
				</Column>
        <Column dataField="full_name" caption="Full Name" />
        <Column dataField="flag" caption="Flag">
					<RequiredRule />
				</Column>
				<Column dataField="description" caption="Description" />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
