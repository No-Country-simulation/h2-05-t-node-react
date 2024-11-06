import { useNavigate } from 'react-router-dom'
import AlertTickIcon from '../../assets/icons/AlertTickIcon'

const AlertMessage = ({ children, showAlert, setShowAlert, redirect }) => {
    const navigate = useNavigate()

    const closeModal = () => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false)
                redirect && navigate('/me/predictions')
            }, 1500)
        }
    }

    if (showAlert) {
        closeModal()
    }

    return (
        <div className=" flex items-center justify-center">
            {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="w-[292px] h-[175px] bg-white p-6 rounded-lg border border-gray-300 shadow-lg ">
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="mx-auto mt-2">
                                <AlertTickIcon />
                            </button>
                        </div>
                        <h2 className="text-center text-regular-18 text-black font-semibold mt-3 mb-4">{children}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AlertMessage;
