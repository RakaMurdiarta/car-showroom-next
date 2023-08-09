"use client"

import { updateSearchParams } from "@/utils"
import Custombutton from "./Custombutton"
import { useRouter } from "next/navigation"

interface ShowMoreProps {
    pageNumber : number,
    isNext : boolean
}
const ShowMore = ({pageNumber , isNext} : ShowMoreProps) => {

    const router = useRouter()

    const handleShowMore = ()=>{
        const newLimit = (pageNumber + 1) * 10
        const newPathName = updateSearchParams('limit',String(newLimit))

        router.push(newPathName,  {
            scroll : false
        })
    }
  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <Custombutton
            title="Show More"
            btnType="button"
            containerStyles="bg-primary-blue rounded-full text-white"
            handleClick={handleShowMore}/>
        )}
    </div>
  )
}

export default ShowMore