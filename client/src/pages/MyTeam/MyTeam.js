import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '../../components/Table/Table';



const MyTeam = () => {
    const { managedTeams } = useSelector(state => state.user)

    return (
        <div>
            <h1 className='text-bold text-xl'>Managed Teams</h1>
            <Table tableData={managedTeams && managedTeams.length > 0 ? managedTeams : []} handlePlayerClick={null} />
        </div>
    );
}

export default MyTeam;
