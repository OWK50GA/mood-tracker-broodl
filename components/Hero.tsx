import Main from "./Main";
import { fugaz } from '../utils/fonts'
import Button from "./Button";
import Calendar from "./Calendar";
import Link from "next/link";
import {demoData} from '../utils/index'
import CallToAction from "./CallToAction";

const Hero = () => {
    return ( 
            <div className="py-4 md:py-12 flex flex-col gap-8 sm:gap-10 md:gap-14">
                <h1 className={"text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className}>
                    <span className="textGradient">Broodl</span> helps you track your <span className="textGradient">daily</span> mood
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">
                    Create your mood record and see how you feel on <span className="font-semibold">every day of every year</span>
                </p>

                <CallToAction />

                <Calendar completeData={demoData} demo={false}/>
            </div>
     );
}
 
export default Hero;