import React from 'react';
import DataGrid, { RemoteOperations, Editing, Lookup, StateStoring, Column } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import Paper from '@material-ui/core/Paper';
import jwtService from 'app/services/jwtService';
import qs from 'qs';
import 'whatwg-fetch';
import ChipsComponent from './ChipsComponent';
import * as base from 'app/env';
// eslint-disable-next-line
import { string } from 'prop-types';

const api = base.api;

const id = jwtService.getUserId();

const programsSource = createStore({
  key: 'id',
  loadUrl: api + 'booth/programs/get'
});

const dataSource = new CustomStore({
  key: 'id',
  load: async () => {
    var programs = [];
    await fetch(api + 'booth/programs/get')
      .then(res => res.json())
      .then(res => {
        programs = [];
        // eslint-disable-next-line
        res.map(program => {
          programs.push({
            id: program.id,
            spec_name: program.spec_name
          });
        });
      });
    return await fetch(api + 'programs/get?id=' + id)
      .then(res => res.json())
      .then(res => {
        const phd = res[0].phd ? res[0].phd.replace(/(["])+/g, '') : '';
        const master = res[0].master ? res[0].master.replace(/(["])+/g, '') : '';
        const bach = res[0].bach ? res[0].bach.replace(/(["])+/g, '') : '';
        const courses = res[0].courses ? res[0].courses.replace(/(["])+/g, '') : '';
        const result = {
          id: res[0].id,
          phd: phd ? phd.substring(1,phd.length-1).split(',').map( Number ) : '',
          master: master ? master.substring(1,master.length-1).split(',').map( Number ) : '',
          bach: bach ? bach.substring(1,bach.length-1).split(',').map( Number ) : '',
          courses: courses ? courses.substring(1,courses.length-1).split(',').map( Number ) : '',
        }
        return result;
      });
  },
  update: (key, values) => {
    return fetch(api + 'programs/update?id=' + id, {
      method: 'PUT',
      body: qs.stringify({ "values": JSON.stringify(values) }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(res => res);
  }
});

const chipsCellComponent = (element) => {
  return <ChipsComponent data={element} />
};

export default function ProgramsTable() {
  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
				<RemoteOperations />
				<Editing mode="row"	allowUpdating={true} allowDeleting={false} allowAdding={false} />
				<StateStoring enabled={true} type="localStorage" storageKey="programsTable" />
				<Column dataField="phd" caption="PhD" allowSorting={false} cellRender={chipsCellComponent} editCellComponent={ChipsComponent}>
          <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name"/>
        </Column>
				<Column dataField="master" caption="Master" allowSorting={false} cellRender={chipsCellComponent} editCellComponent={ChipsComponent}>
          <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name" />
        </Column>
				<Column dataField="bach" caption="Bachelor" allowSorting={false} cellRender={chipsCellComponent} editCellComponent={ChipsComponent}>
          <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name" />
        </Column>
				{/* <Column dataField="courses" caption="Courses" allowSorting={false} cellComponent={chipsCellComponent} editCellComponent={ChipsComponent}> */}
        <Column dataField="courses" caption="Courses" allowSorting={false} cellRender={chipsCellComponent} editCellComponent={ChipsComponent}>
          <Lookup dataSource={programsSource} valueExpr="spec_name" displayExpr="spec_name" />
        </Column>
      </DataGrid>
    </Paper>
  );
}
