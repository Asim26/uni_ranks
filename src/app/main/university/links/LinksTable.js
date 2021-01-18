import React, { Component } from 'react';
import DataGrid, { RemoteOperations, Sorting, Editing, StateStoring, Column, RequiredRule } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Typography, Paper } from '@material-ui/core';
import jwtService from 'app/services/jwtService';
import * as base from 'app/env';

const api = base.api;

const id = jwtService.getUserId();

const menuDataSource = createStore({
  key: 'id',
  loadUrl: api + 'menu/get?id=' + id,
  insertUrl: api + 'menu/insert?id=' + id,
  updateUrl: api + 'menu/update',
  deleteUrl: api + 'menu/delete'
});

class LinksTable extends Component {
	constructor(props) {
		super(props);
    this.dataGrid = null;
  }

  render() {
    return (
      <Paper className="w-full">
        <DataGrid
          dataSource={menuDataSource}
          showBorders={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          ref={(ref) => this.dataGrid = ref}
          rowAlternationEnabled={true}
          columnAutoWidth={true}
        >
  				<RemoteOperations />
  				<Sorting mode="multiple" />
  				<Editing mode="row"	allowUpdating={true} allowDeleting={true} allowAdding={true} />
  				<StateStoring enabled={true} type="localStorage" storageKey="menuTable" />
  				<Column dataField="title" caption="Title">
            <RequiredRule />
          </Column>
          <Column dataField="url" caption="Link">
            <RequiredRule />
          </Column>
        </DataGrid>
        <Typography className="text-16 mt-16 ml-16 pb-16" color="textSecondary"><b>Note: </b>Please add links in format like: <u>google.com</u> and not <u>http://google.com</u>.</Typography>
      </Paper>
    );
  }
}

export default LinksTable;
