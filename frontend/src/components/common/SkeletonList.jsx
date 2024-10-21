import { Skeleton } from "primereact/skeleton"

const SkeletonList = ({ length }) => {
    return (
        <div>
            {[...Array(length)].map((_, i) => (
                <Skeleton key={i} height="3.9rem" className="w-full mb-2" />
            ))}
        </div>
    )
}
export default SkeletonList

//             
