import HandQuestIcon from "../../assets/icons/HandQuestIcon"
import ProgressBarQuests from "./ProgressBarQuests"

const AchievementItem = ({ numerator, denominator, score }) => {
    return (
        <div className="h-[80px] mx-auto px-5 flex items-center justify-center gap-5 border-t border-t-gray-400">
            <div>
                <HandQuestIcon />
            </div>

            <div className="w-full">
                <div className="flex justify-between">
                    <p>Ganá 2 apuestas</p>
                    <span className="text-tertiary">{score} puntos</span>
                </div>
                <ProgressBarQuests numerator={numerator} denominator={denominator} />
            </div>
        </div>
    )
}
export default AchievementItem