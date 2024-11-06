import { Skeleton } from "primereact/skeleton"

const SkeletonList = ({ length, height }) => {
    return (
        <div>
            {[...Array(length)].map((_, i) => (
                <Skeleton key={i} height={height} className='w-full mb-2' />
            ))}
        </div>
    )
}
export default SkeletonList

//             
