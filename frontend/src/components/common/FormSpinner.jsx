import { ProgressSpinner } from "primereact/progressspinner"

const FormSpinner = ({ lock, text, className, spinner }) => {
    return (
        <div className={`w-[100px] flex items-center gap-2 ${lock ? 'cursor-not-allowed' : ''}`}
            onClick={lock ? (e) => e.preventDefault() : undefined}
        >
            {
                spinner &&
                <ProgressSpinner className="form-spinner" style={{ width: '30px', height: '30px' }} strokeWidth="7" />
            }
            <p className={className}>{text}</p>
        </div>
    )
}
export default FormSpinner