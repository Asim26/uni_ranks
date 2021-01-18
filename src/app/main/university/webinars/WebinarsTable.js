import React from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Sorting, Paging, Pager, Editing, StateStoring, Export, Selection, Column, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import * as base from 'app/env';

const api = base.api;

export default function WebinarsTable() {
  const user = useSelector(({ auth }) => auth.user);
  const id = user.displayName;

  const webinarsData = createStore({
    key: 'id',
    loadUrl: api + 'webinars/getHost?id=' + id,
    insertUrl: api + 'webinars/insertHost?id=' + id,
    updateUrl: api + 'webinars/updateHost?id=' + id,
    deleteUrl: api + 'webinars/delete'
  });

  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={webinarsData}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
				<RemoteOperations />
				<SearchPanel visible={true} width={240} placeholder="Search..." />
				<Sorting mode="multiple" />
				<Editing mode="row" allowUpdating={true} allowDeleting={true} allowAdding={true} />
				<StateStoring enabled={true} type="localStorage" storageKey="webinarsTable" />
				<Export enabled={true} fileName="WebinarsTable" allowExportSelectedData={true} />
        <Selection mode="multiple" />
				<Column dataField="webinarName" caption="Name">
          <RequiredRule />
        </Column>
        <Column dataField="start" dataType="datetime" caption="Start Time">
          <RequiredRule />
        </Column>
        <Column dataField="topic" caption="Topic">
          <RequiredRule />
        </Column>
        <Column dataField="link" caption="Webinar Link">
          <RequiredRule />
        </Column>
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={5} />
      </DataGrid>
    </Paper>
  );
}
