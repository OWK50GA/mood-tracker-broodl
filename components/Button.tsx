import {fugaz} from '../utils/fonts'

type ButtonProps = {
    text: string;
    dark: boolean;
    full: boolean;
    clickHandler?: () => void;
}

const Button = (props: ButtonProps) => {

    const {text, dark, full, clickHandler} = props

    return ( 
        <button
            onClick={clickHandler}
            className={`${dark? 'bg-indigo-600 text-white' : 'text-indigo-600'} ${full ? 'w-full grid place-items-center':''}
                        border border-indigo-600 border-solid rounded-full overflow-hidden 
                        duration-200 hover:opacity-60 `
                         + fugaz.className}>
            <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3' + fugaz.className}>
                {text}
            </p>
        </button>
     );
}
 
export default Button;