import React from 'react';
import DataGrid, { RemoteOperations, Paging, Pager, StateStoring, Column } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as base from 'app/env';
import clsx from 'clsx';

const api = base.api;

const fairsDataSource = createStore({
  key: 'id',
  loadUrl: api + 'invitations/get'
});

const useStyles = makeStyles({
	button: {
		background: '#039be5',
		color: '#fff',
		'&:hover': {
			background: '#039be5',
			color: '#fff'
		}
	}
});

export default function JoinsTable() {
  const classes = useStyles();

  const handleApprove = (e, fairId, universityId) => {
    fetch(api + 'fairs/updateApprove', { method: 'PUT', body: '{"fairId": "' + fairId + '", "universityId": "' + universityId + '"}', headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        document.getElementById("approveBtn_" + fairId).disabled = "disabled";
        document.getElementById("approveBtn_" + fairId).className += " Mui-disabled";
        document.getElementById("rejectBtn_" + fairId).disabled = "disabled";
        document.getElementById("rejectBtn_" + fairId).className += " Mui-disabled";
      });
  };

  const handleReject = (e, fairId, universityId) => {
    fetch(api + 'fairs/adminReject', { method: 'PUT', body: '{"fairId": "' + fairId + '", "universityId": "' + universityId + '"}', headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        document.getElementById("rejectBtn_" + fairId).disabled = "disabled";
        document.getElementById("rejectBtn_" + fairId).className += " Mui-disabled";
        document.getElementById("approveBtn_" + fairId).disabled = "disabled";
        document.getElementById("approveBtn_" + fairId).className += " Mui-disabled";
      });
  };

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

  const approveButton = (cellInfo) => {
    return (
      <Button type="button" id={"approveBtn_" + cellInfo.data.data.id} variant="contained" className={clsx(classes.button, 'normal-case')} onClick={(e) => handleApprove(e, cellInfo.data.data.fairId, cellInfo.data.data.universityId)}>Approve</Button>
    );
  };

  const rejectButton = (cellInfo) => {
    return (
      <Button type="button" id={"rejectBtn_" + cellInfo.data.data.id} variant="contained" className={clsx(classes.button, 'normal-case')} onClick={(e) => handleReject(e, cellInfo.data.data.fairId, cellInfo.data.data.universityId)}>Reject</Button>
    );
  };

  const status = (data) => {
    const process = data.value;

    if (process === 1) {
      return (<span>No action taken.</span>);
    } else if (process === 2) {
      return (<span>Participation requested.</span>);
    } else if (process === 3) {
      return (<span>Approved.</span>);
    } else if (process === 4) {
      return (<span>Rejected.</span>);
    }
  };

  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={fairsDataSource}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={false}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
        <RemoteOperations />
				<StateStoring enabled={true} type="localStorage" storageKey="JoinsTable" />
        <Column dataField="fairId" dataType="string" caption="Requested Fair Name" cellRender={fair} />
				<Column dataField="universityId" caption="University Name" cellRender={university} />
        <Column dataField="inviteStatus" caption="Status" cellRender={status} />
        <Column cellComponent={approveButton} />
        <Column cellComponent={rejectButton} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={5} />
      </DataGrid>
    </Paper>
  );
}
