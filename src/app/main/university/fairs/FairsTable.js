import React from "react";
import DataGrid, { RemoteOperations, Paging, Pager, StateStoring, Column } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import jwtService from 'app/services/jwtService';
import * as base from 'app/env';
import clsx from 'clsx';

const api = base.api;

const fairsDataSource = createStore({
  key: 'id',
  loadUrl: api + 'fairs/get'
});

const useStyles = makeStyles({
	button: {
    width: '100% !important',
		background: '#039be5',
		color: '#fff',
		'&:hover': {
			background: '#039be5',
			color: '#fff'
		}
	}
});

export default function FairsTable() {
  const universityId = jwtService.getUserId();

  const classes = useStyles();

  const handleFollow = (e, fairId) => {
    fetch(api + 'fairs/updateFollow', { method: 'POST', body: '{"fairId": "' + fairId + '", "universityId": "' + universityId + '"}', headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        document.getElementById("followBtn_" + fairId).disabled = "disabled";
        document.getElementById("followBtn_" + fairId).className += " Mui-disabled";
        document.getElementById("rejectBtn_" + fairId).disabled = "disabled";
        document.getElementById("rejectBtn_" + fairId).className += " Mui-disabled";
      });
  };

  const handleReject = (e, fairId) => {
    fetch(api + 'fairs/updateReject', { method: 'POST', body: '{"fairId": "' + fairId + '", "universityId": "' + universityId + '"}', headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        document.getElementById("rejectBtn_" + fairId).disabled = "disabled";
        document.getElementById("rejectBtn_" + fairId).className += " Mui-disabled";
        document.getElementById("followBtn_" + fairId).disabled = "disabled";
        document.getElementById("followBtn_" + fairId).className += " Mui-disabled";
      });
  };

  const statusColumn = (data) => {
    // eslint-disable-next-line
    fetch(api + 'fairs/status/get?fairId=' + data.key + '&universityId=' + universityId).then(res => res.json()).then(results => { results.map(row => {
      if (row.inviteStatus === 1) {
        return (<span>No action taken.</span>);
      } else if (row.inviteStatus === 2) {
        return (<span>Awaiting response on follow.</span>);
      } else if (row.inviteStatus === 3) {
        return (<span>Approved by administrator.</span>);
      } else if (row.inviteStatus === 4) {
        return (<span>Rejected.</span>);
      }
    })});
  };

  const status = (element) => {
    const start = element.data.start;
    const end = element.data.end;
    const currentDate = new Date();

    if (currentDate < start) {
      return 'Future';
    } else if (currentDate > end) {
      return 'Past';
    } else {
      return 'Active';
    }
  };

  const followButton = (cellInfo) => {
    switch (cellInfo.data.data.status) {
      case 'Past':
        return (
          <Button type="button" variant="contained" disabled className={clsx(classes.button, 'normal-case')}>Follow</Button>
        );
      case 'Active':
        return (
          <Button type="button" variant="contained" disabled className={clsx(classes.button, 'normal-case')}>Follow</Button>
        );
      default:
        break;
    }

    return (
      <Button type="button" id={"followBtn_" + cellInfo.data.data.id} variant="contained" className={clsx(classes.button, 'normal-case')} onClick={(e) => handleFollow(e, cellInfo.data.data.id)}>Follow</Button>
    );
  };

  const rejectButton = (cellInfo) => {
    switch (cellInfo.data.data.status) {
      case 'Past':
        return (
          <Button type="button" variant="contained" disabled className={clsx(classes.button, 'normal-case')}>Reject</Button>
        );
      case 'Active':
        return (
          <Button type="button" variant="contained" disabled className={clsx(classes.button, 'normal-case')}>Reject</Button>
        );
      default:
        break;
    }

    return (
      <Button type="button" id={"rejectBtn_" + cellInfo.data.data.id} variant="contained" className={clsx(classes.button, 'normal-case')} onClick={(e) => handleReject(e, cellInfo.data.data.id)}>Reject</Button>
    );
  };

  return (
    <Paper className="w-full">
      <DataGrid
        dataSource={fairsDataSource}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
      >
				<RemoteOperations />
				<StateStoring enabled={true} type="localStorage" storageKey="fairsTable" />
				<Column dataField="name" dataType="string" caption="Fair Name" />
				<Column dataField="start" dataType="datetime" caption="Start Time" />
				<Column dataField="end" dataType="datetime" caption="End Time" />
				<Column dataField="g12" dataType="number" caption="Number of G12 Students" />
				<Column dataField="g11" dataType="number" caption="Number of G11 Students" />
				<Column dataField="max" dataType="number" caption="Max # of Universities" />
        <Column dataField="school" caption="School (vFair host)" />
        <Column dataField="status" caption="Status" cellRender={status} />
        <Column cellRender={statusColumn} caption="Participation State" />
        <Column cellComponent={followButton} />
        <Column cellComponent={rejectButton} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20, 50]} showInfo={false} />
        <Paging enabled={true} defaultPageSize={5} />
      </DataGrid>
    </Paper>
  );
}
