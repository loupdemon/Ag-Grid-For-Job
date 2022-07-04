import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
//drawing table
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; // Optional theme CSS

import 'ag-grid-enterprise';

const App = () => {

 const gridRef = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'make'},
   {field: 'model'},
   {field: 'price', editable: true}
   
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
  sortable:true, 
  filter: true,
   }));  
   
   const paginationNumberFormatter = useCallback((params) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);


  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
    }, []); // Optional - for exporting data as CSV file  ))


 // Example of consuming Grid Event, change in Row Data (mvt mouse cursor)
 const cellClickedListener = useCallback( event => {
   console.log('cellClicked', event);
 }, []);

 // Example load data from sever
 useEffect(() => {
   fetch('https://www.ag-grid.com/example-assets/row-data.json')
   .then(result => result.json())
   .then(rowData => setRowData(rowData))
 }, []);

 // Example using Grid's API
 const buttonListener = useCallback( e => {
   gridRef.current.api.deselectAll();
 }, []);

 return (
   <div>

     {/* Example using Grid's API */}
     <button onClick={buttonListener} style={{paginationBottom : '5px', fontWeight: 'bold'}}>Push Me</button>
     <button onClick={onBtExport} style={{paginationBottom : '5px', fontWeight: 'bold'}}>Export</button>

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine-dark" style={{width: '80%', height: 500}}>

       <AgGridReact
           ref={gridRef} // Ref for accessing Grid's API "gridApi: data selected can be pushed"

           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           robSelection='multiple' // Optional - enables multiple row selection

           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event

           pagination={true} // Optional - Pagination
           paginationPageSize={10} // Optional - Pagination Page Size
           paginationNumberFormatter={paginationNumberFormatter} // Optional - Pagination Number Formatter

           />
     </div>
   </div>
 );
};

export default App;