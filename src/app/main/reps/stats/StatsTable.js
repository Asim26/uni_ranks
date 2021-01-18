import React from 'react';
import DataGrid, { RemoteOperations, Paging, Pager, Column } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import Paper from '@material-ui/core/Paper';
import jwtService from 'app/services/jwtService';
import * as base from 'app/env';

const api = base.api;

const id = jwtService.getUserId();

const statsDataSource = createStore({
  key: 'id',
  loadUrl: api + 'booth/get?id=' + id
});

export default function StatsTable() {
  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={statsDataSource}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
        <RemoteOperations />
				<Column dataField="visits" dataType="number" caption="Visits" />
				<Column dataField="chats" dataType="number" caption="Chats" />
				{/*<Column dataField="calls" dataType="number" caption="Calls" />*/}
				<Column dataField="videos" dataType="number" caption="Video Calls" />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={5} />
      </DataGrid>
    </Paper>
  );
}
