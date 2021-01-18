import React, { Component } from 'react';
import DataGrid, { RemoteOperations, SearchPanel, Selection, Sorting, StateStoring, Export, Lookup, Column } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import jwtService from 'app/services/jwtService';
import Paper from '@material-ui/core/Paper';
import * as base from 'app/env';

const api = base.api;

const id = jwtService.getUserId();

const dataSource = new CustomStore({
  key: 'id',
  load: () => {
    return fetch(api + 'applicants/get?id=' + id)
      .then(res => res.json())
      .then(res => {
        return res.map(result => {
          return {
            id: result.id,
            name: result.name,
            age: result.age,
            grade: result.grade,
            email: result.email,
            phd: result.phd ? result.phd.replace(/([","])+/g, '') : '',
            master: result.master ? result.master.replace(/([","])+/g, '') : '',
            bach: result.bach ? result.bach.replace(/([","])+/g, '') : '',
            courses: result.courses ? result.courses.replace(/([","])+/g, '') : '',
          }
        })
      })
  }
});

const programsSource = createStore({
  key: 'id',
  loadUrl: api + 'booth/programs/get'
});

export default class LinksTable extends Component {
	constructor(props) {
		super(props);
    this.dataGrid = null;
  }

  render() {
    return (
      <Paper className="w-full">
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          ref={(ref) => this.dataGrid = ref}
          rowAlternationEnabled={true}
          columnAutoWidth={true}
        >
  				<RemoteOperations />
  				<Sorting mode="multiple" />
          <SearchPanel visible={true} width={240} placeholder="Search..." />
          <Selection mode="multiple" />
  				<StateStoring enabled={true} type="localStorage" storageKey="applicantsTable" />
          <Export enabled={true} fileName="Applicants" allowExportSelectedData={true} />
          <Column dataField="name" caption="Name" />
          {/* <Column dataField="phone" caption="Phone" /> */}
          <Column dataField="age" caption="Age" />
          <Column dataField="grade" caption="Grade" />
          <Column dataField="email" caption="Email" />
          <Column dataField="phd" caption="PhD">
            <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name" />
          </Column>
          <Column dataField="master" caption="Master">
            <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name" />
          </Column>
          <Column dataField="bach" caption="Bachelor">
            <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name" />
          </Column>
          <Column dataField="courses" caption="Courses">
            <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name" />
          </Column>
        </DataGrid>
      </Paper>
    );
  }
}
