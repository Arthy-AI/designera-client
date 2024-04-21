import { Header } from "../../components/header/Header";
import { Heading } from "../../components/heading/Heading";
import { Footer } from "../../components/footer/Footer"

export default function FirstLook() {
    return (
        <main className="flex flex-col" id={"FirstLook"}>
        <Header/>
        <div className="hidden h-3">
        </div>
        <div className="h-4">
        </div>
        <Heading>
          <div className="flex flex-col justfy-between mt-5 mb-3 hidden md:block">
            <div>🏠</div>
            <div><span className="text-[#FFFFFF]">Create</span> <span className="text-[#FF9900]">Design Ideas</span>
              <div><span className="text-[#FFFFFF]">Specialized</span> to Your Interior</div>
            </div>
          </div>
        </Heading>
            <div className="flex flex-col justfy-between justfy-center">
                <span>
                    Hello World!
                </span>
            </div>
        <Footer/>


        
        </main>
    );
}