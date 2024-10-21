import FlagIcon from "../assets/icons/FlagIcon"
import Container from "../components/common/Container"

const ClassificationPage = () => {
  return (
    <Container>
      <div className="flex justify-between py-2 mt-4 mb-1">
        <span className="font-medium capitalize">la liga</span>
      </div>

      <div className="flex flex-col justify-center mb-5 shadow-soft rounded-xl">
        <div className='flex justify-around text-soft-gray'>
          <span className="w-30 py-2 px-5 text-secondary text-sm">Equipo</span>
          <span className="py-2 px-5 text-secondary text-sm">P</span>
          <span className="py-2 px-5 text-secondary text-sm">Goles</span>
          <span className="py-2 px-5 text-secondary text-sm">GD</span>
          <span className="py-2 px-5 text-secondary text-sm">PTS</span>
        </div>


        <div className='w-full bg-soft-gray py-3 flex justify-around gap-10'>
          <div className="flex flex-col items-start gap-1">
            <div className='flex gap-2'>
              <span className="text-regular text-secondary capitalize">Barcelona</span>
            </div>
            <div className='flex gap-2'>
              <span className="text-regular text-secondary capitalize">Real Madrid</span>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className="flex flex-col items-center">
              <span className="text-regular">3</span>
              <span className="text-regular">3</span>
            </div>
            <FlagIcon />
          </div>

          <div>
            <span className='text-regular'>Dom 28-10</span>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default ClassificationPage