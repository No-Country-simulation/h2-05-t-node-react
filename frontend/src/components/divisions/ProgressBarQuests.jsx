import { ProgressBar } from "primereact/progressbar";

const ProgressBarQuests = ({ numerator, denominator }) => {
    const progressValue = (numerator / denominator) * 100

    const valueTemplate = () => {
        return (
            <>
                {numerator}/<b>{denominator}</b>
            </>
        )
    }

    return (
        <div className="card">
            <ProgressBar
                value={progressValue}
                displayValueTemplate={valueTemplate}
                className="h-[15px] text-[10px] font-regular custom-progress-bar-logros">
            </ProgressBar>
        </div>
    );
}
export default ProgressBarQuests