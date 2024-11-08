import { useEffect, useState } from "react"
import { getCurrentDate } from "../utils/getCurrentDate"
import { getNextFiveDays } from "../utils/getNextFiveDays"
import { convertToOriginalFormat } from "../utils/convertToOriginalFormat"
import Footer from "../components/layout/Footer"
import ActivePredictions from "../components/predictions/ActivePredictions"
import HeaderPredictions from "../components/predictions/HeaderPredictions"
import LastPredictions from "../components/predictions/LastPredictions"
import ModalMakePrediction from "../components/predictions/ModalMakePrediction"
import axios from "axios"
import API_URL from "../config"
import ModalChainNewPrediction from "../components/predictions/ModalChainNewPrediction"
import AlertMessage from "../components/common/AlertMessage"

const MyPredictionsPage = () => {
    const [selectedDate, setSelectedDate] = useState(0)
    const currentDate = getCurrentDate()
    const dateList = getNextFiveDays(currentDate, true)
    const predictionDate = dateList[selectedDate] === "Todas" ? currentDate : convertToOriginalFormat(dateList[selectedDate])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userPredictions, setUserPredictions] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    const [user, setUser] = useState(null)
    const [quota, setQuota] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const { token, user } = JSON.parse(storedUser)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        if (!user?.id) return;

        // setLoading(true);
        axios.post(`${API_URL}/api/prediction-qouta`, {
            userId: user.id,
            date: currentDate
        })
            .then(res => {
                setQuota(res.data.data.daily_predictions_left);
            })
            .catch(error => console.log(error))
            // .finally(() => setLoading(false));
    }, [user?.id, currentDate]);

    useEffect(() => {
        if (!user?.id) return

        setLoading(true)
        axios.post(`${API_URL}/api/prediction-record/history`, {
            userId: user?.id,
            filters: {
                status: "pending"
            }
        })
            .then(res => {
                setUserPredictions(res.data.data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [user?.id])

    console.log(userPredictions)

    return (
        <main className="flex flex-col min-h-screen bg-gradiente">
            <HeaderPredictions quota={quota} dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <div className="flex-grow pb-5 bg-white rounded-t-lg h-[300px] overflow-scroll scrollbar-hide">
                <ActivePredictions setVisible={setVisible} userPredictions={userPredictions} loading={loading} />
                {/* AGREGAR LAS QUE TENGAN ESTADO DE PASADAS O FINISHED */}
                {/* <LastPredictions /> */}
            </div>

            {/* <AlertMessage redirect={false} showAlert={showAlert} setShowAlert={setShowAlert}>Se ha añadido tu predicción</AlertMessage> */}
            <Footer />

            <ModalMakePrediction
                currentDate={currentDate}
                dateFormatDM={dateList[selectedDate]}
                predictionDate={predictionDate}
                visible={visible}
                setVisible={setVisible} />
        </main>
    )
}
export default MyPredictionsPage