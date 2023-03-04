import {GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector} from '@mui/x-data-grid';
import AddTransaction from "../transaction/AddTransaction";
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <AddTransaction />
        </GridToolbarContainer>
    );
}

export default CustomToolbar