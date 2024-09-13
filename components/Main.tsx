import { ReactNode } from "react";

type MainProps = {
    children: ReactNode
}

const Main = (props: MainProps) => {

    const { children } = props;

    return ( 
        <main className="flex-1 flex flex-col p-4 sm:p-8">
            { children }
        </main>
     );
}
 
export default Main;