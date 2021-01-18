import React from 'react';
import DataGrid, { RemoteOperations, Paging, Pager, Column } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import Paper from '@material-ui/core/Paper';
import * as base from 'app/env';

const api = base.api;

const statsDataSource = createStore({
  key: 'id',
  loadUrl: api + 'booths/get'
});

export default function StatsTable() {
  const university = (data) => {
    const uniId = data.value;

    // eslint-disable-next-line
    fetch(api + 'universities/get').then(res => res.json()).then(results => { results.map(row => {
      const universityId = row.universityId;

      for (var i = 0; i < results.length; i++) {
        if (universityId === uniId) {
          return row.name;
        }
      }
    })});
  };

  const fair = (data) => {
    const fId = data.value;

    // eslint-disable-next-line
    fetch(api + 'fairs/get').then(res => res.json()).then(results => { results.map(row => {
      const fairId = row.id;

      for (var i = 0; i < results.length; i++) {
        if (fairId === fId) {
          return row.name;
        }
      }
    })});
  };

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
				<Column dataField="fairId" caption="Fair" cellRender={fair} />
				<Column dataField="universityId" caption="University" cellRender={university} />
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
