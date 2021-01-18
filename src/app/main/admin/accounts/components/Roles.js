import React from 'react';
import DataGrid, { RemoteOperations, Sorting, Paging, Pager, Editing, GroupPanel, StateStoring, Export, Column, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Paper } from '@material-ui/core';
// import * as base from 'app/env';

// const api = base.api;

export default function Roles() {
  // const rolesData = createStore({
  //   key: 'id',
  //   loadUrl: api + 'roles/get',
  //   insertUrl: api + 'roles/insert',
  //   updateUrl: api + 'roles/update',
  //   deleteUrl: api + 'roles/delete'
  // });

const roles = [
	{
		id: 1,
		role: 'admin',
		description: 'System Administrator'
	},
	{
		id: 2,
		role: 'user',
		description: 'Common User'
	}
];

  return (
    <Paper className="w-full">
      <DataGrid dataSource={roles} showBorders={true} columnAutoWidth={true}>
				<RemoteOperations />
				<Sorting mode="multiple" />
				<Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={false} />  {/* TODO: enable adding on stage 2 */}
				<StateStoring enabled={true} type="localStorage" storageKey="roles_table" />
				<Export enabled={true} fileName="Uniranks-Roles" allowExportSelectedData={true} />
				<GroupPanel visible={true} />
        {/*<Column dataField="id" caption="ID" /> TODO: check if this is necessary */}
        <Column dataField="role" caption="Role">
					<RequiredRule />
				</Column>
				<Column dataField="description" caption="Description" />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={20} />
      </DataGrid>
    </Paper>
  );
}
