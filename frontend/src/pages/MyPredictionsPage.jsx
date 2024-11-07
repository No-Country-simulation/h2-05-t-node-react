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

const MyPredictionsPage = () => {
    const [selectedDate, setSelectedDate] = useState(0)
    const currentDate = getCurrentDate()
    const dateList = getNextFiveDays(currentDate, true)
    const predictionDate = dateList[selectedDate] === "Todas" ? currentDate : convertToOriginalFormat(dateList[selectedDate])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userPredictions, setUserPredictions] = useState([])

    const [user, setUser] = useState(null)
    const [quota, setQuota] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const { quota, token, user } = JSON.parse(storedUser)
            setUser(user)
            setQuota(quota)
        }
    }, [])

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

    // let predictionId = 'd10859a9-c45a-47c4-9a57-10336703d286'

    // useEffect(() => {
    //     setLoading(true)
    //     axios.get(`${API_URL}/api/prediction/${predictionId}`)
    //         .then(res => {
    //             console.log(res.data.data)
    //         })
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    // }, [])

    return (
        <main className="flex flex-col min-h-screen bg-gradiente">
            <HeaderPredictions quota={quota} dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <div className="flex-grow pb-5 bg-white rounded-t-lg">
                <ActivePredictions setVisible={setVisible} userPredictions={userPredictions} loading={loading} />
                {/* AGREGAR LAS QUE TENGAN ESTADO DE PASADAS O FINISHED */}
                {/* <LastPredictions /> */}
            </div>
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