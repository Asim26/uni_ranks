import React, { Component } from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Paging, Pager, Export, Selection, Column } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import Paper from '@material-ui/core/Paper';
import * as base from 'app/env';

const api = base.api;

const schoolsDataSource = createStore({
  key: 'id',
  loadUrl: api + 'schools/get'
});

export default class SchoolsTable extends Component {
	constructor(props) {
		super(props);
    this.dataGrid = null;
  }

  render() {
    return (
      <Paper className="w-full">
        <DataGrid
          dataSource={schoolsDataSource}
          showBorders={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          ref={(ref) => this.dataGrid = ref}
          rowAlternationEnabled={true}
          columnAutoWidth={true}
        >
  				<RemoteOperations />
  				<SearchPanel visible={true} width={240} placeholder="Search..." />
  				<Export enabled={true} fileName="Schools" allowExportSelectedData={true} />
          <Selection mode="multiple" />
          <Column dataField="logo" caption="Photo" width={100} allowSorting={false} cellRender={customCell} />
  				<Column dataField="name" caption="Name" />
          <Column dataField="email" caption="Email" />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
          <Paging enabled={true} defaultPageSize={5} />
        </DataGrid>
      </Paper>
    );
  }
}

const customCell = (data) => {
  const src = data.value;
  if (src === undefined) {
    return <img src='assets/images/avatars/profile.jpg' alt="School" />;
  }
  return <img src={src} alt="School" />;
};
