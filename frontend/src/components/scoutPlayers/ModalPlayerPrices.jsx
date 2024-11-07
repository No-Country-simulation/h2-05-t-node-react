import { Dialog } from "primereact/dialog";
import SearchBar from "../common/SearchBar";
import CardPlayerPrice from "./CardPlayerPrice";
import FilterOptionsSP from './FilterOptionsSP';

const ModalPlayerPrices = ({ visible, setVisible }) => {

    return (
        <div className="card flex justify-center">
            <Dialog
                visible={visible}
                onHide={() => { if (!visible) return; setVisible(false); }}
                position="bottom"
                className="w-[50vw] min-h-[90vh] !important custom-prices-dialog"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                dismissableMask>

                <SearchBar autoFocus={true} placeholder={'Buscar'} />

                <p className="my-3 text-tertiary">Visto recientemente</p>

                <CardPlayerPrice />
                <CardPlayerPrice />

                <div className="flex justify-between items-center mb-3">
                    <p className="text-tertiary">Todos</p>
                    <FilterOptionsSP price={true} />
                </div>

                <CardPlayerPrice />
                <CardPlayerPrice />
                <CardPlayerPrice />
                <CardPlayerPrice />
            </Dialog>
        </div>
    )
}
export default ModalPlayerPrices