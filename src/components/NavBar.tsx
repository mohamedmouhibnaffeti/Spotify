import { IoChevronForwardCircleOutline, IoChevronBackCircleOutline} from "react-icons/io5";
import next from "../Assets/images/next.png"
import previous from "../Assets/images/previous.png"
const NavBar = (props)=>{


return(


  <div>

  <nav className=" flex justify-between py-2 " style={{width:"82vw",height:'fit-content', backgroundColor:"rgb(24 24 27)"}}>


    <div className="flex justify-between gap-4 ml-4">
  <img src={previous} alt="" className="text-3xl w-12 h-12 mt-4 mb-2 cursor-not-allowed"/>
  <img src={next} alt="" className="text-3xl w-12 h-12 mt-4 mb-2 cursor-not-allowed"/>
  <form >   
    <div className="relative ml-8  " style={{width:"300px"}}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input style={{height:"40px" }} type="search" id="default-search" className=" mt-4 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl   dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400  " placeholder="Search..." required />
    </div>
</form>
   </div>
<a href="" style={{color:"gray"}} className="mt-5 mr-5 font-bold cursor-pointer hover:text-white text-lg">Welcome @{props.username}</a>
  



</nav>

  
  
  
  
  </div>


  )}

export default NavBar